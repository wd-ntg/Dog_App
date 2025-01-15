import SERVER_EXPRESS_URL from "./configurl";
import axios from "axios";

const getBestSeller = async () => {
    try {
        const response = await axios.get(`${SERVER_EXPRESS_URL}/api/product/best-seller`);
        // Trả về dữ liệu
        return response.data;
    } catch (error) {
        console.error("Error fetching best-seller products:", error);
        throw error;
    }
};
const getDetailProduct = async (id: any) => {
    try {
        // Tạo query string
        const query = new URLSearchParams({ id }).toString();

        // Gọi API với query string
        const response: any = await axios.get(`${SERVER_EXPRESS_URL}/api/product/detail/?${query}`);

        return response.data;
    } catch (error) {
        console.error("Error fetching category dogs:", error);
        throw error;
    }
};

const getProducts = async (req: Record<string, any>) => {
    try {
        // Tạo query string từ object req
        const query = new URLSearchParams(req).toString();

        // Gọi API với query string
        const response = await axios.get(`${SERVER_EXPRESS_URL}/api/product/?${query}`);

        // Trả về kết quả
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
    }



};

const fetchProductsByCategory = async () => {
    try {
        const response = await axios.get(`${SERVER_EXPRESS_URL}/api/product/products-by-category`);
        return response.data;
    } catch (error) {
        console.error("Error fetching products by category:", error);
    }


};

export default {
    getBestSeller,
    getDetailProduct,
    getProducts,
    fetchProductsByCategory
};
