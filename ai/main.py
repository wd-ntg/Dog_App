from pymongo import MongoClient

# Kết nối đến MongoDB
client = MongoClient("mongodb://localhost:27017/")  # Thay bằng URL MongoDB của bạn nếu cần
db = client["petapp"]  # Thay 'your_database' bằng tên database của bạn
collection = db["products"]  # Thay 'your_collection' bằng tên collection của bạn

# Thêm trường 'best_seller' với giá trị mặc định là False vào tất cả tài liệu
update_result = collection.update_many(
    {},  # Bộ lọc trống để áp dụng cho tất cả tài liệu
    {"$set": {"best_seller": False}}  # Thêm trường 'best_seller' với giá trị mặc định
)

# In kết quả
print(f"Matched documents: {update_result.matched_count}")
print(f"Modified documents: {update_result.modified_count}")

# Đóng kết nối
client.close()