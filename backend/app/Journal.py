import model.JournalEntry as JournalEntry

class Journal:
    def __init__(self, user_id):
        self.entries = []
        self.user_id = user_id

    def add_entry(self, entry: JournalEntry):
        self.entries.append(entry)

    def get_entries(self):
        return self.entries
