import os
import json
from pydantic import BaseModel, Field, validator
import datetime as dt


class JournalEntry(BaseModel):
    message: str
    rating: str
    year: int
    month: int
    day: int
    timestamp: dt.datetime = None  # Will be computed based on year, month, and day # I think this can be removed but wtv

    @validator("timestamp", pre=True, always=True)
    def construct_timestamp(cls, value, values):
        # Use year, month, and day to create a timestamp
        try:
            return dt.datetime(
                year=values["year"], 
                month=values["month"], 
                day=values["day"]
            )
        except KeyError:
            raise ValueError("Year, month, and day are required to construct timestamp.")
        except ValueError as e:
            raise ValueError(f"Invalid date: {e}")

    def save_to_db(self):
        """Save the entry to a JSON file in a folder named YYYY-MM, creating the folder if necessary."""
        # Extract folder name (YYYY-MM) and file name (YYYY-MM-DD.json) from the timestamp
        folder_name = self.timestamp.strftime("%Y-%m")
        file_name = self.timestamp.strftime("%Y-%m-%d.json")

        # Ensure the folder exists
        os.makedirs(folder_name, exist_ok=True)

        # Construct the full file path
        file_path = os.path.join(folder_name, file_name)

        # Save the journal entry to the file (overwrite if it already exists)
        with open(file_path, "w") as f:
            data_to_save = {
                "message": self.message,
                "rating": self.rating,
            }
            json.dump(data_to_save, f, indent=4, default=str)  # Use default=str for datetime serialization
        
        # print(f"Journal entry saved to {file_path}")
    
    
    @classmethod
    def get_json_from(cls, file_path: str):
        """Load a journal entry from a JSON file."""
        with open(file_path, "r") as f:
            data = json.load(f)
        # print(f"Data from {file_path}: {data}")
        return data

    @classmethod
    def get_message_from(cls, file_path: str, debug=False):
        """Load a journal entry from a JSON file."""
        with open(file_path, "r") as f:
            data = json.load(f)
        
        if debug:print(f"Data from {file_path}: {data}")
        
        return data