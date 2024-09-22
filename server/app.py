from flask import Flask, jsonify, request #pip install flask
from flask_cors import CORS #pip install flask-cors
from flask_pymongo import PyMongo #pip install flask-pymongo
from model import financial_group_classification
from LLM import get_budget_recommendation
import os


app = Flask(__name__)
CORS(app)

uri = os.getenv("uri")


#Mongo Connection
app.config["MONGO_URI"] = uri
mongo = PyMongo(app)

try:
    mongo.cx.admin.command('ping')  # Pinging MongoDB to check the connection
    print("Successfully connected to MongoDB")
except:
    print("Failed to connect to MongoDB")


# Post Method - Save Users Information
@app.route('/save', methods=['POST'])
def save():
    try:
        # Get the input data from the request body
        data = request.get_json()

        '''
        Hard Code Test
        data = {
            "name": "John Doe",
            "income": 70000,
            "debt": 8000,
            "credit_score": 715
        }   
        '''
        # Extract name, email, income, debt, and credit_score from the input data
        name = data.get('name')
        income = data.get('income')
        debt = data.get('debt')
        credit_score = data.get('credit_score')

        # Validate that all necessary fields are provided
        if name is None or income is None or debt is None or credit_score is None:
            app.logger.warning("Missing required input fields: name, income, debt, or credit_score")
            return jsonify({"error": "Missing required input fields: name, income, debt, or credit_score"}), 400

        # Prepare the user document
        user = {
            "name": name,
            "income": income,
            "debt": debt,
            "credit_score": credit_score
        }

        # Debugging: log the user data before inserting
        app.logger.debug(f"Attempting to insert user data: {user}")

        # Save the user's information to the database
        result = mongo.db.test.insert_one(user)

        # Debugging: log the result after insertion
        app.logger.debug(f"User information inserted successfully, ID: {result.inserted_id}")

        # Return a success message
        return jsonify({"message": "User information saved successfully"}), 200
    
    except Exception as e:
        # Log the exception and return an error message
        app.logger.error(f"Error during saving user information: {e}")
        return jsonify({"error": "An error occurred during saving user information"}), 500
    

# Get Method - Retrieve Users Information
@app.route('/retrieve', methods=['GET'])
def retrieve():
    try:
        # Get all users from the database
        users = mongo.db.test.find()

        # Initialize an empty list to store the user data
        user_data = []

        # Loop through the users and extract the necessary fields
        for user in users:
            user_data.append({
                "name": user["name"],
                "income": user["income"],
                "debt": user["debt"],
                "credit_score": user["credit_score"]
            })

        # Return the user data as a JSON response
        return jsonify(user_data), 200
    
    except Exception as e:
        # Log the exception and return an error message
        app.logger.error(f"Error during retrieving user information: {e}")
        return jsonify({"error": "An error occurred during retrieving user information"}), 500

    

# Post Method - Machine Learning Classifications
@app.route('/classify', methods=['POST'])
def Classify():
    try:
        # Get the input data from the request body
        data = request.get_json()
        '''
        Hard Code Test
        data =
            {
                "income": 70000,
                "debt": 8000,
                "credit_score": 715
            }
        '''
        
        # Extract income, debt, and credit_score from the input data
        income = data.get('income')
        debt = data.get('debt')
        credit_score = data.get('credit_score')

        # Validate that all necessary fields are provided
        if income is None or debt is None or credit_score is None:
            return jsonify({"error": "Missing required input fields: income, debt, or credit_score"}), 400

        # Call the financial_group_classification function with the provided inputs
        result = financial_group_classification(income, debt, credit_score)
        
        # Return the result as a JSON response
        return jsonify(result), 200
    
    except Exception as e:
        # Log the exception and return an error message
        app.logger.error(f"Error during classification: {e}")
        return jsonify({"error": "An error occurred during classification"}), 500
    
# Post Method - Display GPT Response Reccomendation (Based on Goal)
@app.route('/goal-recommend', methods=['POST'])
def Goal_Recommendation():
    try:
        # Get the input data from the request body
        data = request.get_json()

        # Extract income, expenses, debt, credit_score, and financial_goals from the input data
        income = data.get('income')
        expenses = data.get('expenses')
        debt = data.get('debt')
        credit_score = data.get('credit_score')

        Utilities = data.get('Utilities')
        Food = data.get('Food')
        Housing = data.get('Housing')
        Transportation = data.get('Transportation')

        expenses = Utilities + Food + Housing + Transportation
        financial_goals = data.get('financial_goals')

        '''
        Hard Code Test

        income = 5000
        expenses = 3500
        debt = 10000
        credit_score = 650
        financial_goals = "I want to leave college debt free"
        '''

        prompt = f"""
            The user has an income of ${income} per year and their yearly expenses are ${expenses}. They also have a debt of ${debt} and a credit score of ${credit_score}.
            Their financial goal is {financial_goals}. What recommendations can be made to improve their budgeting and save more money? Give me a response in a one paragraph format no bullet points.
            Also do it in a format where you are talking to the user directly. Directly giving them advice speaking as if we are an app giving out reccomendations to improve budget to reach finacancial goal.
        """
        recommendation = get_budget_recommendation(prompt)
        return jsonify(recommendation), 200
    except Exception as e:
        app.logger.error(f"Error during recommendation: {e}")
        return jsonify({"error": "An error occurred during recommendation"}), 500
    
#Post Method - Display GPT Response Budget Reccomendation (Based on Income, Expenses, etc)
@app.route('/personalized-recommend', methods=['POST'])
def Personalize_Recommendation():
    try:
        # Get the input data from the request body
        
        # Hard Code Test
        '''
        data = {
        
            "Food": 3960.108554999084,
            "Housing": 7427.565715038005,
            "Transportation": 1448.888379829823,
            "Utilities": 1722.302681409002,
            "credit_score": 659,
            "debt": 10748,
            "income": 27359
        }
        '''


        data = request.get_json()

         
   
        # Extract income, expenses, debt, credit_score, and financial_goals from the input data
        income = data.get('income')
        debt = data.get('debt')
        credit_score = data.get('credit_score')

        Utilities = data.get('Utilities')
        Food = data.get('Food')
        Housing = data.get('Housing')
        Transportation = data.get('Transportation')


   
        prompt = f"""
            The user has an income of ${income} yearly and their debt is ${debt}. They have a credit score of ${credit_score}. They also spend ${Utilities} on utilities, ${Food} on food, ${Housing} on housing, and ${Transportation} on transportation. 
            What recommendations can be made to improve their budgeting and save more money for the next month? Give me a response in a one paragraph (4 Sentences) format no bullet points with numbers and percentages.
            Also do it in a format where you are talking to the user directly and youre an chatbot app giving advice. 

        """
        recommendation = get_budget_recommendation(prompt)
        return jsonify(recommendation), 200
    except Exception as e:
        app.logger.error(f"Error during recommendation: {e}")
        return jsonify({"error": "An error occurred during recommendation"}), 500


#Get Method - Getting from Database?
@app.route('/testGet', methods=['GET'])
def getter():
    return "Hello World"


if __name__ == '__main__':
    app.run(port=5000, debug=True)

'''
Run Server:
flask --app app run
flask --app app run --port=5000 --debug


'''