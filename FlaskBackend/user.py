class User():

    def __init__(self, customer_id, account_id, account_code, account_number):
        self.user = {
            "customer_id": customer_id,
            "account_id": account_id,
            "account_code": account_code,
            "account_number": account_number,
            "contacts":[]
        }
        print("User created: ", self.user)

    def add_contact(self, customer_id, account_id):
        contact = {
            "name": customer_id,
            "account": account_id
        }
        self.user['contacts'].append(contact)