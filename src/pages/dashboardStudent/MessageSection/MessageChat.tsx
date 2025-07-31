import { MdAccessTime } from "react-icons/md";
import { IoImagesOutline } from "react-icons/io5";
import { Input } from "../../../components/ui/input";
import { VscSend } from "react-icons/vsc";

const MessageChat = () => {
  return (
    <div className="flex flex-col w-[100%] mt-[50px]">
      <div className="pb-[20px] border-[1px] border-t-0 border-l-0 border-r-0 border-b-[#22212175]">
        <h1 className="text-[17px] font-[600]">John Mekkah</h1>
      </div>

      <div className="w-[100%] flex justify-end mt-[20px]">
        <div className="w-[300px] py-[5px] px-[20px] bg-[#F9FFEB] shadow-md">
            <h4 className="font-semibold text-[14px]">What’s the application update?</h4>
            <div className="flex items-center mt-[30px]">
                <MdAccessTime size={18} color="" className="text-[#6e6e6e]"/>
                <p className="ml-[3px] text-[12px] font-[500]">16:00</p>
            </div>
        </div>
      </div>
      <div className="flex justify-start mt-[30px]">
        <div className="w-[300px] shadow-md py-[5px] px-[20px] bg-[#F9FFEB]">
            <h4 className="font-semibold text-[14px]">Your Scholarship Application will soon be completed. Have you gathered the necessary documents? </h4>
            <div className="flex items-center mt-[30px]">
                <MdAccessTime size={18} color="" className="text-[#6e6e6e]"/>
                <p className="ml-[3px] text-[12px] font-[500]">17:03</p>
            </div>
        </div>
      </div>

      <div className="w-[100%] flex justify-between mt-[80px] items-center">
        <IoImagesOutline size={24} className="mr-[15px]"/>
        <Input
            className="flex-1"
            placeholder="Say Something..." 
        />
        <VscSend size={24} className="ml-[15px]"/>
      </div>
    </div>
  )
}

export default MessageChat
