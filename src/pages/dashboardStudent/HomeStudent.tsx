// import React from 'react'
import img from "../../assets/images/watch.png"
import img2 from "../../assets/images/note.png"
import img3 from "../../assets/images/application.png"
import img4 from "../../assets/images/pending.png"
import img5 from "../../assets/images/canclled.png"
import { IoIosArrowRoundForward } from "react-icons/io";
import { NavLink } from "react-router-dom"
import { useGetApprovedScholarshipsQuery, useGetScholarProfileQuery, useGetScholarsApplicationsQuery } from "../../service/apiSlice"
import { jwtDecode } from "jwt-decode";
import { useMemo } from "react"
import { FaArrowRightLong } from "react-icons/fa6";
// import {Table, TableHeader, TableBody, TableHead, TableRow, TableCell} from "../../components/ui/table"
// import { FaStar, FaRegStar } from "react-icons/fa";
import Cookies from "js-cookie"
interface DecodedToken {
  _id: string
  iat: number
  exp: number
  tokenType: string
}

const HomeStudent = () => {

  // const scholarId = localStorage.getItem("scholarId");
  let scholarId = "";
    const accessToken = localStorage.getItem("accessToken");
    // console.log("acc-token", accessToken)

    
    const accessToken2 = Cookies.get("accessToken");
    console.log("cookie-access", accessToken2)
  
    if (accessToken) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(accessToken);
        scholarId = decodedToken?._id;
         
        localStorage.setItem("scholarId", (scholarId));
      } catch (err) {
        console.error("Error decoding token:", err);
      }
    }
  
    // console.log("scholar-Id", scholarId)


    // All scholarships  // 
      const { data: applications = { data: [] }} = useGetScholarsApplicationsQuery(scholarId);

      const { data, error, isLoading } = useGetApprovedScholarshipsQuery()
      
        // console.log("This is the data", data)

      const { data : scholarProfile} = useGetScholarProfileQuery(scholarId ?? "", { skip: !scholarId })

      // console.log("home-profile", scholarProfile)
      
        const scholarships = useMemo(() => data || [], [data]);
      
        if (isLoading) return <div>Loading...</div>
        if (error) return <div>Error: {error.toString()}</div>
        if (!data) return <div>No data received</div>
  
      // console.log("my-appli", applications?.data ?? [])
  
      // if (isLoading) return <p>Loading applications...</p>;
      // if (error) return <p>Error fetching applications.</p>;
  
      const getStatusColor = (status: string) => {
          switch (status) {
            case "pending":
              return "#DFE702"; 
            case "completed":
              return "#000"; 
            case "in_progress":
              return "green"; 
            case "canceled":
              return "red"; 
            default:
              return "#9a9999"; 
          }
      };

      const scholarsApplications = applications?.data?.length
      // console.log("tot-app", scholarsApplications)

      const totalPendingApplications = applications?.data?.filter((app: any) => app?.status === "pending")?.length || 0;

      const totalCompletedApplications = applications?.data?.filter((app:any) => app?.status === "completed")?.length || 0;

      const totalProgressApplications = applications?.data?.filter((app:any) => app?.status === "in_progress")?.length || 0;



  return (
    <div className="pt-[15px] flex flex-col w-full mb-[30px]">
      <div className="flex items-center">
        <div className="w-[5px] h-[5px] bg-[#000] rounded-full"></div>
        <h3 className="text-[16px] font-semibold ml-[10px] text-[#8c301e]">Home</h3>
      </div>

      <div className="w-[100%] flex justify-between mt-[20px] flex-wrap">
        <div className="w-[60%] md:w-[100%] sm:w-[100%] flex flex-col">
          <div className="w-[100%] bg-[#fff] p-[14px] rounded-tr-[12px] rounded-bl-[12px] flex justify-between">
            <div className="flex flex-col">
              <h3 className="font-bold w-[150px  text-[#8c301e] font-[600]">
                Hey 👋, Welcome Back {scholarProfile?.data?.first_name ? 
                scholarProfile?.data?.first_name : null }
              </h3>
              <p className="text-[#504e4e font-[500 text-[11px] md:text-[13px] sm:w-[150px] text-[#8c301e] font-[600]">
                {!scholarProfile?.data?.first_name ? 
                "*Please, complete your profile to have full access to our services." : null }</p>
            </div>
            <div className="flex justify-center items-center">
              <img src={img} alt="" className="h-[60px]"/>
            </div>
          </div>

          <div className="w-[100%] mt-[20px] flex flex-wrap justify-between">
            <div className="w-[48%] mb-[20px] p-[13px] bg-[#fff] flex flex-col rounded-tr-[12px] rounded-bl-[12px]">
              <h4 className="text-[14px] text-[#8c301e] font-[600]">Application(s) Applied</h4>
              <div className="w-[100%] flex justify-between items-center mt-[15px]">
                <h2 className="font-bold text-[22px] lg:text-[27px] text-[#8c301e]">{scholarsApplications || "0"}</h2>
                <img src={img2} alt="" className="h-[35px]"/>
              </div>
            </div>
            <div className="w-[48%] mb-[20px] p-[13px] bg-[#fff] flex flex-col rounded-tr-[12px] rounded-bl-[12px]">
              <h4 className="text-[14px]  text-[#8c301e] font-[600]">Completed Application(s)</h4>
              <div className="w-[100%] flex justify-between items-center mt-[15px]">
                <h2 className="font-bold text-[22px] lg:text-[27px] text-[#8c301e]">{totalCompletedApplications}</h2>
                <img src={img3} alt="" className="h-[35px]"/>
              </div>
            </div>
            <div className="w-[48%] p-[13px] bg-[#fff] flex flex-col rounded-tr-[12px] rounded-bl-[12px]">
              <h4 className="text-[14px] text-[#8c301e] font-[600]">Application(s) Pending</h4>
              <div className="w-[100%] flex justify-between items-center mt-[15px]">
                <h2 className="font-bold text-[22px] lg:text-[27px] text-[#8c301e]">{totalPendingApplications || "0"}</h2>
                <img src={img4} alt="" className="h-[35px]"/>
              </div>
            </div>
            <div className="w-[48%] p-[13px] bg-[#fff] flex flex-col rounded-tr-[12px] rounded-bl-[12px]">
              <h4 className="text-[14px] text-[#8c301e] font-[600]">Canceled Application(s) </h4>
              <div className="w-[100%] flex justify-between items-center mt-[15px]">
                <h2 className="font-bold text-[22px] lg:text-[27px] text-[#8c301e]">{totalProgressApplications}</h2>
                <img src={img5} alt="" className="h-[35px]"/>
              </div>
            </div>
          </div>
        </div>

        <div className="h-[100%] w-[35%] md:w-[100%] sm:w-[100%] md:mb-[40px] md:mt-[40px] sm:mt-[30px] flex flex-col bg-[#fff] p-[14px] rounded-tr-[12px] rounded-bl-[12px]">
          <div className="w-[200px] h-[30px]  bg-[#8c301e] font-[600] rounded-tr-[5px] rounded-bl-[5px] flex justify-center items-center lg:mb-[15px]">
            <h3 className="font-[600] text-[14px] text-[#fff]">My Applications</h3>
          </div>

          <div>
          {applications?.data?.slice(0, 2).map((app: any) => (
            <div key={app?.key} className="w-[100%] p-[10px] bg-[#F3F4FD] mt-[8px] flex flex-col gap- lg:py-[10px]">
              <h3 className="text-[14px] font-semibold">
                {/* Annual Oxford STEM Graduates */}
                {/* Scholarship ($10,000) */}
                {app?.scholarship?.title}
              </h3>
              <div className="w-[100%] flex items-center gap-5 mt-[3px]">
                <h4 className="text-[#222121] font-[500] text-[13px]">Status: <span className="font-[600]"  style={{ color: getStatusColor(app?.status) }}>{app?.status}</span></h4>
                <h4 className="text-[#222121] font-[500] text-[13px]">Fee: <span className="text-[#000] font-[600]">{app.scholarship?.application_fee}</span></h4>
              </div>

              <div className="w-[100%] fle mt-[5px]">
                <h4 className="text-[#222121] text-[13px]">Expert: <span className="text-[#000] font-[600]">{app?.expert?.first_name} {" "} {app?.expert?.last_name}</span></h4>
              </div>
            </div>
            )) || "NA"}
          </div>

          <div className="w-[100%] flex justify-end mt-[20px] items-center">
            <NavLink to="/dashhome/applications"></NavLink><h4 className="text-[14px] text-[#222121]">View All Applications</h4>
            <IoIosArrowRoundForward size={20} color="#222121" className="ml-[5px]"/>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#fff] rounded-tr-[12px] rounded-bl-[12px] mt-[20px] p-4 pb-[20px]" >
        <p className="text-[14px] md:text-[16px] lg:text-[20px] font-[600] text-[#8c301e]">Scholarhships</p>

        <hr className="w-full border-[1px] border-[#848484] mt-[10px] mb-[20px]" />

        <div className="w-full flex flex-col">
          {scholarships.slice(0, 3).map((scholarship: any) => (
            <NavLink key={scholarship.id} to={`/dashhome/scholarship/details/${scholarship.id}`}>
              <div className="w-full flex flex-col md:flex-row lg:flex-row gap-3 lg:gap-4 mt-[10px]">
                <img
                  src={scholarship.image || "N/A"}
                  alt="Scholarship"
                  className="w-full md:w-[40%] lg:w-[25%] border-[1px] border-[#8d8d8d] rounded-[10px] p-2"
                />

                <div className=" flex flex-col gap-2 mt-[10px] md:mt-0 lg:mt-0">
                  <p className="text-[16px] lg:text-[20px] font-[600] lg:mt-[10px] text-[#8c301e]">
                    {scholarship.title || "John Hopkins University"}
                  </p>

                  <p className="text-[13px] md:text-[13px] lg:text-[15px] lg:w-[85%] text-justify font-[400]">
                    {scholarship.description.slice(0, 300) || "N/A"}...
                  </p>

                  <div className="flex items-center">
                    {scholarship.scholarship_keywords?.map((keyword: any, index: any) => (
                      <span
                        key={index}
                        className="bg-[#42526B87] text-[9px] text-[#fff] rounded-full mr-[10px] p-1 px-2"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    <h3 className="text-[14px] font-[500]">
                      Fee:{" "}
                      <span className="text-[#8c301e] ml-[3px] font-[600]">
                        ${scholarship.application_fee || "300"}
                      </span>
                    </h3>

                    <h3 className="text-[14px] font-[500]">
                      Country:{" "}
                      <span className="text-[#8c301e] ml-[3px] font-[600]">
                        {scholarship.country || "United States"}
                      </span>
                    </h3>
                  </div>

                  <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4">
                    <h3 className="text-[14px] font-[500]">
                      Link:{" "}
                      <a
                        href={scholarship.application_link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#8c301e] ml-[3px] font-[600]"
                      >
                        {scholarship.application_link || "https://johnhopkinsch.sch"}
                      </a>
                    </h3>

                    <h3 className="text-[14px] font-[500]">
                      Course:{" "}
                      <span className="text-[#8c301e] ml-[3px] font-[600]">
                        {scholarship.course || "Medicine"}
                      </span>
                    </h3>
                  </div>
                </div>
              </div>

              <hr className="w-full border-[1px] border-[#848484] mt-[10px]" />
            </NavLink>
          ))}
        </div>

        <div className="w-full flex items-center justify-between mt-[15px]">
          <p></p>
          <NavLink to="/dashhome/scholarship"><button className="bg-[#8c301e] p-2 px-3 text-white flex items-center gap-2 text-[13px] md:text-[15px] lg:text-[18px] rounded-[7px]">All Scholarships <FaArrowRightLong /></button></NavLink>
        </div>
      </div>

    </div>
  )
}

export default HomeStudent