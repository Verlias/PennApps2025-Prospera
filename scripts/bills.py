import random
import json
import requests
from datetime import datetime, timedelta

# Replace with your Nessie API key

# Base URL for Nessie API
base_url = "http://api.nessieisreal.com"

# Helper function to handle API requests
def make_request(endpoint, method="GET", data=None):
    url = f"{base_url}{endpoint}?key={api_key}"
    headers = {"Content-Type": "application/json"}
    print(url)
    if method == "POST":
        response = requests.post(url, headers=headers, json=data)
    elif method == "PUT":
        response = requests.put(url, headers=headers, json=data)
    else:
        response = requests.get(url, headers=headers)

    if response.status_code in [200, 201]:
        return response.json()
    else:
        print(f"Error: {response.status_code}")
        print(f"Response Text: {response.text}")
        return None

# Step 1: Create a fake user (customer)
def create_customer():
    customer_data = {
        "first_name": "Bruce",
        "last_name": "Wayne",
        "address": {
            "street_number": "123",
            "street_name": "Main St",
            "city": "NewYork",
            "state": "NY",
            "zip": "12345"
        }
    }
    response = make_request("/customers", method="POST", data=customer_data)
    return response["objectCreated"]["_id"] if response else None

# Step 2: Create a fake account for the customer
def create_account(customerid):
    account_data = {
        "type": "Checking",  # Could be Savings or CreditCard
        "nickname": "Primary Account",
        "rewards": 1000,
        "balance": 1000,
    }
    endpoint = "/customers/"+ customerid + "/accounts"
    response = make_request(endpoint, method="POST", data=account_data)
    print(response)
    return response["objectCreated"]["_id"] if response else None

# Step 3: Fetch 20 random merchants from Nessie API
def fetch_merchants():
    response = make_request(f"/merchants")
    if response:
        return [merchant["_id"] for merchant in response]  # Fixed response to fetch merchant ids correctly
    return []

# Step 4: Generate a random date within the past 2 months
def random_date(start, end):
    delta = end - start
    random_days = random.randint(0, delta.days)
    return start + timedelta(days=random_days)

# Step 5: Create fake transactions for the account
def create_transaction(account_id, merchant_id):
    # Random date within the last 2 months
    start_date = datetime.now() - timedelta(days=60)  # 60 days = 2 months
    end_date = datetime.now()
    purchase_date = random_date(start_date, end_date).strftime("%Y-%m-%d")
    
    transaction_data = {
        "merchant_id": merchant_id,  # Merchant ID is now passed in dynamically
        "medium": "balance",
        "purchase_date": purchase_date,  # Random purchase date within 2 months
        "amount": round(random.uniform(5, 10), 2),  # Random amount between $5 and $100
        "status": "completed"
    }
    response = make_request(f"/accounts/" + account_id + "/purchases", method="POST", data=transaction_data)
    return response

# Step 6: Add 100 transactions to the account with randomized merchants and dates
def add_transactions(account_id, merchant_ids, num_transactions=100):
    for _ in range(num_transactions):
        # Randomly choose a merchant ID from the list of merchants
        random_merchant_id = random.choice(merchant_ids)
        create_transaction(account_id, random_merchant_id)
# Step 7: Create recurring bills for specific payees (Verizon, Vanguard, PECO)
def create_recurring_bill(account_id, payee, amount, recurring_date, recurringDate, recurring_period="monthly"):
    today = datetime.now()
    bill_data = {
        "status": "pending",
        "payee": payee,
        "nickname": payee + " Bill",
        "payment_date": recurring_date,  # The initial payment date is today
        "recurring_date": recurringDate,
        "payment_amount": amount
    }
    response = make_request(f"/accounts/66ef454a9683f20dd518a575/bills", method="POST", data=bill_data)
    print(f"Created bill for {payee}: {response}")
    return response

# Main Execution
if __name__ == "__main__":
    # Create recurring bills for Verizon (23rd), Vanguard (28th), and PECO (30th)
    create_recurring_bill("66ef454a9683f20dd518a575", "Verizon", 30, "2024-08-23", 23)
    create_recurring_bill("66ef454a9683f20dd518a575", "Vanguard", 150, "2024-08-28", 28)
    create_recurring_bill("66ef454a9683f20dd518a575", "PECO", 80, "2024-08-30", 30)

    print("Recurring bills created for Verizon (23rd), Vanguard (28th), and PECO (30th).")