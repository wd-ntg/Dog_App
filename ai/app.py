import logging
import os
import torch
import torch.nn as nn
from torchvision import models
from PIL import Image
from torchvision import transforms
from flask import Flask, request, jsonify
from pymongo import MongoClient
import tempfile


# Kết nối tới MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client['dog']  # Tên database
collection = db['dog_data'] 

# 1. Định nghĩa danh sách các lớp
class_names = ['Abyssinian', 'Affenpinscher', 'Afghan Hound', 'African Hunting Dog', 'Airedale',
                'American Staffordshire Terrier', 'Appenzeller', 'Australian Terrier', 'Basenji', 
                'Basset', 'Beagle', 'Bedlington Terrier', 'Bengal', 'Bernese Mountain Dog', 'Birman',
                'Blenheim Spaniel', 'Bloodhound', 'Bluetick', 'Bombay', 'Border Collie', 'Border Terrier', 
                'Borzoi', 'Boston Bull', 'Bouvier Des Flandres', 'Boxer', 'Brabancon Griffon', 
                'Briard', 'British Shorthair', 'Brittany Spaniel', 'Bull Mastiff', 'Cairn', 
                'Cardigan', 'Chesapeake Bay Retriever', 'Chihuahua', 'Chow', 'Clumber', 'Coated Retriever', 
                'Coated Wheaten Terrier', 'Cocker Spaniel', 'Collie', 'Dandie Dinmont', 'Dhole', 'Dingo', 
                'Doberman', 'Egyptian Mau', 'English Foxhound', 'English Setter', 'English Springer',
                'Entlebucher', 'Eskimo Dog', 'French Bulldog', 'German Shepherd', 'Giant Schnauzer', 
                'Golden Retriever', 'Gordon Setter', 'Great Dane', 'Great Pyrenees', 'Greater Swiss Mountain Dog', 
                'Groenendael', 'Haired Fox Terrier', 'Haired Pointer', 'Ibizan Hound', 'Irish Setter', 
                'Irish Terrier', 'Irish Water Spaniel', 'Irish Wolfhound', 'Italian Greyhound', 'Japanese Spaniel',
                'Keeshond', 'Kelpie', 'Kerry Blue Terrier', 'Komondor', 'Kuvasz', 'Labrador Retriever', 
                'Lakeland Terrier', 'Leonberg', 'Lhasa', 'Maine Coon', 'Malamute', 'Malinois', 'Maltese Dog', 
                'Mexican Hairless', 'Miniature Pinscher', 'Miniature Poodle', 'Miniature Schnauzer',
                'N02099429-curly-coated Retriever', 'Newfoundland', 'Norfolk Terrier', 'Norwegian Elkhound', 
                'Norwich Terrier', 'Old English Sheepdog', 
                'Otterhound', 'Papillon', 'Pekinese', 'Pembroke', 'Persian', 'Pomeranian', 'Pug', 
                'Ragdoll', 'Redbone', 'Rhodesian Ridgeback', 'Rottweiler', 'Russian Blue', 'Saint Bernard', 
                'Saluki', 'Samoyed', 'Schipperke', 'Scotch Terrier', 'Scottish Deerhound', 'Sealyham Terrier',
                'Shetland Sheepdog', 'Siamese', 'Siberian Husky', 'Silky Terrier', 'Sphynx', 
                'Staffordshire Bullterrier', 'Standard Poodle', 'Standard Schnauzer', 'Sussex Spaniel', 'Tabby',
                'Tan Coonhound', 'Tibetan Mastiff', 'Tibetan Terrier', 'Toy Poodle', 'Toy Terrier', 'Tzu',
                'Vizsla', 'Walker Hound', 'Weimaraner', 'Welsh Springer Spaniel', 'West Highland White Terrier',
                'Whippet', 'Yorkshire Terrier']

# 2. Định nghĩa thiết bị
device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
print(f"Thiết bị đang sử dụng: {device}")

# 3. Đường dẫn đến mô hình đã lưu
model_path = './dog_breed_classifier.pth'  # Thay đổi nếu cần

# 4. Khởi tạo mô hình ResNet18
model_loaded = models.resnet18(weights=models.ResNet18_Weights.IMAGENET1K_V1)

# 5. Thay đổi lớp cuối cùng để phù hợp với số lớp của bạn
num_ftrs = model_loaded.fc.in_features
model_loaded.fc = nn.Linear(num_ftrs, len(class_names))

# 6. Tải trọng số đã lưu vào mô hình
model_loaded.load_state_dict(torch.load(model_path, map_location=device, weights_only=True))

# 7. Đưa mô hình lên thiết bị và đặt chế độ đánh giá
model_loaded = model_loaded.to(device)
model_loaded.eval()

print("Mô hình đã được tải và sẵn sàng để sử dụng.")

# 8. Hàm dự đoán với ngưỡng
def predict_image_api(image_path, model, class_names, device, threshold=0.6):
    # Định nghĩa transform giống như trong quá trình huấn luyện
    transform = transforms.Compose([
        transforms.Resize(256),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406],
                             [0.229, 0.224, 0.225])
    ])
    
    # Mở và xử lý hình ảnh
    image = Image.open(image_path).convert('RGB')
    image = transform(image).unsqueeze(0)  # Thêm batch dimension
    image = image.to(device)
    
    # Dự đoán
    with torch.no_grad():
        outputs = model(image)
        probabilities = torch.softmax(outputs, dim=1).squeeze()  # Tính xác suất
        top5_prob, top5_indices = torch.topk(probabilities, 5)

    results = [{"name": class_names[idx], "confidence": prob.item()} for idx, prob in zip(top5_indices, top5_prob)]

    # Kiểm tra ngưỡng
    if top5_prob[0].item() >= threshold:
        identified = results[0]
        alternatives = results[1:]
        return identified, alternatives
    else:
        return None, results

# 9. Tạo Flask API
app = Flask(__name__)

from flask import Flask, request, jsonify
import os

# Định nghĩa các định dạng file được phép
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

def allowed_file(filename):
    """
    Kiểm tra xem file có định dạng được phép hay không.
    """
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def get_details_from_db(name):
    """Hàm lấy thông tin chi tiết từ MongoDB dựa trên tên giống loài."""
    result = collection.find_one({"name": name}, {"_id": 0})  # Loại bỏ _id
    if result:
        return result
    else:
        return {"error": "No details found in the database."}


@app.route('/predict', methods=['POST'])
def predict():
    try:
        if 'image' not in request.files:
            logging.warning("No 'image' part in the request.")
            return jsonify({"error": "No file part in the request"}), 400

        file = request.files['image']
        if not allowed_file(file.filename):
            logging.warning(f"Unsupported file type: {file.filename}")
            return jsonify({"error": "Unsupported file type"}), 400

        with tempfile.NamedTemporaryFile(delete=False) as temp_file:
            file.save(temp_file.name)
            temp_path = temp_file.name

        logging.info(f"File saved to {temp_path}")

        identified, alternatives = predict_image_api(temp_path, model_loaded, class_names, device)

        if identified:
            identified_name = identified['name']
            identified['details'] = get_details_from_db(identified_name)

        for alternative in alternatives:
            alternative_name = alternative['name']
            alternative['details'] = get_details_from_db(alternative_name)

        return jsonify({
            "identified": identified,
            "alternatives": alternatives
        }), 200

    except Exception as e:
        logging.error(f"Unexpected error: {e}")
        return jsonify({"error": str(e)}), 500





if __name__ == '__main__':
    app.run(debug=True)
