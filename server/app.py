from flask import Flask, jsonify, request #pip install flask
from flask_cors import CORS #pip install flask-cors
from model import financial_group_classification




app = Flask(__name__)
CORS(app)


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