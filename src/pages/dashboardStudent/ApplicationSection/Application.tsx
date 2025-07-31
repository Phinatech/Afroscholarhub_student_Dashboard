import { toast } from "react-toastify";
import { Button } from "../../../components/ui/button";
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "../../../components/ui/table";
import { 
        useFundReleaseMutation,
        useGetScholarProfileQuery, 
        useGetScholarsApplicationsQuery, 
        useProcessPaymentMutation 
        } from "../../../service/apiSlice";
import { useEffect, useState } from "react";
import { ScholarProfile } from "../../../types/Interface";
import Cookies from "js-cookie"
import { 
            useLocation, 
            // useNavigate 
        } from "react-router-dom";

const Application = () => {

    const location = useLocation();
    // const navigate = useNavigate()

    const newApplication = location.state?.newApplication;

    const scholarId = localStorage.getItem("scholarId");
    //  console.log("user-id", scholarId)

    const { data: profile} = useGetScholarProfileQuery(scholarId ?? "", { skip: !scholarId });

    const { data: applications = { data: [] }, isLoading, error, refetch } = useGetScholarsApplicationsQuery(scholarId);

    const [processExpertPayment] = useFundReleaseMutation();

    // console.log("user", profile?.data)

    // const userEmail = (profile?.data as any).email
    const profile1 = profile?.data as ScholarProfile;
    const userEmail = profile1?.email;

    // console.log("user", userEmail)
    
    // Initialize the payment mutation
    const [processPayment] = useProcessPaymentMutation();

    const [loadingPayments, setLoadingPayments] = useState<{ [key: string]: boolean }>({});

    const [paymentCompleted, setPaymentCompleted] = useState<{ [key: string]: boolean }>({});

    const [currentPage, setCurrentPage] = useState(1);
    const applicationsPerPage = 10;

    // console.log("my-appli", applications?.data ?? [])
    
    // console.log("fee", applications?.data)

     // Append the new application data if it exists
     useEffect(() => {
        refetch()

        if (newApplication) {
            console.log("New Application received:", newApplication);
        }
    }, [newApplication]);

    if (isLoading) return <p>Loading applications...</p>;
    if (error) return <p>Error fetching applications.</p>;

    // Merge new application with existing ones
    const allApplications = newApplication 
        ? [newApplication, ...applications.data] 
        : applications.data;

     // Sort applications by date (latest first)
     const sortedApplications = [...allApplications].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
     // Pagination logic
     const indexOfLastApplication = currentPage * applicationsPerPage;
     const indexOfFirstApplication = indexOfLastApplication - applicationsPerPage;
     const currentApplications = sortedApplications.slice(indexOfFirstApplication, indexOfLastApplication);
     const totalPages = Math.ceil(sortedApplications.length / applicationsPerPage);
 
     const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const getStatusColor = (status: string) => {
        switch (status) {
          case "pending":
            return "#DFE702"; // Yellow
          case "completed":
            return "#000"; // Black
          case "in_progress":
            return "green"; // Green
          case "canceled":
            return "red"; // Red
          default:
            return "#9a9999"; // Default gray
        }
    };

    // payment to Flutterwave
    const handlePayment = async (app: any) => {
        if (!scholarId) {
            console.error("Scholar ID not found.");
            return;
        }

        if (!userEmail) {
            console.error("User email is required for payment processing.");
            // toast.error("Your email is missing. Please update your profile.");
            return;
        }   
        
        const applicationId = app?._id || "";

        localStorage.setItem("applicationId", applicationId); 
        Cookies.set("applicationId", applicationId, { expires: 1, secure: true, sameSite: "None" }); 
        localStorage.setItem("applicationId", applicationId);

        console.log("app-id", applicationId)  
        
        const accessToken = localStorage.getItem("accessToken") ?? "";

        // Cookies.set("accessToken", localStorage.getItem("accessToken") || "", { expires: 1, secure: true, sameSite: "None" });
        Cookies.set("accessToken", accessToken, { expires: 1, secure: true, sameSite: "None" }); 
        localStorage.setItem("accessToken", accessToken);
        console.log("new-set-acc-token", accessToken)

        const paymentData = {
            email: userEmail,
            amount: app?.scholarship?.application_fee || 0,
            applicationId: app?._id || "",
        };


        console.log("Payment Data:", paymentData);

        setLoadingPayments((prev : any) => ({ ...prev, [app._id]: true }));

        try {
            const response = await processPayment(paymentData).unwrap();

            console.log("response", response)

            if (response.success && response.paymentLink) {
                toast.success("Redirecting to payment...");
                window.location.href = response.paymentLink; 
            } else {
                toast.error("Payment initiation failed. Please try again.");
            }
            
        } catch (error: any) {
            console.error("Payment failed:", error);
            toast.error(error?.data?.message || "Payment failed. Please try again.");
            console.log("error", error?.data?.message )
        } finally {
            // Remove loading state for the specific application
            setLoadingPayments((prev) => ({ ...prev, [app._id]: false }));
        }
    };


    // payment to Expert
    const handleExpertPayment = async (app: any) => {
        if (!scholarId) {
            console.error("Scholar ID not found.");
            return;
        }
    
        const applicationId = app?._id || "";
    
        console.log("Processing payment for expert, Application ID:", applicationId);
    
        setLoadingPayments((prev) => ({ ...prev, [applicationId]: true }));
    
        try {
            const response = await processExpertPayment({ applicationId }).unwrap();
    
            console.log("Expert payment response:", response);
    
            if (response.status === "completed") {
                toast.success("Expert payment successful!");

                setPaymentCompleted((prev) => ({ ...prev, [applicationId]: true }));

            } else {
                toast.error("Expert payment failed. Please try again.");
            }
        } catch (error: any) {
            console.error("Expert payment failed:", error);
            toast.error(error?.data?.message || "Payment failed. Please try again.");
        } finally {
            setLoadingPayments((prev) => ({ ...prev, [applicationId]: false }));
        }
    };

    

    return (
        <div className="pt-[15px] flex flex-col w-[100%] h-[100%]">
            <div className="flex items-center">
                <div className="w-[5px] h-[5px] bg-[#000] rounded-full"></div>
                <h3 className="text-[16px] font-semibold ml-[10px]">Application(s)</h3>
            </div>

            <div className="w-[100%] p-[15px] bg-[#fff] rounded-tr-[12px] rounded-bl-[12px] mt-[20px]">
                <Table>
                    <TableHeader>
                        <TableRow className="w-full sm:flex sm:flex-col text-[#9a9999]">
                            <TableHead>Scholarship Title</TableHead>
                            <TableHead>Expert</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Fee</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="">
                        {currentApplications?.map((app: any) => (
                            <TableRow key={app._id} className="w-full sm:flex sm:flex-col flex-wrap bg-[#fbf7f7] md:bg-transparent my-2">
                                <TableCell>
                                    <div className="flex flex-col md:w-[170px] lg:w-[250px]">
                                        <div className="text-[14px] font-[600]">
                                            {app?.scholarship?.title ? app.scholarship.title.charAt(0).toUpperCase() + app.scholarship.title.slice(1) : "NA"}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="font-[600]">
                                    {app?.expert?.first_name ? app.expert.first_name.charAt(0).toUpperCase() + app.expert.first_name.slice(1) : ""} {" "} {app?.expert?.last_name ? app.expert.last_name.charAt(0).toUpperCase() + app.expert.last_name.slice(1) : ""}
                                </TableCell>
                                <TableCell className="font-[600]" style={{ color: getStatusColor(app?.status) }}>
                                    {app?.status ? app.status.charAt(0).toUpperCase() + app.status.slice(1) : ""}
                                </TableCell>
                                <TableCell className="font-[600]">
                                    {app?.createdAt.slice(0, 10)}
                                </TableCell>
                                <TableCell className="font-[600]">
                                    ${app?.scholarship?.application_fee}
                                </TableCell>

                                <TableCell>
                                {app.status === "pending" && (
                                    <>
                                    <Button 
                                        className=" p-1 px-2 h-[35px] rounded-tr-[5px] text-[12px] md:text-[12px] lg:text-[15px] text-[#fff] rounded-bl-[5px] bg-[#8c301e]"
                                        onClick={() => handlePayment(app)}
                                        disabled={loadingPayments[app._id] || false}
                                    >
                                        {loadingPayments[app._id] ? "Processing..." : "Make Payment"}
                                    </Button>
                                    <Button 
                                        className="w-p-1 px-2 text-[12px] md:text-[12px] lg:text-[15px] h-[35px] rounded-tr-[5px] text-[#f63333] rounded-bl-[5px]"
                                    >
                                        Cancel
                                    </Button>
                                    </>
                                )}

                                {app.status === "in_progress" && (
                                    <Button 
                                    className="p-1 px-2 text-[12px] md:text-[12px] lg:text-[15px] h-[35px] rounded-tr-[5px] text-[#fff] rounded-bl-[5px] bg-[#8c301e]"
                                    >
                                        Chat Expert
                                    </Button>
                                )}

                                {/* {app.status === "completed" && (
                                    <Button 
                                    className="p-1 px-2 text-[12px] md:text-[12px] lg:text-[15px] h-[35px] rounded-tr-[5px] text-[#fff] rounded-bl-[5px] bg-[#8c301e]"
                                    onClick={() => handleExpertPayment(app)}
                                    disabled={loadingPayments[app._id] || false}
                                    >
                                        {loadingPayments[app._id] ? "Processing..." : "Pay Expert"}
                                    </Button>
                                )} */}

                                {paymentCompleted[app._id] ? (
                                        <p className="p-1 px-2 h-[35px] rounded-tr-[5px] text-[#000] rounded-bl-[5px] bg-[#8c301e">
                                            App. Complete
                                        </p>
                                    ) : app.status === "completed" ? (
                                        <Button 
                                            className="p-1 px-2 h-[35px] rounded-tr-[5px] text-[#fff] rounded-bl-[5px] bg-[#8c301e]"
                                            onClick={() => handleExpertPayment(app)}
                                            disabled={loadingPayments[app._id] || false}
                                        >
                                            {loadingPayments[app._id] ? "Processing..." : "Pay Expert"}
                                        </Button>
                                    ) : null}

                                {app.status === "canceled" && (
                                    <Button 
                                    className="p-1 px-2 text-[12px] md:text-[12px] lg:text-[15px] h-[35px] rounded-tr-[5px] text-[#fff] rounded-bl-[5px] bg-[#d00000]"
                                    >
                                        Refund Fee
                                    </Button>
                                )}
                                </TableCell>


                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <div className="pagination flex justify-center mt-4">
                    {[...Array(totalPages)].map((_, index) => (
                        <button 
                            key={index} 
                            onClick={() => paginate(index + 1)}
                            className={`px-3 py-1 mx-1 ${currentPage === index + 1 ? "bg-[#8c301e] text-white" : "bg-gray-300"}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Application;
