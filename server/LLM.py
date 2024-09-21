import os
from dotenv import load_dotenv
from cerebras.cloud.sdk import Cerebras
load_dotenv()

# Set up your API key - In personal dotenv file
api_key = os.getenv("CEREBRAS_API_KEY")
client = Cerebras(api_key=api_key)

def get_budget_recommendation(income, expenses, financial_goals):
    # Construct the prompt for recommendation
    prompt = f"""
    The user has an income of ${income} per month and their monthly expenses are ${expenses}. 
    Their financial goal is {financial_goals}. What recommendations can be made to improve their budgeting and save more money?
    """
    
    # Send the request to Cerebras for completion
    '''
    response = client.chat.completions.create(
        model="gpt-cerebras",  # Specify the Cerebras model you wish to use
        prompt=prompt,
        max_tokens=100,
        temperature=0.7
    )
    '''

    chat_completion = client.chat.completions.create(
    messages=[
        {
            "role": "user",
            "content": prompt,
        }
    ],
        model="llama3.1-8b",
    )

    # Extract and return the generated recommendation
    return chat_completion

# Example usage:
income = 5000
expenses = 3500
financial_goals = "saving for a new car in 2 years"

recommendation = get_budget_recommendation(income, expenses, financial_goals)
print("Budget Recommendation:", recommendation)
