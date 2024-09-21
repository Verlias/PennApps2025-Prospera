from propelauth_flask import init_auth
import requests
import json
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.environ.get("PROPEL_API_KEY")

Propel_API_BASE_URL = "https://91780576894.propelauthtest.com"
API_KEY = 
auth = init_auth(
    Propel_API_BASE_URL,
    API_KEY,
)            
