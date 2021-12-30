from flask import Flask, request
from flask.json import jsonify
from main_wallet_create import MainWallet
from tatum_api_calls import *

#Initialise flask app
app = Flask(__name__)

#Initialise main wallet
wallet = MainWallet()

@app.route('/')
def home():
    return "Mbongo wallet backend"


#Application endpoints
@app.route('/user/<username>', methods=['GET'])
def user(username):
    user = None
    if (username.lower() in accounts_dict.keys()):
        user = accounts_dict[username].user
    else:
        user = create_user_account(username)
    response = {
            "result": "OK",
            "account_metadata": user
        }
    print("ready to return user")
    return jsonify(response), 200

@app.route('/contacts/<username>', methods=['GET'])
def contacts(username):
    contacts = get_contacts(username)
    response = {
            "result": "OK",
            "user_contacts": contacts
        }
    print("ready to return user")
    return jsonify(response), 200

@app.route('/balance/<username>', methods=['GET'])
def balance(username):
    account_id = accounts_dict[username].user["account_id"]
    balance_data = get_balance(account_id)
    response = {
        "result": "OK",
        "balance": balance_data
    }
    print("ready to return balance")
    return jsonify(response), 200

@app.route('/transactions/<username>', methods=['GET'])
def transactions(username):
    account_id = accounts_dict[username].user["account_id"]
    transaction_data = get_transactions(account_id)
    response = {
        "result": "OK",
        "transactions": transaction_data
    }
    print("ready to return transactions")
    return jsonify(response), 200

@app.route('/top-up/<username>', methods=['POST'])
def top_up(username):
    request_body = request.get_json(force=True)
    account_id = accounts_dict[username].user["account_id"]
    top_up_data = account_top_up(account_id, request_body['amount'], wallet)
    response = {
        "result": "OK",
        "transactions": top_up_data,
        "balance": get_balance(account_id)
    }
    print("ready to return top up")
    return jsonify(response), 200

@app.route('/payment/<username>', methods=['POST'])
def payment(username):
    request_body = request.get_json(force=True)
    account_id = accounts_dict[username].user["account_id"]
    payment_data = payment_transfer(account_id, request_body)
    response = {
        "result": "OK",
        "transaction": payment_data,
        "balance": get_balance(account_id)
    }
    print("ready to return payment")
    return jsonify(response), 200

@app.route('/escrow-pay/<username>', methods=['POST'])
def escrow_pay(username):
    request_body = request.get_json(force=True)
    account_id = accounts_dict[username].user["account_id"]
    escrow_pay_data = escrow_payment(account_id, request_body)
    response = {
        "result": "OK",
        "transaction": escrow_pay_data,
        "balance": get_balance(account_id)
    }
    print("ready to return escrow data")
    return jsonify(response), 200

@app.route('/escrow-clear/<username>', methods=['POST'])
def escrow_clear(username):
    request_body = request.get_json(force=True)
    account_id = accounts_dict[username].user["account_id"]
    escrow_clear_data = escrow_clear_amount(account_id, request_body)
    response = {
        "result": "OK",
        "transaction": escrow_clear_data,
        "balance": get_balance(account_id)
    }
    print("ready to return escrow clear")
    return jsonify(response), 200

@app.route('/ussd', methods = ['GET', 'POST'])
def ussd_request():
    #process ussd requests
    pass

# def start_ngrok():
#     # from pyngrok import ngrok
#     url = ngrok.connect(5000).public_url
#     print(' * Tunnel URL:', url)

#main run function
if __name__ == "__main__":
    # start_ngrok()
    app.run(host='0.0.0.0')


