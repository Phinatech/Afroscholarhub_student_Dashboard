import { useState } from "react"
import MessageChat from "./MessageChat"
import { IoIosArrowBack } from "react-icons/io";

const MessageList = () => {
    const [show, setShow] = useState(true)
    const [show2, setShow2] = useState(false)

    const ToggleShow = () => {
        setShow(true)
        setShow2(false)
    }

    const ToggleShow2 = () => {
        setShow2(true)
        setShow(false)
    }
  return (
    <>
        {show? (
            <div className='pt-[15px] flex flex-col w-[100%] h-[100%]'>
            <div className="flex items-center">
                <div className="w-[5px] h-[5px] bg-[#000] rounded-full"></div>
                <h3 className="text-[16px] font-semibold ml-[10px]">Messages</h3>
            </div>
    
            <div className="w-[100%] p-[15px] bg-[#fff] rounded-tr-[12px] rounded-bl-[12px] mt-[20px]">
                <div onClick={ToggleShow2} className="cursor-pointer flex w-[100%] flex-col border-[1px] border-t-0 border-l-0 border-r-0 border-b-[#22212175] pb-[20px] mb-[30px]">
                    <h1 className="text-[16px] font-semibold">John Mekkah</h1>
                    <p className="text-[14px] text-[#3a3a3a] mt-[7px] font-[400]">Your Scholarship Application will soon be completed. Have you gathered the necessary documents? </p>
                </div>
                <div className="flex w-[100%] flex-col border-[1px] border-t-0 border-l-0 border-r-0 border-b-[#22212175] pb-[20px] mb-[30px]">
                    <h1 className="text-[16px] font-semibold">Hakimi Achraf</h1>
                    <p className="text-[14px] text-[#3a3a3a] mt-[7px] font-[400]">Your Scholarship Application will soon be completed. Have you gathered the necessary documents? </p>
                </div>
                <div className="flex w-[100%] flex-col border-[1px] border-t-0 border-l-0 border-r-0 border-b-[#22212175] pb-[20px] mb-[30px]">
                    <h1 className="text-[16px] font-semibold">Mensah Obi</h1>
                    <p className="text-[14px] text-[#3a3a3a] mt-[7px] font-[400]">Your Scholarship Application will soon be completed. Have you gathered the necessary documents? </p>
                </div>
            </div>
        </div>
        ) : null}

        {show2 ? (
            <div className="pt-[15px] flex flex-col w-[76%] h-[100%]">
                <div className="flex items-center">
                    <div className="w-[5px] h-[5px] bg-[#000] rounded-full"></div>
                    <h3 className="text-[16px] font-semibold ml-[10px]">Messages / Chat</h3>
                </div>

                <div className="w-[100%] p-[15px] bg-[#fff] overflow-y-scroll rounded-tr-[12px] rounded-bl-[12px] mt-[20px]">
                    <div onClick={ToggleShow} className="flex items-center cursor-pointer">
                        <IoIosArrowBack size={18}/>
                        <h4 className="text-[14px] font-[500] ml-[5px] text-[#3b3b3b]">Back To Messages</h4>
                    </div>

                    <MessageChat />
                </div>
            </div>
        ) : null}
    </>
  )
}

export default MessageList
