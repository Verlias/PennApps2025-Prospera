#Machine Learning Model to classify Finacial Groups

# Import necessary libraries
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import NearestNeighbors

# Step 1: Load your dataset from CSV file
df = pd.read_csv('synthetic_financial_data.csv')


def finacial_group_classification():
    X = df[['income', 'debt', 'credit_score']]  # Features: Income, Debt, Credit Score

    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    neighbors_model = NearestNeighbors(n_neighbors=1)  # You can change n_neighbors to get more than 1 nearest neighbor
    neighbors_model.fit(X_scaled)

    new_user_data = pd.DataFrame({
        'income': [62000],     # Example income
        'debt': [8000],        # Example debt
        'credit_score': [715]  # Example credit score
    })

    new_user_scaled = scaler.transform(new_user_data)

    distances, indices = neighbors_model.kneighbors(new_user_scaled)

    closest_user_index = indices[0][0]
    closest_user = df.iloc[closest_user_index]

    return closest_user.to_dict()
     


'''
if __name__ == '__main__':
    print(finacial_group_classification())

User Inputs Information:
Inputted Data:
- Income
- Debt
- Credit Score

Output: Classify the financial group of the user with other related users.

'''