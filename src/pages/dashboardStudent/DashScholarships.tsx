// "use client"


import { NavLink } from "react-router-dom"
import { useMemo } from "react"
import { useGetApprovedScholarshipsQuery } from "../../service/apiSlice";
// import img1 from "../../../assets/logo/AfroSchHub-logo-bg.png"

const DashScholarship = () => {
  const { data, error, isLoading } = useGetApprovedScholarshipsQuery()

  console.log("This is the data", data)

  const scholarships = useMemo(() => data || [], [data]);

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.toString()}</div>
  if (!data) return <div>No data received</div>

  return (
    <>
      <div className="flex flex-col w-[50%] h-[100%]">
        {/* <div className="flex items-center pt-[15px]">
          <div className="w-[5px] h-[5px] bg-[#000] rounded-full"></div>
          <h3 className="text-[16px] font-semibold ml-[10px]">Scholarship(s)</h3>
        </div> */}

        <div className="w-[50%] p-[15px] bg-[#fff] rounded-tr-[12px] rounded-bl-[12px] mt-[20px]">
          {/* <div className="flex flex-col md:flex-row lg:flex-row md:items-center lg:items-center gap-2 mb-[20px]">
            <input
              className="md:w-[350px] lg:w-[450px] rounded-full text-[11px] md:text-[13px] lg:text-[15px] border-[1px] border-[#848484] p-2"
              placeholder="Search Scholarships i.e. Country, price etc."
            />
            <button className="w-[140px] h-10 rounded-full bg-[#8c301e] text-[#fff] ml-[10px]">
              Search
            </button>
          </div> */}

          <>
          {scholarships.slice(0.3).map((scholarship: any) => (
            <NavLink key={scholarship.id} to={`/dashhome/scholarship/details/${scholarship.id}`}>
              <div className="w-full flex flex-col md:flex-row gap-3 mt-[10px]">
                <img
                  src={scholarship.image || "N/A"}
                  alt="Scholarship"
                  className="w-full md:w-[40%] lg:w-[20%] border-[1px] border-[#8d8d8d] rounded-[10px] p-2"
                />

                <div className=" flex flex-col gap-2 mt-[10px] md:mt-0 lg:mt-0">
                  <p className="text-[16px] font-[600] lg:mt-[10px] text-[#8c301e]">
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
          </>
        </div>
      </div>
    </>
  );
};

export default DashScholarship;
