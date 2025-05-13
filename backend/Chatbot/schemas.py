from ninja import Schema
from pydantic import EmailStr
from typing import Optional

class UserSchema(Schema):
    id: Optional[int]
    name: str
    email: EmailStr

class UserDataSchema(Schema):
    name: str
    email: EmailStr
    password: str

class ChatSchema(Schema):
    user_id: int
    message: str

class ChatHistorySchema(Schema):
    user_id: int
    message: str
    reply: str


class ReplySchema(Schema):
    user_id: int
    reply: str