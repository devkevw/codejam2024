from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional

from .model.JournalEntry import JournalEntry
from .model.Journal import Journal

app = FastAPI()
debug = False

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust to restrict origins if needed
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allow all headers
)

@app.get("/")
def read_root():
    return {"message": "Backend API for the Journaling App"}

# Add a new endpoint to retrieve all journal entries for a given month
@app.get("/journal")
def read_entries_month(
    year: Optional[int] = Query(..., description="The year for the journal entries"),
    month: Optional[int] = Query(..., ge=1, le=12, description="The month (1-12) for the journal entries"),
    debug: bool = debug
):
    # try:
    if year is None or month is None:
        return {"error": "Both year and month must be specified"}

    month_entries = Journal.load_entries_from(year, month)
    if debug:
        print(f"Entries for {year}-{month}: {month_entries}")
    return {f"{year}-{month}": month_entries}
    # except Exception as e:
    #     return {"error": str(e)}


# Add a new endpoint to submit a daily journal entry
@app.post("/journalentry/submit")
async def create_journal_entry(data: JournalEntry, debug=debug):
    try:
        # Write to db
        data.save_to_db()

        response = {
            "message": data.message,
            "rating": data.rating,
            "status": "Success"
        }
        if debug:
            response["type"] = str(type(data))
            response["dir"] = str(dir(data))

        return response
    except Exception as e:
        return {"error": str(e)}


@app.get("/journalentry")
def get_entry(
    year: Optional[int] = Query(..., description="The year for the journal entries"),
    month: Optional[int] = Query(..., ge=1, le=12, description="The month (1-12) for the journal entries"),
    day: Optional[int] = Query(..., ge=1, le=31, description="The month (1-31) for the journal entries"),
    debug: bool = False
):
    return Journal.load_entry_from(year, month, day)


# @app.get("/items/{item_id}")
# def read_item(item_id: int, q: str = None):
#     return {"item_id": item_id, "query": q}


