from fastapi import FastAPI
from .model.JournalEntry import JournalEntry

app = FastAPI()

@app.post("/daily_entry")
async def submit_entry(data: JournalEntry):
    return {
        "message": data.message,
        "user_id": data.user_id,
        "rating": data.rating,
        "status": "Success"
    }





@app.get("/")
def read_root():
    return {"message": "Hello, Dockerized API"}

@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "query": q}


