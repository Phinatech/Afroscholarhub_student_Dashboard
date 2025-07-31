import axios from "axios"
import Cookies from "universal-cookie"

const cookies = new Cookies();

export const Instance = axios.create({
    baseURL: "https://afro-scholar-hub-server.onrender.com/api/v1"
})

Instance.interceptors.request.use(
    (config) => {
        const token = cookies.get("afrohub_cookie_student")

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)