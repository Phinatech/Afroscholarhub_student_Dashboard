import { useState } from "react"
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa"
// import { FcGoogle } from "react-icons/fc"
import { NavLink, useNavigate } from "react-router-dom"
import "../../../components/block/ButtonAnime.css"
import logo from "../../../assets/logo/afro-new-logo.png"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { Login } from "../../../utils/ApiCalls"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { updateUserDetails } from "../../../service/reducers"
import Cookies from "js-cookie"

// const cookies = new Cookies()

const formSchema = z.object({
  email: z.string().email("Invalid email address").min(2, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

const SigninExpert = () => {
  const [passwordShow, setPasswordShow] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { isSubmitting } = form.formState

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await Login(values)

      if (response?.status === 200 && response.data.success) {
        toast.success("Login Successful")
        // const expiryDate = new Date()
        // expiryDate.setDate(expiryDate.getDate() + 7)
        // cookies.set("afrohub_cookie_student", response.data.accessToken, {
        //   expires: expiryDate,
        //   path: "/",
        // })
        // Assuming the API returns user details along with tokens
        // If not, you might need to make another API call to get user details
        dispatch(updateUserDetails(response.data))
        console.log("response", response.data)

        localStorage.setItem("accessToken", (response.data.accessToken));
        localStorage.setItem("refreshToken", (response.data.refreshToken));
        Cookies.set("accessToken", (response.data.accessToken))
        Cookies.set("refreshToken", (response.data.refreshToken))
      
        console.log("Stored accessToken:", localStorage.getItem("accessToken"));
        console.log("Stored refreshToken:", localStorage.getItem("refreshToken"));

        navigate("/dashhome")
      } else {
        toast.error("Login failed. Please check your credentials.")
      }
    } catch (error: any) {
      console.error("Submission error:", error)
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        toast.error(error.response.data.message || "An error occurred. Please try again.")
      } else if (error.request) {
        // The request was made but no response was received
        toast.error("No response from server. Please try again later.")
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error("An error occurred. Please try again.")
      }
    }
  }

  const togglePasswordVisibility = () => {
    setPasswordShow(!passwordShow)
  }

  return (
    <div className="w-full min-h-[100vh] flex bg-[#f9ffec]">
      <div className="w-full hidden lg:flex flex-col justify-between items-cente bg-auth-bg2 bg-center bg-cover md:w-[50% lg:w-[45%] p-[20px]"
      >
          <p></p>

          <p className='text-[30px] text-white font-bold leading-[40px] mb-[20px] ml-[50px]'>
            Take The First Step <br/> Towards your Academic Dream <br /><span className='text-[#F4FC03] text-[35px]'>START YOUR JOURNEY NOW!</span> 
          </p>
      </div>

      <div className="w-full md:w-[50% lg:w-[55%] flex items-center justify-center bg-transparent  relative">
        <div className="w-full h-full bg-auth-bg2 bg-center bg-cover lg:hidden"></div>

        <div className="w-[290px] h-[280px md:w-[400px] lg:w-[400px] md:h-[400px bg-white shadow-lg rounded-bl-[20px] rounded-tr-[20px] flex flex-col items-center justify-center gap-5 p-3 py-5 md:p-4 absolute bg-opacity-90 md:bg-opacity-90">
          <div className="w-[100px]">
            <img src={logo || "/placeholder.svg"} alt="" className="w-full" />
          </div>

          <p className="text-[#000] text-[18px] md:text-[25px] font-bold">Welcome Back, Student!</p>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col items-center w-[80%] gap-[15px] md:gap-[25px]"
          >
            {/* <button className="w-full h-[45px] flex items-center gap-3 p-3 text-[14px] md:text-[16px border-[1px] border-[#000] rounded-bl-[15px] rounded-tr-[15px] hover:bg-[#000] hover:text-[#fff]">
              <FcGoogle />
              Continue with Google
            </button>

            <h1 className="text-[14px] md:text-[17px] font-bold">OR</h1> */}

            <input
              className="w-full h-[45px] flex items-center gap-3 p-3 text-[12px] md:text-[16px] border-[1px] border-[#b4b4b4] rounded-bl-[15px] rounded-tr-[15px] bg-transparent  outline-none"
              type="email"
              placeholder="Email"
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
            )}

            <div className="w-full border-[1px] rounded-bl-[15px] rounded-tr-[15px] [6px] px-2 h-[40px] md:h-[50px] flex justify-betweeen items-center border-[#b4b4b4] bg-transparent outline-none">
              <input
                className="border-none text-[12px]  md:text-[16px] w-[95%] outline-none bg-transparent"
                type={passwordShow ? "text" : "password"}
                placeholder="Password"
                {...form.register("password")}
              />
              <div onClick={togglePasswordVisibility} className="cursor-pointer text-[#00285e]">
                {passwordShow ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
            {form.formState.errors.password && (
              <p className="text-red-500 text-sm mt-1">{form.formState.errors.password.message}</p>
            )}

            <div className="w-full flex items-center justify-between">
              <div></div>
              <NavLink to="/reset-password">
                <h2 className="text-[13px] md:text-[16px] text-[#8a8888] mt-[-8px]">Forgot Password</h2>
              </NavLink>
            </div>

            <button className="w-full flex justify-center items-center css-button-sliding-to-left--sky" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="w-full flex justify-center items-center">
                  <svg
                    className="animate-spin mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                </div>
              ) : (
                "Sign In"
              )}
            </button>

            <p className="text-[#9d9d9d] text-[13px] md:text-[16px]">
              Don't have an account?{" "}
              <NavLink to="/signup">
                <span className="cursor-pointer text-[#000] font-bold">Signup</span>
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SigninExpert

