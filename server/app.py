from flask import Flask, jsonify #pip install flask
from flask_cors import CORS #pip install flask-cors
from model import finacial_group_classification




app = Flask(__name__)
CORS(app)


#Post Method - Machine Learning Classifications?
@app.route('/Classification', methods=['POST'])
def Classify():
    return jsonify(finacial_group_classification())

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