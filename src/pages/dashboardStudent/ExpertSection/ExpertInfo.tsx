import { FaStar, FaRegStar } from "react-icons/fa";

const ExpertInfo = () => {
  return (
    <div className="w-[100%] flex flex-col">
        <div className="w-[100%] flex flex-wrap mt-[40px] pb-[20px] border-[1px] border-t-0 border-l-0 border-r-0 border-b-[#22212175]">
        <div className="flex flex-col w-[300px] mb-[20px]">
            <p className="text-[13px] font-[500] text-[#222121]">Name</p>
            <h3 className="text-[16px] font-[700] mt-[3px]">Mensah Obi</h3>
        </div>
        <div className="flex flex-col w-[300px]">
            <p className="text-[13px] font-[500] text-[#222121]">Languages Spoken</p>
            <h3 className="text-[16px] font-[700] mt-[3px]">English, French, German</h3>
        </div>
        <div className="flex flex-col w-[300px]">
            <p className="text-[13px] font-[500] text-[#222121]">Rating</p>
            <div className="flex items-center">
                <FaStar size={10} color="#ffcd29" className="mr-[3px]"/>
                <FaStar size={10} color="#ffcd29" className="mr-[3px]"/>
                <FaStar size={10} color="#ffcd29" className="mr-[3px]"/>
                <FaRegStar size={10} color="#ffcd29" className="mr-[3px]"/>
                <FaRegStar size={10} color="#ffcd29" className="mr-[3px]"/>
            </div>
        </div>
        <div className="flex flex-col w-[300px]">
                <p className="text-[13px] font-[500] text-[#222121]">Nationality</p>
                <h3 className="text-[16px] font-[700] mt-[3px]">Ghanian</h3>
            </div>
            <div className="flex flex-col w-[300px]">
                <p className="text-[13px] font-[500] text-[#222121]">Years of Experience</p>
                <h3 className="text-[16px] font-[700] mt-[3px]">4</h3>
            </div>
        </div>
        <div className="w-[100%] mt-[20px] pb-[20px] border-[1px] border-t-0 border-l-0 border-r-0 border-b-[#22212175]">
            <p className="text-[13px] font-[500] text-[#222121]">Expertise</p>
            <h3 className="text-[16px] font-[700] mt-[3px]">STEM, Women, Undergraduates, PhD, MSc, Athletics</h3>
        </div>
        <div className="w-[100%] mt-[20px] pb-[20px]">
            <p className="text-[13px] font-[500] text-[#222121]">Qualifications</p>
            <h3 className="text-[16px] font-[700] mt-[3px]">Oxford School of Business</h3>
            <h3 className="text-[16px] font-[700] mt-[3px]">University of Accra</h3>
        </div>
    </div>
  )
}

export default ExpertInfo
