// import React from 'react'

import { GoVerified } from "react-icons/go";
import "../../../components/block/ButtonAnime.css"

const MailVerifyStudent = () => {
  return (
    <div className='bg-[#F3F4FD] w-ful min-h-[100vh] flex items-center justify-center'>
        <div className="w-[90%] md:w-[60%] lg:w-[30%] h-[350px] flex flex-col items-center justify-center gap-5 bg-white rounded-bl-[15px] rounded-tr-[15px] shadow-md p-5">
            <span className="text-[80px]">
                <GoVerified />
            </span>

            <p className="text-center font-bold text-[15px] md:text-[17px]">
                Welcome to AfroScholarHub
            </p>

            <button className='w-full  css-button-sliding-to-left--sky'>
                Continue To Dashboard
            </button>

        </div>
    </div>
  )
}

export default MailVerifyStudent