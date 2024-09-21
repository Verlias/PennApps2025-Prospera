# Import necessary libraries
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import NearestNeighbors

# Step 1: Load your dataset from CSV file
df = pd.read_csv('synthetic_financial_data1.csv')

def financial_group_classification(income, debt, credit_score):
    # Select relevant features
    X = df[['income', 'debt', 'credit_score']]  # Features: Income, Debt, Credit Score

    # Standardize the features
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    # Initialize NearestNeighbors with n_neighbors=10 to find 10 related users
    neighbors_model = NearestNeighbors(n_neighbors=10)
    neighbors_model.fit(X_scaled)

    # Create a DataFrame for the new user data using the input arguments
    new_user_data = pd.DataFrame({
        'income': [income],         # Inputted income
        'debt': [debt],             # Inputted debt
        'credit_score': [credit_score]  # Inputted credit score
    })

    # Scale the new user data using the same scaler
    new_user_scaled = scaler.transform(new_user_data)

    # Find the 10 nearest neighbors
    distances, indices = neighbors_model.kneighbors(new_user_scaled)

    # Retrieve the 10 closest users from the original dataframe
    closest_users = df.iloc[indices[0]]

    # Convert the closest users to a list of dictionaries (or return as desired)
    return closest_users.to_dict(orient='records')


'''
if __name__ == '__main__':
    print(financial_group_classification())

User Inputs Information:
Inputted Data:
- Income
- Debt
- Credit Score

Output: Return a list of 10 related users based on their financial profile.
'''

