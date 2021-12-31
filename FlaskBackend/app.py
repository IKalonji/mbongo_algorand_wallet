from flask import Flask, request, render_template
from flask.json import jsonify
from flask_cors.decorator import cross_origin
from main_wallet_create import MainWallet
from tatum_api_calls import *
from flask_cors import CORS

#Initialise flask app
app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'x-api-key'

#Initialise main wallet
wallet = MainWallet()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/initialize', methods=['GET'])
@cross_origin()
def initialize():
    global wallet
    print(request.headers)
    if 'X-Api-Key' not in request.headers.keys():
        return jsonify({'response': 'error', 'message': 'no api key present'}), 401
    else:
        if wallet.key == "":
            wallet.key = request.headers['X-Api-Key']
            wallet.initialize_wallet()
        return jsonify({'response': 'OK', 'message': 'Initialized successfully'}), 200

#Application endpoints
@app.route('/user/<username>', methods=['GET'])
def user(username):
    global wallet
    user = None
    if (username.lower() in accounts_dict.keys()):
        user = accounts_dict[username].user
    else:
        user = create_user_account(username, wallet.key)
    response = {
            "result": "OK",
            "account_metadata": user
        }
    print("ready to return user")
    return jsonify(response), 200

@app.route('/contacts/<username>', methods=['GET'])
def contacts(username):
    global wallet
    contacts = get_contacts(username, wallet.key)
    response = {
            "result": "OK",
            "user_contacts": contacts
        }
    print("ready to return user")
    return jsonify(response), 200

@app.route('/balance/<username>', methods=['GET'])
def balance(username):
    global wallet
    account_id = accounts_dict[username].user["account_id"]
    balance_data = get_balance(account_id, wallet.key)
    response = {
        "result": "OK",
        "balance": balance_data
    }
    print("ready to return balance")
    return jsonify(response), 200

@app.route('/transactions/<username>', methods=['GET'])
def transactions(username):
    global wallet
    account_id = accounts_dict[username].user["account_id"]
    transaction_data = get_transactions(account_id, wallet.key)
    response = {
        "result": "OK",
        "transactions": transaction_data
    }
    print("ready to return transactions")
    return jsonify(response), 200

@app.route('/top-up/<username>', methods=['POST'])
def top_up(username):
    global wallet
    request_body = request.get_json(force=True)
    account_id = accounts_dict[username].user["account_id"]
    top_up_data = account_top_up(account_id, request_body['amount'], wallet)
    response = {
        "result": "OK",
        "transactions": top_up_data,
        "balance": get_balance(account_id, wallet.key)
    }
    print("ready to return top up")
    return jsonify(response), 200

@app.route('/payment/<username>', methods=['POST'])
def payment(username):
    global wallet
    request_body = request.get_json(force=True)
    account_id = accounts_dict[username].user["account_id"]
    payment_data = payment_transfer(account_id, request_body, wallet.key)
    response = {
        "result": "OK",
        "transaction": payment_data,
        "balance": get_balance(account_id, wallet.key)
    }
    print("ready to return payment")
    return jsonify(response), 200

@app.route('/escrow-pay/<username>', methods=['POST'])
def escrow_pay(username):
    global wallet
    request_body = request.get_json(force=True)
    account_id = accounts_dict[username].user["account_id"]
    escrow_pay_data = escrow_payment(account_id, request_body, wallet.key)
    response = {
        "result": "OK",
        "transaction": escrow_pay_data,
        "balance": get_balance(account_id, wallet.key)
    }
    print("ready to return escrow data")
    return jsonify(response), 200

@app.route('/escrow-clear/<username>', methods=['POST'])
def escrow_clear(username):
    global wallet
    request_body = request.get_json(force=True)
    account_id = accounts_dict[username].user["account_id"]
    escrow_clear_data = escrow_clear_amount(account_id, request_body, wallet.key)
    response = {
        "result": "OK",
        "transaction": escrow_clear_data,
        "balance": get_balance(account_id, wallet.key)
    }
    print("ready to return escrow clear")
    return jsonify(response), 200

@app.route('/ussd', methods = ['GET', 'POST'])
def ussd_request():
    #process ussd requests
    pass

#for local testing
def start_ngrok():
    from pyngrok import ngrok
    url = ngrok.connect(5000).public_url
    print(' * Tunnel URL:', url)

#main run function
if __name__ == "__main__":
    start_ngrok()
    app.run(debug=False)
