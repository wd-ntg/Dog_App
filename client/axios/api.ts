import axios from "axios";

// Địa chỉ của Flask server (Cập nhật theo địa chỉ thực tế)
const FLASK_SERVER_URL = "http://172.31.98.50:5000";

const logFormData = (formData: any) => {
  const entries = formData._parts; // `_parts` chứa dữ liệu
  entries.forEach(([key, value]: any) => {
    console.log(`Key: ${key}`);
    if (typeof value === "object" && value.uri) {
      console.log(
        `File: ${value.uri}, Name: ${value.name}, Type: ${value.type}`
      );
    } else {
      console.log(`Value: ${value}`);
    }
  });
};

// Hàm gửi ảnh đến Flask API
export const predictImage = async (imageUri: any) => {
  try {
    // Tạo FormData để gửi file
    const formData: any = new FormData();
    formData.append("image", {
      uri: imageUri, // URI từ ImagePicker
      name: "photo.jpg", // Tên file
      type: "image/jpeg", // Loại MIME
    });
    logFormData(formData);
    // Gửi request đến Flask server
    const response = await axios.post(`${FLASK_SERVER_URL}/predict`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data; // Trả về kết quả từ server
  } catch (error) {
    console.error("Error predicting image:", error);
    throw error; // Ném lỗi để xử lý ở nơi gọi
  }
};
