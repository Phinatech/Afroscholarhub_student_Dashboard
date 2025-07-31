"use client"

import { useState, useEffect } from "react"
import { Button } from "../../../components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog"
import { EditProfileForm } from "./EditProfileForm"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import IsLoading from "../../isLoading/IsLoading"
import { jwtDecode } from "jwt-decode"
import { useGetScholarProfileQuery } from "../../../service/apiSlice"
import { ScholarProfile } from "../../../types/Interface"
import { url } from "../../../utils/Api"
import Cookies from "js-cookie"

interface DecodedToken {
  _id: string
  iat: number
  exp: number
  tokenType: string
}

interface ProfileFieldProps {
  label: string
  value: string | null | undefined
}

const ProfileField: React.FC<ProfileFieldProps> = ({ label, value }) => (
  <div className="flex flex-col w-[230px] mb-[12px]">
    <h4 className="text-[12px] md:tetx-[14px] lg-text-[16px font-[500] text-[#3f3f3f]">{label}</h4>
    <p className="text-[13px] md:text-[14px] lg:text-[18px font-[600] mt-[3px]">{value || "N/A"}</p>
  </div>
)

const logoutUser = () => {
  console.log("Logging out user...");
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  // window.location.href = "/"; 
  if (window.location.pathname !== "/") {
    window.location.href = "/";
  }
};

const refreshAccessToken = async () => {
  const refreshToken = Cookies.get("refreshToken") || localStorage.getItem("refreshToken");
  if (!refreshToken) {
    console.log("No refresh token found, logging out...");
    logoutUser();
    return null;
  }
  try {
    const response = await fetch(`${url}/scholar/refreshToken`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    const data = await response.json();
    if (data.success && data.accessToken) {
      Cookies.set("accessToken", data.accessToken, { expires: 1 });
      localStorage.setItem("accessToken", data.accessToken);
      return data.accessToken;
    } else {
      console.error("Failed to refresh token:", data.message);
      logoutUser();
      return null
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    logoutUser();
  }
  return null;
};

const Profile: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [isUserIdLoading, setIsUserIdLoading] = useState(true)


  const verifyToken = async () => {
    let token = localStorage.getItem("accessToken") || Cookies.get("accessToken");
  
    if (!token) {
      console.log("No token found, logging out...");
      toast.warning("Please log in to view your profile.");
      setIsUserIdLoading(false);
      return;
    }
    
    try {
      const decodedToken = jwtDecode<DecodedToken>(token);
      const currentTime = Date.now() / 1000;
  
      if (decodedToken.exp <= currentTime) {
        console.error("Access token expired, attempting to refresh...");
        toast.error("Your session has expired. Refreshing token...");
        
        token = await refreshAccessToken();
        if (!token) {
          console.error("Failed to refresh token, logging out...");
          logoutUser();
          return;
        }
      }
      
      setUserId(decodedToken._id);
    } catch (error) {
      console.error("Error decoding token:", error);
      toast.error("Error decoding token. Please logout and log in again.");
      logoutUser();
    }
    
    setIsUserIdLoading(false);
  };
  
  useEffect(() => {
    verifyToken();
  }, []);
  

  const { data: profile, isLoading, error } = useGetScholarProfileQuery(userId ?? "", { skip: !userId })

  if (isUserIdLoading || isLoading) return <IsLoading />
  if (error) {
    console.error("Error details:", error)
    return <div>Error loading profile: {error.toString()}. Please try refreshing the page.</div>
  }

  if (!profile) {
    return <div>No profile data available. Please ensure you're logged in and try again.</div>
  }
  
  const profileData: ScholarProfile = profile.data
  // console.log("profile", profileData)

  return (
    <div className="pt-[15px] flex flex-col w-[100%] h-[100%]">
      <div className="flex items-center">
        <div className="w-[5px] h-[5px] bg-[#000] rounded-full"></div>
        <h3 className="text-[16px] font-semibold ml-[10px]">Profile</h3>
      </div>

      <div className="w-[100%] p-[15px] bg-[#fff] rounded-tr-[12px] rounded-bl-[12px] mt-[20px]">
        <div className="flex items-center justify-between">
          <h3 className="text-[18px] font-[600]">Personal Information</h3>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#000] text-[#fff]">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-[#fff]">
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle><DialogDescription>Update your profile..</DialogDescription>
              </DialogHeader>
              {userId && <EditProfileForm scholarId={userId} />}
            </DialogContent>
          </Dialog>
        </div>

        <div className="w-[100%] flex mt-[15px] flex-wrap">
          <ProfileField label="First Name" value={profileData.first_name} />
          <ProfileField label="Last Name" value={profileData.last_name} />
          <ProfileField label="Gender" value={profileData.gender} />
          <ProfileField label="Nationality" value={profileData.nationality} />
          <ProfileField label="Email" value={profileData.email} />
          <ProfileField label="Preferred Language" value={profileData.preferred_languages?.join(", ")} />
          <ProfileField
            label="Date of Birth"
            value={
              profileData.dob
                ? new Date(profileData.dob).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : null
            }
          />
        </div>

        <div className="w-[100%] flex flex-col mt-[20px]">
          <h3 className="text-[18px] font-[700]">Educational Background</h3>
          <div className="w-[100%] flex mt-[15px] flex-wrap">
            <ProfileField label="Current Education Level" value={profileData.current_education_level} />
            <ProfileField label="Field of Study" value={profileData.field_of_study} />
            <ProfileField label="Year of Graduation" value={profileData.graduation_year} />
            <ProfileField label="Institution Name" value={profileData.institution_name} />
            <ProfileField label="Academic Achievement" value={profileData.academics_achievements} />
          </div>
        </div>

        <div className="w-[100%] flex flex-col mt-[20px]">
          <h3 className="text-[18px] font-[700]">Scholarship Preference</h3>
          <div className="w-[100%] flex mt-[15px] flex-wrap">
            <ProfileField label="Type of Scholarship" value={profileData.scholarship_type} />
            <ProfileField label="Preferred Field of Study" value={profileData.preferred_study_field} />
            <ProfileField label="Preferred Location" value={profileData.preferred_scholarship_location} />
            <ProfileField label="Specific Requirements" value={profileData.specific_scholarship_requirement} />
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  )
}

export default Profile
