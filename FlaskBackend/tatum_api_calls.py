import http.client
from os import getenv
from flask import json
from user import User
from random import randint
import time

#Dict of created accounts
accounts_dict = {}
account_number = 00000

#Tatum request API calls
def create_user_account(username, api_key):
    #create user account
    global account_number, accounts_dict
    account_number += 1
    conn = http.client.HTTPSConnection("api-eu1.tatum.io")
    payload = "{\"currency\":\"VC_ZAR\",\"customer\":{\"accountingCurrency\":\"ZAR\",\"customerCountry\":\"SA\",\"externalId\":\""+username+"\",\"providerCountry\":\"US\"},\"compliant\":false,\"accountCode\":\"TRANSACTIONAL_ACCOUNT\",\"accountingCurrency\":\"ZAR\",\"accountNumber\":\""+str(account_number)+"\"}"    
    headers = {
        'content-type': "application/json",
        'x-api-key': api_key
        }
    conn.request("POST", "/v3/ledger/account", payload, headers)
    res = conn.getresponse()
    data = res.read()
    user_data = json.loads(data.decode("utf-8")) 
    #add to user dict
    user_object = User(customer_id=username,account_id=user_data['id'], account_code=user_data['accountCode'],account_number=account_number)
    accounts_dict[username.lower()] = user_object
    #return user
    return user_object.user

def get_contacts(username):
    #search user in the user dict
    global accounts_dict
    user = accounts_dict[username]
    #return the users contacts
    print('User contacts: ', user.user['contacts'])
    return user.user['contacts']

def get_balance(account_id, api_key):
    #call balance request
    conn = http.client.HTTPSConnection("api-eu1.tatum.io")
    headers = { 'x-api-key': api_key }
    conn.request("GET", f"/v3/ledger/account/{account_id}/balance", headers=headers)
    res = conn.getresponse()
    data = res.read()
    balance_data = json.loads(data.decode("utf-8"))
    print(data.decode("utf-8"))
    #return balance
    return balance_data

def get_transactions(account_id, api_key):
    #call transactions request
    conn = http.client.HTTPSConnection("api-eu1.tatum.io")
    payload = "{\"id\":\""+account_id+"\"}"
    headers = {
        'content-type': "application/json",
        'x-api-key': api_key
        }
    conn.request("POST", "/v3/ledger/transaction/account?pageSize=50&offset=0&count=false", payload, headers)
    res = conn.getresponse()
    data = res.read()
    transactions_data = json.loads(data.decode("utf-8"))
    print("\n",transactions_data)
    #parse and modify response
    parsed_response_data = []
    for transaction in transactions_data:
        parsed_transaction = {}
        parsed_transaction['counterAccount'] = transaction['counterAccountId']
        parsed_transaction['amount'] = transaction['amount']
        transaction_date = convert_epoch_time(str(transaction['created']))
        parsed_transaction['date'] = transaction_date
        parsed_transaction['reference'] = transaction['reference']
        if transaction['amount'][0] == '-' and transaction['recipientNote'] == 'ESCROW':
            conn.request("GET", f"/v3/ledger/account/block/{transaction['counterAccountId']}?pageSize=10&offset=0", headers=headers)
            res = conn.getresponse()
            data = res.read()
            blocked_transactions = json.loads(data.decode("utf-8"))
            print("\nBLOCKED TRANSACTIONS: ", blocked_transactions)
            if len(blocked_transactions) > 0:
                for blockage in blocked_transactions:
                    print(blockage)
                    if blockage['description'] == account_id+'*'+transaction['reference']:
                        parsed_transaction['type'] = transaction['recipientNote']
                    else:
                        parsed_transaction['type'] = "ESCROW-APPROVED"
            else:
                parsed_transaction['type'] = "ESCROW-APPROVED"
        else:
            parsed_transaction['type'] = transaction['recipientNote']

        print("\nPARSED TRANSACTION: ", parsed_transaction)
        parsed_response_data.append(parsed_transaction)
    #return parsed transaction list
    return parsed_response_data

def account_top_up(account_id, amount, wallet):
    #call transfer from main account to user account
    payment_id = randint(1000,9999)
    conn = http.client.HTTPSConnection("api-eu1.tatum.io")
    payload = "{\"senderAccountId\":\""+wallet.main_account_id+"\",\"recipientAccountId\":\""+account_id+"\",\"amount\":\""+str(amount)+"\",\"anonymous\":false,\"compliant\":false,\"transactionCode\":\"TRANSFER\",\"paymentId\":\""+str(payment_id)+"\",\"recipientNote\":\"TOP-UP\",\"baseRate\":1,\"senderNote\":\"TOP-UP\"}"
    headers = {
        'content-type': "application/json",
        'x-api-key': wallet.key
        }
    conn.request("POST", "/v3/ledger/transaction", payload, headers)
    res = conn.getresponse()
    data = res.read()
    print("Transaction top up ref: ", data.decode("utf-8"))
    #return transaction details.
    return json.loads(data.decode("utf-8"))

def payment_transfer(account_id, request_body, api_key):
    #parse receiver details from body
    receiver = request_body['receiver']
    amount = request_body['amount']
    payment_type = request_body['type']
    #call transfer api
    payment_id = randint(1000,9999)
    conn = http.client.HTTPSConnection("api-eu1.tatum.io")
    payload = "{\"senderAccountId\":\""+account_id+"\",\"recipientAccountId\":\""+receiver+"\",\"amount\":\""+str(amount)+"\",\"anonymous\":false,\"compliant\":false,\"transactionCode\":\"TRANSFER\",\"paymentId\":\""+str(payment_id)+"\",\"recipientNote\":\""+payment_type+"\",\"baseRate\":1,\"senderNote\":\""+payment_type+"\"}"
    headers = {
        'content-type': "application/json",
        'x-api-key': api_key
        }
    conn.request("POST", "/v3/ledger/transaction", payload, headers)
    res = conn.getresponse()
    data = res.read()
    print("Transaction top up ref: ", data.decode("utf-8"))
    #return transaction details.
    return json.loads(data.decode("utf-8"))

def escrow_payment(account_id, request_body, api_key):
    #parse receiver details from body
    amount = request_body["amount"]
    receiver = request_body["receiver"]
    #call transfer api
    payment_response = payment_transfer(account_id, request_body, api_key)
    #block amount in receivers account
    if payment_response['reference']:
        conn = http.client.HTTPSConnection("api-eu1.tatum.io")
        payload = "{\"amount\":\""+amount+"\",\"type\":\"DEBIT_CARD_OP\",\"description\":\""+account_id +'*'+payment_response['reference']+"\"}"
        headers = {
            'content-type': "application/json",
            'x-api-key': api_key
            }
        conn.request("POST", f"/v3/ledger/account/block/{receiver}", payload, headers)
        res = conn.getresponse()
        data = res.read()
        print(data.decode("utf-8"))
        #return result
        return json.loads(data.decode("utf-8"))
    else:
        return  {"error": "could not block account"}

def escrow_clear_amount(account_id, request_body, api_key):
    #parse the receiver details
    receiver_id = request_body["receiver"]
    #unblock the amount in the receivers wallet
    conn = http.client.HTTPSConnection("api-eu1.tatum.io")
    headers = { 'x-api-key': api_key }
    conn.request("GET", f"/v3/ledger/account/block/{receiver_id}?pageSize=10&offset=0", headers=headers)
    res = conn.getresponse()
    data = res.read()
    print(data.decode("utf-8"))
    blocked_transactions = json.loads(data.decode("utf-8"))
    print("BLOCKED: ", blocked_transactions)
    for blocked in blocked_transactions:
        if blocked['description'].split('*')[0] == account_id:
            block_id = blocked['id']
            conn.request("DELETE", f"/v3/ledger/account/block/{block_id}", headers=headers)
            res = conn.getresponse()
            code = res.getcode()
            if code == 200 or code == 201 or code == 204:
                responseDict = {"block": blocked, "message": "Approved and cleared"}
                #return the result
                return responseDict
            return json.loads(data.decode("utf-8"))
    return json.loads(data.decode("utf-8"))

def convert_epoch_time(epoch_time):
    epoch_str_to_epoch_milli_sec = epoch_time[:-3]+"."+epoch_time[-3:]
    epoch = float(epoch_str_to_epoch_milli_sec)
    return time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(epoch))

