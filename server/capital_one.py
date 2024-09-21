import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.environ.get("NESSIE_API_KEY")

NESSIE_API_BASE_URL = "http://api.nessieisreal.com"

headers = {
    "Content-Type": "application/json",
}

def make_request(endpoint, method='GET', data=None):
    url = f"{NESSIE_API_BASE_URL}{endpoint}?key={API_KEY}"
    print(f"Fetching URL: {url}")

    if method == 'GET':
        response = requests.get(url, headers=headers)
    elif method == 'POST':
        response = requests.post(url, headers=headers, json=data)
    elif method == 'PUT':
        response = requests.put(url, headers=headers, json=data)
    elif method == 'DELETE':
        response = requests.delete(url, headers=headers)

    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error: {response.status_code} - {response.text}")
        return None

def get_customer_balance(customer_id):
    endpoint = f"/customers/{customer_id}/accounts"
    accounts = make_request(endpoint)
    
    if accounts:
        balance = accounts[0]['balance']
        print(f"Customer {customer_id} balance: {balance}")
        return balance
    else:
        print(f"No account data found for customer {customer_id}")
        return None


def classify_customer(balance):
    if balance > 10000:
        return "VIP"
    elif balance > 5000:
        return "Premium"
    else:
        return "Regular"

def process_customers(customer_ids):
    for customer_id in customer_ids:
        print(f"Processing customer ID: {customer_id}")
        
        balance = get_customer_balance(customer_id)
        
        if balance is not None:
            classification = classify_customer(balance)
            print(f"Customer {customer_id} classified as: {classification}")

def create_customer_account(id):
    customerId = id
    apiKey = API_KEY

    url = 'http://api.reimaginebanking.com/customers/{}/accounts?key={}'.format(customerId,apiKey)
    payload = {
    "type": "Savings",
    "nickname": "test",
    "rewards": 10000,
    "balance": 10000,	
    }

    response = requests.post( 
        url, 
        data=json.dumps(payload),
        headers={'content-type':'application/json'},
        )

    if response.status_code == 201:
        print('account created')


if __name__ == "__main__":
    customer_ids = ["customer_123", "customer_456"]  
    #process_customers(customer_ids)
    for id in customer_ids:
        create_customer_account(id)