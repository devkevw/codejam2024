import os
from .JournalEntry import JournalEntry

class Journal():
    # @classmethod
    # def load_entry_from_file(cls, year: int, month: int, day: int):
    #     folder_name = f"{year}-{month}"
    #     file_name = f"{year}-{month}-{day}.json"
    #     file_path = os.path.join(folder_name, file_name)
        
    #     """Load a journal entry from a JSON file."""
    #     # Check if the file exists
    #     if not os.path.exists(file_path):
    #         return None
    #     else:
    #         je = JournalEntry.from_file(file_path)
    #         return je
    
    @classmethod
    def load_entries_from(cls, year: int, month: int):
        folder_name = f"{year}-{month}"
        
        # Check if the folder exists
        if not os.path.exists(folder_name):
            return []
        else:
            entries = {} # YYYY-MM-DD -> JournalEntry
            # Load all entries from the folder
            for file_name in os.listdir(folder_name):
                
                print(f"Checking file: {file_name}")
                
                # Skip any non-JSON files
                if not file_name.endswith(".json"):
                    continue
                
                file_path = os.path.join(folder_name, file_name)
                je_json = JournalEntry.get_json_from(file_path)
                entries[file_name[:-5]] = je_json
            
            return entries
        
        

