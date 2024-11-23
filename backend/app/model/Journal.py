import JournalEntry as JournalEntry

class Journal:
    def __init__(self, user_id):
        self.entries = [] # list of JournalEntry objects
        self.user_id = user_id

    def add_entry(self, entry: JournalEntry):
        """Add a new entry to the journal."""
        self.entries.append(entry)

    def get_entries(self):
        """Return a list of all entries for the user."""
        return self.entries
