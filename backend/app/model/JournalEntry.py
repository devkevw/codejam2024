import os
import json
from pydantic import BaseModel, Field
import datetime as dt


class JournalEntry(BaseModel):
    user_id: str
    message: str
    rating: int = Field(..., ge=0, le=5, description="Rating should be between 0 and 5")
    timestamp: dt.datetime = Field(default_factory=dt.datetime.now)

    def save_to_db(self):
        """Save the entry to a JSON file, creating the file if it doesn't exist."""
        file_name = "journal_entries.json"
        
        # Ensure the file exists or create it
        if not os.path.exists(file_name):
            with open(file_name, "w") as f:
                json.dump([], f)  # Initialize the file with an empty list
        
        # Append the current entry to the file
        with open(file_name, "r+") as f:
            try:
                # Load existing data
                data = json.load(f)
            except json.JSONDecodeError:
                # If the file is empty or corrupted, start fresh
                data = []
            
            # Add the new entry
            data.append(self.dict())
            
            # Write the updated data back to the file
            f.seek(0)  # Move to the beginning of the file
            json.dump(data, f, indent=4)
            f.truncate()  # Ensure the file isn't larger than necessary
