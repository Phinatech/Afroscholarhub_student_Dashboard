
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { XCircle } from "lucide-react";


const PaymentFailure = () => {
    const navigate = useNavigate();
  
    useEffect(() => {
      const timer = setTimeout(() => {
        navigate("/dashhome");
      }, 10000); 
      return () => clearTimeout(timer);
    }, [navigate]);
  
    return (
      <motion.div 
        className="w-[100%] mt-[50px] min-h-[70vh] flex flex-col items-center justify-center bg-white text-[#000] rounded-tr-[20px] rounded-bl-[20px]"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="w-full flex flex-col justify-center items-center gap-3"><Helmet>
          <title>Payment Failed</title>
        </Helmet></div>
        <XCircle size={80} className="text-red-600 mb-4" />
        <h1 className="text-2xl font-semibold text-red-600">Payment Verification Failed</h1>
        <p className="text-lg mt-2">Redirecting to home...</p>
      </motion.div>
    );
  };
  
  export default PaymentFailure;