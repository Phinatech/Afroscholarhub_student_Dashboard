// OneScholar.tsx
// import React from "react";
import { Button } from "../../../components/ui/button"
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useGetApprovedScholarshipsQuery, useStartApplicationMutation } from "../../../service/apiSlice";
import { FaArrowLeftLong } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import { url } from "../../../utils/Api";

const OneScholar= () => {

  const navigate = useNavigate()
  const {scholarshipId} = useParams()
  const { data: scholarships, isLoading, error } = useGetApprovedScholarshipsQuery();
  // const { data: scholarships, isLoading, error } = useGetApprovedScholarshipsQuery({ limit: 10, offset: 0 });

  const [startApplication, { isLoading: isApplying }] = useStartApplicationMutation();

  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  // Get scholarId from JWT token
  // let scholarId = "";
  const accessToken = localStorage.getItem("accessToken");
  console.log("acc-token", accessToken)

  const scholarId = localStorage.getItem("scholarId");
  // console.log("user-id", scholarId)

  // console.log("scholar-Id", scholarId)
  
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.toString()}</p>;

  // Find the specific scholarship
  const scholarship = scholarships?.find(sch => sch.id === scholarshipId);
  if (!scholarship) return <p>Scholarship not found.</p>;
  if (!scholarship) return <p>No scholarship selected.</p>;

  // console.log("scholarship-id", scholarshipId)

  const expertId = scholarship.creator
  // console.log("expert", expertId)
  // console.log("one-sch", scholarship)


  const handleApply = async () => {
    if (!scholarId) {
      console.log("Error: Scholar ID not found. Please log in again.");
      return;
    }
  
    const applicationPayload = {
      scholar: scholarId,
      scholarship: scholarshipId,
      expert: expertId,
    };
  
    // console.log("Application Payload:", applicationPayload);
  
    try {
      const response = await startApplication(applicationPayload).unwrap();
      console.log("Application Response:", response);
  
      toast.success("Application created");
      navigate("/dashhome/application", {state: {newApplication: response}});
    } catch (error: any) {
      console.error("Application Error:", error);
      // toast.error(error);
      toast.error(`${error.data?.message || error.message}`);
    }
  };

    // Rating
    const apiUrl = `${url}/expert/review`;

    const handleRate = async () => {
      setSubmitting(true);
      try {
        await axios.patch(apiUrl, { expertId, rating });
        toast.success("Rating submitted successfully!");
        setShowModal(false);
      } catch (error) {
        toast.error("Failed to submit rating. Try again later.");
      } finally {
        setSubmitting(false);
      }
    };
  


  return (
    <div className="w-[100%] mt-[10px] flex flex-col bg-[#fff] p-[30px]">
      <NavLink to="/dashhome/scholarship"><p className="text-[12px] lg:text-[14px] text-[#aba9a9] flex items-center gap-3 mb-[15px]"><FaArrowLeftLong /> Back To Scholarship</p></NavLink>

      <div className="w-full lg:w-[45%] flex justify-center items-center md:items-star lg:justify-start border-[1px] border-t-0 border-l-0 border-r-0 border-b-[#22212175]">
        <img src={scholarship.image || "N/A"} alt="" className="mt-[15px] md:mt-[15px] lg:mt-0" />
      </div>

      <div className="w-[100%] flex mt-[20px]">
        <div className="w-[100%] flex flex-col gap-2 justify-betwee">
          <p className="text-[14px] w-[100%] md:w-[90%] lg:w-[75%] font-[500] text-justify">{scholarship.description || "N/A"}</p>
          <div className="w-[15% flex flex-col">
            <Button
              onClick={handleApply}
              disabled={isApplying}
              className="w-[140px] lg:w-[140px] mt-[10px] text-[#fff] rounded-tr-[5px] rounded-bl-[5px] bg-[#8c301e] shadow-md"
            >
              {isApplying ? "Applying..." : "Apply by Expert"}
              {/* Apply */}
            </Button>

            <Button className="w-[120px] lg:w-[140px] mt-[10px] text-[#fff] rounded-tr-[5px] rounded-bl-[5px] bg-[#8c301e] shadow-md ">
              <a href={scholarship.application_link || "N/A"}>
                Apply by Self
              </a>
            </Button>

            <Button className="w-[170px] lg:w-[180px] mt-[10px] text-[#fff] rounded-tr-[5px] rounded-bl-[5px] bg-[#8c301e] shadow-md ">
                Consult an Expert ($5)
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center mt-[40px] flex-wrap gap-2">
        {scholarship.scholarship_keywords.map((keyword: string, index: number) => (
          <Button key={index} className="bg-[#42526B87] text-[10px] text-[#fff] rounded-full h-[30px] mr-[10px">
            {keyword}
          </Button>
        ))  || "N/A"}
      </div>

      <div className="mt-[10px] flex flex-wrap items-center gap-2">
        <h4 className="text-[14px] text-[#808080] font-[500]">Expert: </h4>

        {/* <div className="w-[55% ml-[10px] flex flex-wrap"> */}
          <div className="w-[130px h-[40px bg-[#fff] mr-[7px] mb-[7px] py-[10px] px-[10px] shadow-md flex flex-col rounded-[5px]">
            <p className="text-[13px] font-bold"><span className="font-[500]">Name: </span>{scholarship.expert?.first_name || "N/A"} {" "}  {scholarship.expert?.last_name || "N/A"}</p>

            <div className="flex">
              {[...Array(5)].map((_, index) => {
                const rating = scholarship.expert?.rating || 0;
                const roundedRating = Math.floor(rating); // Get the whole number part
                const hasHalfStar = rating - roundedRating >= 0.5; // Check if there’s a half-star

                if (index < roundedRating) {
                  // Full Star
                  return <FaStar key={index} size={12} color="#8c301e" className="mr-1" />;
                } else if (index === roundedRating && hasHalfStar) {
                  // Half Star
                  return <FaStarHalfAlt key={index} size={12} color="#8c301e" className="mr-1" />;
                } else {
                  // Empty Star
                  return <FaRegStar key={index} size={12} color="#8c301e" className="mr-1" />;
                }
              })}
            </div>

            <p className="text-[13px] font-bol">Language: <span className="text-[13px] font-bold">{scholarship.expert?.languages?.join(", ") || "N/A"}</span></p>

            <p className="text-[13px] font-bold"><span className="text-[13px] font-[500]">Year of Experience: </span> {scholarship.expert?.years_of_experience || "N/A"}</p>
          </div>
        {/* </div> */}

        <Button 
          className="w-[140px] lg:w-[140px] mt-[px] text-[#fff] rounded-tr-[5px] rounded-bl-[5px] bg-[#8c301e] shadow-md" 
          onClick={() => setShowModal(true)}>
          Rate Expert
        </Button>
      </div>

      <div className="flex sm: flex-col sm:items-start md:items-center mt-[10px] gap-2 lg:gap-6 mb-[8px]">
        <h3 className="text-[13px] font-[500]">
          Fee: <span className="text-[#8c301e] ml-[3px] font-[600]">${scholarship.application_fee || "N/A"}</span>
        </h3>
        <h3 className="text-[13px] font-[500] ml-0 md:ml-[20px]">
          Link:{" "}
          <a
            href={scholarship.application_link || "N/A"}
            className="text-[#2f2cb8] ml-[3px] font-[600]"
            target="_blank"
            rel="noopener noreferrer"
          >
            {scholarship.application_link}
          </a>
        </h3>
      </div>

      <div className="flex  sm: flex-col sm:items-start md:items-center md:mt-[10px] gap-2 lg:gap-4">
        <h3 className="text-[13px] font-[500]">
          Country: <span className="ml-[3px] font-[600] text-[#8c301e]">{scholarship.country || "N/A"}</span>
        </h3>
        <h3 className="text-[13px] font-[500] ml-0 md:ml-[20px]">
          Course: <span className="ml-[3px] font-[600] text-[#8c301e]">{scholarship.course || "N/A"}</span>
        </h3>
      </div>


      {/* pop-up / model */}
      {showModal && (
        <div className="fixed inset-0 bg-[#fff] bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 md:w-96">
            <h2 className="text-lg font-bold mb-4">Rate Expert</h2>
            <div className="flex justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map((num) => (
                <FaStar
                  key={num}
                  size={24}
                  className={num <= rating ? "text-yellow-500" : "text-gray-400"}
                  onClick={() => setRating(num)}
                />
              ))}
            </div>
            <div className="flex justify-between">
              <Button 
                className="bg-gray-500 text-white py-2 px-4 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
              <Button 
                className="bg-[#8c301e] text-white py-2 px-4 rounded"
                onClick={handleRate} 
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default OneScholar