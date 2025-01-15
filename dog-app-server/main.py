from pymongo import MongoClient
from datetime import datetime

def add_timestamps_to_collection(collection_name, db_name='petapp', mongo_uri='mongodb://localhost:27017/'):
    client = MongoClient(mongo_uri)
    db = client[db_name]
    collection = db[collection_name]

    current_time = datetime.utcnow()

    # Update each document to add `createdAt` if not exists and set `updatedAt`
    result = collection.update_many(
        {},  # Apply to all documents
        {
            '$set': {'updatedAt': current_time},
            '$setOnInsert': {'createdAt': current_time}
        },
        upsert=True
    )

    print(f"Matched {result.matched_count} documents.")
    print(f"Modified {result.modified_count} documents.")

# Example usage
add_timestamps_to_collection('breedinfos')
