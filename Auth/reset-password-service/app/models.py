from sqlalchemy import Table, Column, String, Boolean, DateTime, MetaData

metadata = MetaData()

users = Table(
    "users",
    metadata,
    Column("id", String, primary_key=True),
    Column("username", String),
    Column("email", String),
    Column("password", String),
    Column("enabled", Boolean),
)

reset_tokens = Table(
    "reset_tokens",
    metadata,
    Column("token", String, primary_key=True),
    Column("user_id", String),
    Column("expires_at", DateTime),
)
