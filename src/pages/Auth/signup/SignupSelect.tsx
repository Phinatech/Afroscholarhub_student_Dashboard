import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import "../../../components/block/ButtonAnime.css"

const SignupSelect = () => {

    // Define an array of background image URLs
    const backgroundImageUrls = [
      'url("/authImages/signupSelect1.png")',
      'url("/authImages/signupSelect2.png")',
    ];
  
    // State to manage the index of the current background image
    const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);
  
    // Function to handle changing the background image
    const changeBackground = () => {
      setCurrentBackgroundIndex(prevIndex => (prevIndex + 1) % backgroundImageUrls.length);
    };
  
    useEffect(() => {
      // Automatically change background every 2 seconds
      const intervalId = setInterval(changeBackground, 3000);
  
      // Clean up the interval to avoid memory leaks
      return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Empty dependency array to run the effect only once on component mount

  return (
    <div className="w-full min-h-[100vh] flex bg-[#F3F4FD] ">
        <div className="w-full hidden lg:flex flex-col justify-between items-cente bg-center bg-cover lg:w-[45%] p-[20px]"

            style={{
                backgroundImage: backgroundImageUrls[currentBackgroundIndex],
                transition: 'background-image 3s ease',
            }}
        >
            <p></p>

            <p className='text-[40px] text-white font-bold leading-[45px] mb-[20px] ml-[50px]'>
              <b className='text-[#F4FC03] text-[40px]'>Sign Up</b> <br/>to Unlock a <br />World of Opportunities
            </p>
        </div>

        <div className='w-full lg:w-[55%] flex items-center justify-center bg-transparent  relative'>
            <div className='w-full h-full bg-center bg-cover lg:hidden'
                style={{
                    backgroundImage: backgroundImageUrls[currentBackgroundIndex],
                    transition: 'background-image 3s ease',
                }}
               ></div>

            <div className='w-[280px] h-[280px] md:w-[400px] md:h-[400px] bg-white shadow-lg rounded-bl-[20px] rounded-tr-[20px] flex flex-col items-center justify-center gap-5 p-3 absolute bg-opacity-70 md:bg-opacity-90'>
              <p>LOGO</p>

              <p className='text-[#000] text-[18px] md:text-[25px] font-bold'>Signup</p>

              <div className='flex flex-col items-center w-[80%] gap-[15px] md:gap-[25px]'>
                <NavLink to="/signup/student" className="w-full">
                  <button className='w-full  css-button-sliding-to-left--sky'>Signup as Student</button>
                </NavLink>

                <NavLink to="/signup/expert" className="w-full">
                  <button className='w-full  css-button-sliding-to-left--sky'>Signup as Expert</button>
                </NavLink>

                <p className='text-[#9d9d9d] text-[13px] md:text-[16px]'>Already have an account? <NavLink to="/signin"><span className='cursor-pointer text-[#000] font-bold'>Signin</span></NavLink></p>
              </div>
            </div>
        </div>
    </div>
  )
}

export default SignupSelect