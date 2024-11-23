import os
from fastapi import FastAPI
import psycopg2
from psycopg2.extras import RealDictCursor
from model.JournalEntry import JournalEntry

app = FastAPI()

# Database connection details from environment variables
DATABASE_URL = os.getenv("DATABASE_URL")

# Function to connect to the database
def get_db_connection():
    conn = psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)
    return conn

@app.get("/")
def read_root():
    return {"message": "Welcome to the Python + PostgreSQL API"}

@app.get("/test")
def test_db():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM test_table;")
        rows = cursor.fetchall()
        cursor.close()
        conn.close()
        return {"data": rows}
    except Exception as e:
        return {"error": str(e)}
    

@app.post("/daily_entry")
async def submit_entry(data: JournalEntry, debug = True):
    
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




