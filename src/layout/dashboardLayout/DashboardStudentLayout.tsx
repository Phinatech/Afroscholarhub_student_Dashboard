// import React from 'react'

import { Outlet } from "react-router-dom"
import { HeaderDashStudent, SidebarStudent } from "../../components"
import ScrollToTop from "../../components/block/ScrollTotop"

const DashboardStudentLayout = () => {
  return (<>
    <ScrollToTop />
    <div className="w-full min-h-screen flex flex-col bg-[#F3F4FD] relative overflow-hidden font-mont">
          
          <div className='w-full z-40 flex justify-end shadow-md'>
            <HeaderDashStudent />
          </div>
      
  
      <div className='w-[100%] min-h-screen flex  items-center lg:justify-between justify-center'>
          
          <div className=' md:hidden sm:hidden fixed top-0 left-0 h-screen bg-[#fff] pb-[20px]  lg:w-[20%] shadow-md flex justify-center items-center'>
              <SidebarStudent />
          </div>

          <div className='w-[93%] lg:w-[calc(100%-17%) flex justify-end  sm:justify-center lg:ml-[21%] lg:mr-[1%] min-h-screen mt-[75px] pb-[20px]'>
              {/* {children} */}
              <Outlet />
          </div>
      </div>
    </div>
    </>
  )
}

export default DashboardStudentLayout