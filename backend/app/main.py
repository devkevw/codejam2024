from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .model.JournalEntry import JournalEntry

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust to restrict origins if needed
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

@app.post("/journalentry/daily")
async def submit_entry(data: JournalEntry, debug=True):
    # Write to db
    data.save_to_db()

    response = {
        "message": data.message,
        "user_id": data.user_id,
        "rating": data.rating,
        "status": "Success"
    }
    if debug:
        response["type"] = str(type(data))
        response["dir"] = str(dir(data))

    return response


@app.get("/")
def read_root():
    return {"message": "Hello, Dockerized API"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: str = None):
    return {"item_id": item_id, "query": q}
