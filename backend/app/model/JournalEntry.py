from pydantic import BaseModel, Field

class JournalEntry(BaseModel):
    user_id: str
    message: str
    rating: int = Field(..., ge=0, le=5, description="Rating should be between 0 and 5")