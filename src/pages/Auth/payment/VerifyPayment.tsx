// import { useEffect, useState } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import logo from "../../../assets/logo/afro-new-logo.png";
// import axios from "axios";
// import { url } from "../../../utils/Api";

// const VerifyPayment = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const [message, setMessage] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [showPopup, setShowPopup] = useState(true);
//   const [time, setTime] = useState(0);
//   const [timerComplete, setTimerComplete] = useState(false);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTime((prevTime) => {
//         if (prevTime >= 150) {
//           clearInterval(interval);
//           setTimerComplete(true);
//           return 150;
//         }
//         return prevTime + 1;
//       });
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const formatTime = (seconds: any) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, "0")}`;
//   };

//   const handleVerifyPayment = async () => {
//     if (!timerComplete) return;
//     setIsLoading(true);
//     let transactionId = searchParams.get("tx_ref")?.trim();
//     let applicationId = localStorage.getItem("applicationId")?.trim();
//     let accessToken = localStorage.getItem("accessToken");

//     if (!transactionId || !applicationId) {
//       setMessage("Invalid payment details. Please try again.");
//       setIsLoading(false);
//       return;
//     }

//     console.log("trans-id", transactionId)
//     console.log("app-id", applicationId)
//     console.log("access-id", accessToken)

//     try {
//       const response = await axios.get(
//         `${url}/payment/verify-payment/${encodeURIComponent(transactionId)}/${encodeURIComponent(applicationId)}`,
//         {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         }
//       );

//       console.log("API Response:", response.data);
//       setMessage(response.data.message);
      
//       if (response.data.message === "Wallet credited and application updated") {
//           navigate("/paymentsuccess");
//           console.log("pay-verify-resp-success", response.data);
//         } else {
//           // navigate("/paymentfailed");
//           console.log("pay-verify-resp-error-1", response.data);
//         }
      
//       setIsLoading(false)

//     } catch (error: any) {
//       console.error("Payment verification error:", error.response?.data || error.message);
      
//       if (error.response) {
//           setMessage(error.response.data.message || "Verification failed.");
//       } else if (error.request) {
//           setMessage("Network error. Please check your connection.");
//       } else {
//           setMessage("An unexpected error occurred.");
//       }
//       // navigate("/paymentfailed");
  
//       throw error; // Rethrow for retry logic
//   }
//   setIsLoading(false)
//   };

//   return (
//     <div className="w-full min-h-screen flex justify-center items-center bg-[#fff] relative">
//       {showPopup && (
//         <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded-md shadow-lg text-center w-[90%] md:w-[50%] z-30">
//             <p className="text-lg font-semibold mb-4">Please, wait for at least two (2) minutes before clicking the "Verify Payment" button.</p>
//             <p className="text-xl font-bold">{formatTime(time)}</p>
//             {!timerComplete ? (
//               <p className="text-gray-500">Counting down...</p>
//             ) : (
//               <p className="text-green-600">Now click "Verify Payment" button</p>
//             )}
//             <button onClick={() => setShowPopup(false)} className="mt-4 bg-[#8c301e] text-white px-4 py-2 rounded-md">
//               OK
//             </button>
//           </div>
//         </div>
//       )}

//       <div className="w-[90%] md:w-[60%] lg:w-[40%] flex flex-col justify-center items-center p-4 py-[30px] shadow-md rounded-[10px] gap-6">
//         <img src={logo || "/placeholder.svg"} alt="AfroScholarHub Logo" className="w-[100px]" />
//         {message && <p className="text-center text-red-500">{message}</p>}

//         <button
//           onClick={handleVerifyPayment}
//           className="w-full h-[40px] bg-[#8c301e] rounded-[10px] text-[#fff] disabled:opacity-50"
//           disabled={isLoading || !timerComplete}
//         >
//           {isLoading ? "Verifying..." : "Verify Payment"}
//         </button>

//         <button onClick={() => navigate("/dashhome")} className="w-full h-[40px] bg-gray-500 rounded-[10px] text-[#fff]">
//           Cancel Payment
//         </button>
//       </div>
//     </div>
//   );
// };

// export default VerifyPayment;



import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import logo from "../../../assets/logo/afro-new-logo.png";
import axios from "axios";
import { url } from "../../../utils/Api";

const VerifyPayment = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("Loading... Please, wait to verify your payment");
  const [isLoading, setIsLoading] = useState(false);
  const [time, setTime] = useState(150); // 2 mins 30 secs
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          setShowButtons(true);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: any) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleVerifyPayment = async () => {
    setIsLoading(true);
    let transactionId = searchParams.get("tx_ref")?.trim();
    let applicationId = localStorage.getItem("applicationId")?.trim();
    let accessToken = localStorage.getItem("accessToken");

    if (!transactionId || !applicationId) {
      setMessage("Invalid payment details. Please try again.");
      setIsLoading(false);
      return;
    }

    console.log("trans-id", transactionId)
    console.log("app-id", applicationId)
    console.log("access-id", accessToken)

    try {
      const response = await axios.get(
        `${url}/payment/verify-payment/${encodeURIComponent(transactionId)}/${encodeURIComponent(applicationId)}`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      setMessage(response.data.message);
      if (response.data.message === "Wallet credited and application updated") {
        navigate("/paymentsuccess");
      }
    } catch (error: any) {
      console.error("Payment verification error:", error.response?.data || error.message);
      setMessage(error.response?.data?.message || "Verification failed.");
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-white">
      <img src={logo || "/placeholder.svg"} alt="AfroScholarHub Logo" className="w-[100px] mb-4" />
      <p className="text-lg font-semibold text-center">{message}</p>
      {!showButtons && <p className="text-xl font-bold mt-2">{formatTime(time)}</p>}

      {showButtons && (
        <div className="w-full max-w-md flex flex-col gap-4 mt-4 p-2 px-4">
          <button
            onClick={handleVerifyPayment}
            className="w-full h-10 bg-[#8c301e] text-white rounded-lg disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify Payment"}
          </button>
          <button
            onClick={() => navigate("/dashhome")}
            className="w-full h-10 bg-gray-500 text-white rounded-lg"
          >
            Cancel Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default VerifyPayment;

