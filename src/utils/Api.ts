// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../global/redux/Store";
// import { setProfile, setProfileLoading } from "../global/redux/ProfileSlice";
// import { DecodedUser } from "../types/Interface";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { jwtDecode } from "jwt-decode";


export const url = import.meta.env.VITE_APP_API_URL;

// import axios from "axios";
// import jwtDecode from "jwt-decode";
// import { toast } from "react-toastify";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../../global/redux/Store";
// import { setProfile, setProfileLoading } from "../../../global/redux/ProfileSlice";
// import { DecodedUser } from "../../../types/DecodedUser"; // Interface for decoded token
// import { url } from "../../../utils/Api";

// Define the DecodedUser interface if not already defined
// export interface DecodedUser {
//   _id: string;
// }

// const fetchExpertProfile = async () => {
//   const dispatch = useDispatch();
//   const user = useSelector((state: RootState) => state.user);
//   const token = user.refreshToken;

//   console.log(token)

//   if (!token) {
//     console.warn("No token found. Aborting profile fetch.");
//     return;
//   }

//   try {
//     dispatch(setProfileLoading(true)); // Set loading state to true

//     // Decode JWT to extract the user ID
//     const decoded = jwtDecode<DecodedUser>(token);
//     const expertId = decoded._id;

//     console.log("Decoded Expert ID:", expertId); // Debugging

//     // Make the GET request to fetch the profile
//     const response = await axios.get(`${url}/expert/profile/${expertId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//     });

//     // Store profile in Redux and localStorage
//     if (response.status === 200) {
//       dispatch(setProfile(response.data));
//       localStorage.setItem("expertProfile", JSON.stringify(response.data));

//       console.log("Profile Data:", response.data);
//       toast.success("Profile loaded successfully!");
//     } else {
//       toast.error("Failed to load profile.");
//     }
//   } catch (error: any) {
//     console.error("Error fetching profile:", error.message);
//     toast.error("An error occurred while fetching the profile.");
//   } finally {
//     dispatch(setProfileLoading(false)); // Set loading state to false
//   }
// };

// export default fetchExpertProfile;
