import { FiMenu } from "react-icons/fi";
import logo from "../../assets/logo/afro-new-logo.png"
import "react-toastify/dist/ReactToastify.css";
import img1 from "../../assets/Icons/mdi_checkboxes-blank.svg";
import img2 from "../../assets/Icons/fa6-brands_google-scholar.svg";
import img3 from "../../assets/Icons/jam_messages.svg";
// import img4 from "../../assets/Icons/grommet-icons_user-expert.svg";
import img5 from "../../assets/Icons/mdi_application-edit-outline.svg";
import img6 from "../../assets/Icons/uil_transaction.svg";
// import img7 from "../../assets/Icons/fluent_person-support-24-regular.svg";
import img8 from "../../assets/Icons/Vector.svg";
import img9 from "../../assets/Icons/material-symbols_logout-rounded.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { logoutUser } from "../../service/reducers";

const HeaderDashStudent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [dropdown, setDropdown] = React.useState(false)

  const handleLogout = () => {
    dispatch(logoutUser());
    
    toast.success("You have logged out successfully", {
      autoClose: 3000,
      closeButton: true,
      onClose: () => {
        navigate("/"); // Redirect after toast
      },
    });
  };

  const menuItems = [
    { name: "Home", icon: img1, path: "/dashhome" },
    { name: "Scholarships", icon: img2, path: "/dashhome/scholarship" },
    // { name: "Message(s)", icon: img3, path: "/dashhome/messages", comingSoon: false },
    { name: "Message(s)", icon: img3, path: "/dashhome", comingSoon: true },
    // { name: "Expert", icon: img4, path: "/dashhome/expert" },
    { name: "Application(s)", icon: img5, path: "/dashhome/application" },
    { name: "Transactions", icon: img6, path: "/dashhome/transaction" },
    // { name: "Support", icon: img7, path: "/support" },
    { name: "Profile", icon: img8, path: "/dashhome/profile" },
    {
      name: "Logout",
      icon: img9,
      onClick: handleLogout,
    },
  ];

  // const bottonItems = [
  //   { name: "Profile", icon: img8, path: "/dashhome/profile" },
  //   {
  //     name: "Logout",
  //     icon: img9,
  //     onClick: handleLogout,
  //   },
  // ];

  const showDropdown = () => {
    setDropdown(!dropdown)
  }

  // const [activeItem, setActiveItem] = React.useState("home");

  // const handleSetActive = (item: any) => {
  //   setActiveItem(item);
  // };

  return (
    <div className="w-full  h-[70px] flex items-center justify-center bg-white fixed z-40">
        <div className="w-[90%] text-[25px] flex justify-between items-center">
                {/* <h1 className="">LOGO</h1> */}

            <div className="w-[100px] hidde items-center justify-cente md:flex sm:flex">
                <img src={logo} alt="" className="h-[70px]" />
            </div> 
                
            <FiMenu size={25} className="hidden sm:flex md:flex" onClick={showDropdown}/>

        </div>


            {/* <div className={` ${dropdown ? 'transform translate-y-0' : 'transform -translate-x-full'} lg:hidden w-[100%] h-[100vh] absolute bg-whit backdrop-blur-md bg-[#fff] bg-opacity-6 top-0 transition-all ease-in-out z-30 duration-300`} onClick={showDropdown}> */}
            <div
              className={`${
                dropdown ? "translate-x-0 opacity-100" : "opacity-0 pointer-events-none"
              } fixed inset-0 w-full h-screen bg-white bg-opacity-10 backdrop-blur-md transition-all duration-300 ease-in-out z-50 pl-[15px]`}
              onClick={showDropdown}
            >

                <div className="lg:hidden text-[25px] cursor-pointer  ml-[6px] shadow-md text-[#000]  z-50 p-1 rounded-md bg-white absolute right-[25px] top-[25px]" onClick={showDropdown}>
                    <MdClose/> 
                </div>

                <div className="w-[100%] bg-[#F3F4FD rounded-[12px] mt-[60px] py-[30px] px-[15px]">
                  {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                      <div key={item.name} className="w-[100%] mb-[15px]">
                        <div
                          className="flex items-center cursor-pointer"
                          onClick={() => {
                            if (item.path) {
                              navigate(item.path);
                            } else if (item.onClick) {
                              item.onClick();
                            }
                          }}
                        >
                          <img
                            src={item.icon}
                            alt={item.name}
                            className="w-[17px] h-[17px]"
                            style={{
                              filter: isActive ? "none" : "grayscale(100%)",
                            }}
                          />
                          <h3
                            className="ml-[13px] font-semibold text-[13px]"
                            style={{
                              color: isActive ? "#8c301e" : "#222121AD",
                            }}
                          >
                            {item.name}
                          </h3>
                        </div>
                        {item.comingSoon && (
                          <p className="ml-[30px] text-[12px] text-gray-500 italic">
                            Coming soon in some days
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>

            </div>
            
    </div>
  )
}

export default HeaderDashStudent