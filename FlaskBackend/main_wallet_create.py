import http.client
from os import getenv
# import dotenv
from flask import json

# dotenv.load_dotenv()
# api_key = getenv('API_KEY')

class MainWallet():

    def __init__(self, api_key):
        self.key = api_key
        wallet_data = create_wallet(self.key)
        print("Wallet-data: ", wallet_data)
        self.address = wallet_data['address']
        self.secret = wallet_data['secret']
        main_account = create_virtual_currency(self.key)
        if 'errorCode' in main_account.keys():
            main_account = get_virtual_currency(self.key)
            self.main_account_id = main_account['accountId']
        else:
            self.main_account_id = main_account['id']
        print("Main-account-data: ", main_account)

    def return_api_key(self):
        return self.key
        
def create_wallet(api_key):
    conn = http.client.HTTPSConnection("api-eu1.tatum.io")
    headers = { 'x-api-key': api_key}
    conn.request("GET", "/v3/algorand/wallet", headers=headers)
    res = conn.getresponse()
    data = res.read()
    return json.loads(data.decode("utf-8")) 
    

def create_virtual_currency(api_key):
    conn = http.client.HTTPSConnection("api-eu1.tatum.io")
    payload = "{\"name\":\"VC_ZAR\",\"supply\":\"1000000000\",\"basePair\":\"ZAR\",\"baseRate\":1,\"customer\":{\"accountingCurrency\":\"ZAR\",\"customerCountry\":\"SA\",\"externalId\":\"123654\",\"providerCountry\":\"SA\"},\"description\":\"Mbongo Virtual Currency.\",\"accountCode\":\"Main_Account\",\"accountNumber\":\"1234567890\",\"accountingCurrency\":\"ZAR\"}"
    headers = {
        'content-type': "application/json",
        'x-api-key': api_key
        }
    conn.request("POST", "/v3/ledger/virtualCurrency", payload, headers)
    res = conn.getresponse()
    data = res.read()
    return json.loads(data.decode("utf-8"))

def get_virtual_currency(api_key):
    conn = http.client.HTTPSConnection("api-eu1.tatum.io")
    headers = { 'x-api-key': api_key }
    conn.request("GET", "/v3/ledger/virtualCurrency/VC_ZAR", headers=headers)
    res = conn.getresponse()
    data = res.read()
    return json.loads(data.decode("utf-8"))