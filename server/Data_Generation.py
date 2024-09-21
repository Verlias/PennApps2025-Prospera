from faker import Faker
import pandas as pd
import random

fake = Faker()

# Generate dummy data
data = []
for _ in range(1000):  # Adjust the number of samples
    income = random.randint(20000, 200000)  # Annual income between $20,000 and $200,000
    debt = random.randint(0, 50000)  # Debt between $0 and $50,000
    credit_score = random.randint(300, 850)  # Credit score between 300 and 850

    # Calculate spending as percentages of income, using realistic ranges
    food_percentage = random.uniform(5, 15) / 100  # Food: 5% to 15% of income
    transportation_percentage = random.uniform(5, 15) / 100  # Transportation: 5% to 15% of income
    housing_percentage = random.uniform(25, 35) / 100  # Housing: 25% to 35% of income
    utilities_percentage = random.uniform(5, 10) / 100  # Utilities: 5% to 10% of income

    # Calculate actual spending amounts
    food_spending = income * food_percentage
    transportation_spending = income * transportation_percentage
    housing_spending = income * housing_percentage
    utilities_spending = income * utilities_percentage

    # Append the generated data to the list
    data.append({
        'income': income,
        'debt': debt,
        'credit_score': credit_score,
        'Food': food_spending,
        'Transportation': transportation_spending,
        'Housing': housing_spending,
        'Utilities': utilities_spending,
    })

# Create a DataFrame and save it as a CSV file
df = pd.DataFrame(data)
df.to_csv('synthetic_financial_data1.csv', index=False)

