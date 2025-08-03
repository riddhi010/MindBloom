import axios from "axios"; //to make http requests to the backend
const API = axios.create({ baseURL: "http://localhost:5000/api" });//all requests will be made using this instance

export const registerUser = (userData) => API.post("/auth/register", userData);
export const loginUser = async (userData) => {
    try {
        const response = await API.post("/auth/login", userData);
        localStorage.setItem("authToken", response.data.token); 
        return response.data;
    } catch (error) {
        console.error("Login failed:", error.response?.data || error.message);
        throw error; 
    }
};

export default API;
