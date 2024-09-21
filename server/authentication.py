from propelauth_flask import TokenVerificationMetadata, init_auth
from dotenv import load_dotenv
import os

load_dotenv()

PROPEL_API_KEY = os.getenv("PROPEL_API_KEY")

auth = init_auth(
    "https://6055383.propelauthtest.com",
    PROPEL_API_KEY,
    TokenVerificationMetadata(
        verifier_key="""
            -----BEGIN PUBLIC KEY-----
            MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyiU6vv3wAz9EWEcsZXAh
            iN7Mfo3Rh+iW5R4JxB+b8UbqFfv3e1xoBYxUFVHNYGZDgoOPTN5KEwfSHFuSKSje
            VYERHgrfODpSgAnjBfXQtj7YMqvuo/DD2a2ZF8UO4vfT6g3qLpH+SdQ7yZisIbgZ
            RuE+a+vcg/ZPO1KW2G8N+a0wk6K6kXsV4XHvZvaMF8qqOjUPexdm1haxHYICoMl0
            r7exV48zivghVBIrdgA+9dloNq5WclSmjVSoI/gbi10Gm5RjDpikw6hohaLaTsEG
            m5pXTjSHe2TPh2Rcp2ITA6Xad/IlQzOaae47Edvk1hMT/A8XNPMKkg93oABZR3Xk
            zwIDAQAB
            -----END PUBLIC KEY-----
        """,
        issuer="https://6055383.propelauthtest.com",
    ),
)

@app.route("/api/whoami")
@auth.require_user
def who_am_i():
    return {"user_id": current_user.user_id}


