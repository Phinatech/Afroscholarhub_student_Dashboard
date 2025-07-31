import Cookies from "universal-cookie"

const cookies = new Cookies()

export const setToken = (token: string) => {
  // Set the token as an HTTP-only cookie that expires in 7 days
  cookies.set("token", token, {
    path: "/",
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    secure: process.env.NODE_ENV === "production", // Use secure in production
    sameSite: "strict",
    httpOnly: true,
  })
}

export const getToken = (): string | null => {
  return cookies.get("token") || null
}

export const removeToken = () => {
  cookies.remove("token", { path: "/" })
}