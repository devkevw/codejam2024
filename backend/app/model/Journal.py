from fastapi import FastAPI
from pydantic import BaseModel
from .JournalEntry import JournalEntry
import datetime as dt

app = FastAPI()

class Journal(BaseModel):
    entries: list
    state: str = None
    # def __init__(self, user_id):
    #     """
    #     Initialize the Journal object with a user_id.
    #     :param user_id: str: The user ID for the journal.
    #     :param entries: pd.DataFrame: A DataFrame of all the entries.
    #     :param state: string: The current state of the journal.
    #
    #     entries pd.DataFrame structure: each row is an entry
    #     | entry_id: str | message: str | rating: int | timestamp: dt.datetime |
    #     """
    #     self.user_id = user_id
    #     self.entries = pd.DataFrame() # pd.DataFrame of all the entries
    #     self.state = None # The current state of the journal, initialized to None at first

    def add_entry(self, entry: JournalEntry):
        """Add a new entry to the journal."""
        self.entries.append(entry)

    def get_all_entries(self):
        return self.entries

    def get_month_entries(self, year, month):
        """
        Return a list of all entries in a given month.
        :param year: int: The year to filter by.
        :param month: int: The month to filter by.
        :return: list: A list of entries for the given month and year.
        """
        month_entries = []
        for entry in self.entries:
            if entry.timestamp.year == year and entry.timestamp.month == month:
                month_entries.append(entry)
        self.state = "CALENDAR"
        return month_entries

