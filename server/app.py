from flask import Flask, jsonify #pip install flask
from flask_cors import CORS #pip install flask-cors
from model import financial_group_classification




app = Flask(__name__)
CORS(app)


# Post Method - Machine Learning Classifications
@app.route('/Classification', methods=['POST'])
def Classify():
    try:
        # Call the financial_group_classification function
        result = financial_group_classification()
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
    app.run()

'''
Run Server:
flask --app app run

'''