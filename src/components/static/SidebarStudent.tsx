import { useLocation, useNavigate } from "react-router-dom";
import { logoutUser } from "../../service/reducers";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
// import logo from "../../assets/logo/AfroSchHubLogo.png";
import img1 from "../../assets/Icons/mdi_checkboxes-blank.svg";
import img2 from "../../assets/Icons/fa6-brands_google-scholar.svg";
import img3 from "../../assets/Icons/jam_messages.svg";
// import img4 from "../../assets/Icons/grommet-icons_user-expert.svg";
import img5 from "../../assets/Icons/mdi_application-edit-outline.svg";
import img6 from "../../assets/Icons/uil_transaction.svg";
// import img7 from "../../assets/Icons/fluent_person-support-24-regular.svg";
import img8 from "../../assets/Icons/Vector.svg";
import img9 from "../../assets/Icons/material-symbols_logout-rounded.svg";

const SidebarStudent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    toast.success("You have logged out successfully", {
      autoClose: 3000,
      closeButton: true,
      onClose: () => {
        navigate("/"); // Redirect after toast
      },
    });
    dispatch(logoutUser());
  };

  const menuItems = [
    { name: "Home", icon: img1, path: "/dashhome" },
    { name: "Scholarships", icon: img2, path: "/dashhome/scholarship" },
    // { name: "Message(s) ", icon: img3, path: "/dashhome/messages", comingSoon: false },
    { name: "Message(s) ", icon: img3, path: "/dashhome", comingSoon: true },
    // { name: "Expert", icon: img4, path: "/dashhome/expert" },
    { name: "Application(s)", icon: img5, path: "/dashhome/application" },
    { name: "Transactions", icon: img6, path: "/dashhome/transaction" },
    // { name: "Support", icon: img7, path: "/support" },
  ];

  const bottonItems = [
    { name: "Profile", icon: img8, path: "/dashhome/profile" },
    {
      name: "Logout",
      icon: img9,
      onClick: handleLogout,
    },
  ];

  return (
    <div className="fixed lg:w-[19% flex flex-col fixed top-  h-screen  items-center justify-between p-[16px] py-[60px] lg:pb-[40px">
      {/* <div className="w-[60px]">
        <img src={logo} alt="Logo" className="w-full" />
      </div> */}

      {/* Menu Items */}
      <div className="w-[95%] bg-[#F3F4FD] rounded-[10px] mt-[70px] py-[30px] px-[30px] pr-[60px]">
      {menuItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <div key={item.name} className="w-[100%] mb-[15px]">
            <div
              className="flex items-center cursor-pointer"
              onClick={() => navigate(item.path)}
            >
              <img
                src={item.icon}
                alt={item.name}
                className="w-[17px] h-[17px]"
                style={{
                  filter: isActive ? "#8c301e" : "grayscale(100%)",
                }}
              />
              <h3
                className="ml-[13px] font-semibold text-[16px]"
                style={{
                  color: isActive ? "#8c301e" : "#222121AD",
                }}
              >
                {item.name}
              </h3>
            </div>
            {item.comingSoon && (
              <p className="ml-[30px] text-[10px] text-gray-500 italic">Coming soon in some days</p>
            )}
          </div>
        );
      })}
      </div>

      {/* Bottom Items */}
      <div className="w-[95%] bg-[#F3F4FD] rounded-[10px] mt-[30px] py-[30px] px-[20px]">
        {bottonItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <div
              key={item.name}
              className="flex items-center cursor-pointer w-[100%] mb-[10px]"
              onClick={item.onClick || (() => navigate(item.path))}
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
                className="ml-[13px] font-semibold text-[16px]"
                style={{
                  color: isActive ? "#8c301e" : "#222121AD",
                }}
              >
                {item.name}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarStudent;
