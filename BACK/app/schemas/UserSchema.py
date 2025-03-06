from pydantic import BaseModel
from typing import Optional

class UserCreate(BaseModel):
    email: str
    password: str
    role: Optional[str] = "participant"

class UserLogin(BaseModel):
    email: str
    password: str

class UserRoleUpdate(BaseModel):
    new_role: str
