from fastapi import FastAPI, HTTPException
from app.schemas import TokenRequest, TokenResponse
from app.refresh_service import validate_and_refresh_token

app = FastAPI(title="Token Refresh Service")

@app.post("/refresh-token", response_model=TokenResponse)
def refresh_token(data: TokenRequest):
    new_token = validate_and_refresh_token(data.refresh_token)
    if not new_token:
        raise HTTPException(status_code=401, detail="Invalid refresh token")
    return TokenResponse(access_token=new_token)
