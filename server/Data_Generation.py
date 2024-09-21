from faker import Faker
import pandas as pd
import random

fake = Faker()

# Generate dummy data
data = []
for _ in range(1000):  # Adjust the number of samples
    data.append({
        'income': random.randint(20000, 200000),
        'debt': random.randint(0, 50000),
        'credit_score': random.randint(300, 850),
    })

df = pd.DataFrame(data)
df.to_csv('synthetic_financial_data.csv', index=False)
