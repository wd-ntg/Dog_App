import SERVER_EXPRESS_URL from "./configurl";
import axios from "axios";

const getCategoryPets = async (id: any) => {
  try {
    // Tạo query string
    const query = new URLSearchParams({ id }).toString();

    // Gọi API với query string
    const response: any = await axios.get(`${SERVER_EXPRESS_URL}/api/breed/categories/?${query}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching category dogs:", error);
    throw error;
  }
};
const getDetailPet = async (id: any) => {
  try {
    // Tạo query string
    const query = new URLSearchParams({ id }).toString();

    // Gọi API với query string
    const response: any = await axios.get(`${SERVER_EXPRESS_URL}/api/breed/detail/?${query}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching category dogs:", error);
    throw error;
  }
};




export default {
  getCategoryPets,
  getDetailPet
};
