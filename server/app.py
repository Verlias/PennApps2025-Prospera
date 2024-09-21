from flask import Flask #pip install flask
from flask_cors import CORS #pip install flask-cors



app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return "<p>Hello, World!</p>"


if __name__ == '__main__':
    app.run()
