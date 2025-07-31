import { Instance } from "./ApiConfig";

export const Login = async (data: any) => {
    try {
        console.log("Sending data:", data);
        const response = await Instance.post("/scholar/login", data);
        console.log("Response received:", response);
        return response;
    } catch (err: any) {
        console.error("Login error:", err.response?.data || err.message || err);
        return err.response?.data || err.message || err;
    }
}

export const Register = async (data: any) => {
    try {
        console.log("Sending registration data:", data);
        const response = await Instance.post("/scholar/register", data);
        console.log("Registration successful:", response);
        return response;
    } catch (err: any) {
        console.error("Registration error:", err.response?.data || err.message || err);
        return err.response?.data || err.message || err;
    }
};