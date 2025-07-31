import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashhome/transaction");
    }, 10000); 
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <motion.div 
      className="w-[100%] mt-[50px] min-h-[70vh]  flex flex-col items-center justify-center  bg-white text-[#000] rounded-tr-[20px] rounded-bl-[20px]"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="w-full flex flex-col justify-center items-center gap-3"><Helmet>
        <title className="text-center">Payment Successful</title>
      </Helmet></div>
      <CheckCircle size={80} className="text-[#000] mb-4" />
      <h1 className="text-2xl font-semibold ">Payment Verification Successful!</h1>
      <p className="text-lg mt-2">Redirecting to home...</p>
    </motion.div>
  );
};

export default PaymentSuccess;