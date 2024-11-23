-- Create the JournalEntries table first
CREATE TABLE JournalEntries (
    id SERIAL PRIMARY KEY, -- Primary key
    rating INTEGER NOT NULL, -- Rating for the journal entry
    timestamp TIMESTAMP NOT NULL, -- Timestamp of the entry
    message VARCHAR NOT NULL -- Message content of the journal entry
);

-- Create the Journal table
CREATE TABLE Journal (
    id SERIAL PRIMARY KEY, -- Primary key
    entries INTEGER, -- References JournalEntries.id
    user INTEGER NOT NULL, -- User ID
    CONSTRAINT fk_journal_entries FOREIGN KEY (entries) REFERENCES JournalEntries (id)
);
