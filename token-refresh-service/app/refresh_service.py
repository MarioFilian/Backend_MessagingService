import redis
from datetime import datetime, timedelta
import uuid
from app.config import REDIS_HOST, REDIS_PORT, REDIS_PASSWORD, TOKEN_EXPIRY_MINUTES

redis_client = redis.Redis(
    host=REDIS_HOST,
    port=REDIS_PORT,
    password=REDIS_PASSWORD,
    decode_responses=True
)

def generate_access_token(user_id: str) -> str:
    access_token = str(uuid.uuid4())
    redis_client.setex(f"access_token:{access_token}", timedelta(minutes=TOKEN_EXPIRY_MINUTES), user_id)
    return access_token

def validate_and_refresh_token(refresh_token: str) -> str | None:
    user_id = redis_client.get(f"refresh_token:{refresh_token}")
    if user_id:
        return generate_access_token(user_id)
    return None
