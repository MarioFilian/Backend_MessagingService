import jwt
import datetime
import os
from dotenv import load_dotenv

load_dotenv()

JWT_SECRET = os.getenv("JWT_SECRET")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM")


def generate_access_token(payload: dict) -> str:
    exp = datetime.datetime.utcnow() + datetime.timedelta(
        minutes=int(os.getenv("JWT_EXP_MINUTES", 15))  # Por defecto: 15 minutos
    )
    payload_with_exp = payload.copy()
    payload_with_exp["exp"] = exp
    return jwt.encode(payload_with_exp, JWT_SECRET, algorithm=JWT_ALGORITHM)


def generate_refresh_token(payload: dict) -> str:
    exp = datetime.datetime.utcnow() + datetime.timedelta(
        days=int(os.getenv("JWT_EXP_DAYS", 7))  # Por defecto: 7 días
    )
    payload_with_exp = payload.copy()
    payload_with_exp["exp"] = exp
    return jwt.encode(payload_with_exp, JWT_SECRET, algorithm=JWT_ALGORITHM)


def decode_token(token: str) -> dict:
    return jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
