// "use client"

import { useGetApprovedScholarshipsQuery } from "../../../service/apiSlice"
import { NavLink } from "react-router-dom"
import { useMemo, useState } from "react"
import ScrollToTop from "../../../components/block/ScrollTotop";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Scholarship = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 10;
  const { data, error, isLoading } = useGetApprovedScholarshipsQuery();

  const scholarships = useMemo(() => {
    if (!data) return [];
    
    return data.filter((scholarship: any) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        scholarship.title?.toLowerCase().includes(searchLower) ||
        scholarship.country?.toLowerCase().includes(searchLower) ||
        scholarship.course?.toLowerCase().includes(searchLower) ||
        scholarship.description?.toLowerCase().includes(searchLower) ||
        scholarship.application_fee?.toString().includes(searchTerm) ||
        scholarship.scholarship_keywords?.some((keyword: string) => 
          keyword.toLowerCase().includes(searchLower)
        )
      );
    });
  }, [data, searchTerm]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentScholarships = scholarships.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(scholarships.length / itemsPerPage);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page when searching
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;
  if (!data) return <div>No data received</div>;

  return (
    <>
      <ScrollToTop />
      <div className="flex flex-col w-[100%] h-[100%]">
        <div className="flex items-center pt-[15px]">
          <div className="w-[5px] h-[5px] bg-[#000] rounded-full"></div>
          <h3 className="text-[16px] font-semibold ml-[10px]">Scholarship(s)</h3>
        </div>

        <div className="w-[100%] p-[15px] bg-[#fff] rounded-tr-[12px] rounded-bl-[12px] mt-[20px]">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row lg:flex-row md:items-center lg:items-center gap-2 mb-[20px]">
            <input
              className="md:w-[350px] lg:w-[450px] rounded-full text-[11px] md:text-[13px] lg:text-[15px] border-[1px] border-[#848484] p-2"
              placeholder="Search Scholarships i.e. Country, price etc."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button 
              type="submit"
              className="w-[140px] h-10 rounded-full bg-[#8c301e] text-[#fff] ml-[10px]"
            >
              Search
            </button>
          </form>

          {currentScholarships.length === 0 ? (
            <div className="text-center py-10">
              No scholarships found matching your search criteria.
            </div>
          ) : (
            <>
              {currentScholarships.map((scholarship: any) => (
                <NavLink key={scholarship.id} to={`/dashhome/scholarship/details/${scholarship.id}`}>
                  <div className="w-full flex flex-col md:flex-row lg:flex-row gap-3 mt-[10px]">
                    <img
                      src={scholarship.image || "N/A"}
                      alt="Scholarship"
                      className="w-full md:w-[40%] lg:w-[25%] border-[1px] border-[#8d8d8d] rounded-[10px] p-2"
                    />

                    <div className="flex flex-col gap-2 mt-[10px] md:mt-0 lg:mt-0">
                      <p className="text-[16px] lg:text-[20px] font-[600] lg:mt-[10px] text-[#8c301e]">
                        {scholarship.title || "N/A"}
                      </p>

                      <p className="text-[13px] md:text-[13px] lg:text-[15px] lg:w-[85%] text-justify font-[400]">
                        {scholarship.description.slice(0, 300) || "N/A"}...
                      </p>

                      <div className="flex items-center flex-wrap gap-2">
                        {scholarship.scholarship_keywords?.map((keyword: string, index: number) => (
                          <span
                            key={index}
                            className="bg-[#42526B87] text-[9px] text-[#fff] rounded-full mr-[10px p-1 px-2"
                          >
                            {keyword}
                          </span>
                        )) || "N/A"}
                      </div>

                      <div className="w-[180px] h-[40px bg-[#fff] mr-[7px] mb-[7px] py-[10px] px-[10px] shadow-md flex flex-col rounded-[5px]">
                        <p className="text-[13px] font-bold"><span className="font-[500]">Name: </span>{scholarship.expert?.first_name || "N/A"} {" "}  {scholarship.expert?.last_name || "N/A"}</p>

                        <div className="flex">
                          {[...Array(5)].map((_, index) => {
                            const rating = scholarship.expert?.rating || 0;
                            const roundedRating = Math.floor(rating);
                            const hasHalfStar = rating - roundedRating >= 0.5;

                            if (index < roundedRating) {
                              return <FaStar key={index} size={12} color="#8c301e" className="mr-1" />;
                            } else if (index === roundedRating && hasHalfStar) {
                              return <FaStarHalfAlt key={index} size={12} color="#8c301e" className="mr-1" />;
                            } else {
                              return <FaRegStar key={index} size={12} color="#8c301e" className="mr-1" />;
                            }
                          })}
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <h3 className="text-[14px] font-[500]">
                          Fee:{" "}
                          <span className="text-[#8c301e] ml-[3px] font-[600]">
                            ${scholarship.application_fee || "N/A"}
                          </span>
                        </h3>

                        <h3 className="text-[14px] font-[500]">
                          Country:{" "}
                          <span className="text-[#8c301e] ml-[3px] font-[600]">
                            {scholarship.country || "N/A"}
                          </span>
                        </h3>
                      </div>

                      <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4">
                        <h3 className="text-[14px] font-[500]">
                          Course:{" "}
                          <span className="text-[#8c301e] ml-[3px] font-[600]">
                            {scholarship.course || "N/A"}
                          </span>
                        </h3>
                      </div>
                    </div>
                  </div>

                  <hr className="w-full border-[1px] border-[#848484] mt-[10px]" />
                </NavLink>
              ))}
            </>
          )}

          <div className="flex justify-between items-center mt-4">
            <button
              className="px-4 py-2 bg-[#8c301e] text-white rounded-md disabled:opacity-50"
              onClick={() => setCurrentPage((prev: number) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            <span className="text-lg">{currentPage} of {totalPages}</span>

            <button
              className="px-4 py-2 bg-[#8c301e] text-white rounded-md disabled:opacity-50"
              onClick={() => setCurrentPage((prev: number) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Scholarship;