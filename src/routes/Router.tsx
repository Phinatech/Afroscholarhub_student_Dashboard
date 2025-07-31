import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import SignUpLayout from "../layout/authLayout/SignUpLayout";
import SigninLayout from "../layout/authLayout/SigninLayout";
import DashboardStudentLayout from "../layout/dashboardLayout/DashboardStudentLayout";
import Scholarship from "../pages/dashboardStudent/ScholarshipSection/Scholarship";
import MessageList from "../pages/dashboardStudent/MessageSection/MessageList";
import Expert from "../pages/dashboardStudent/ExpertSection/Expert";
import Application from "../pages/dashboardStudent/ApplicationSection/Application";
import Transaction from "../pages/dashboardStudent/TransactionSection/Transaction";
import Profile from "../pages/dashboardStudent/PrrofileSection/Profile";
import VerifyLayout from "../layout/authLayout/VerifyLayout";
import VerifyRedirect from "../pages/Auth/MailAuth/VerifyRedirect";
import VerifyRedirectLayout from "../layout/authLayout/VerifyRedirectLayout";
import ForgotPasswordLayout from "../layout/forgot-PasswordLayout/ForgotPasswordLayout";
import ResetPasswordLayout from "../layout/forgot-PasswordLayout/ResetPasswordLayout";
import PaymentSuccessLayout from "../layout/paymentLayout/PaymentSuccessLayout";
import PaymentFailureLayout from "../layout/paymentLayout/PaymentFailureLayout";
import VerifyPaymentLayout from "../layout/paymentLayout/VerifyPaymentLayout";

const SigninStudent = lazy(() => import("../pages/Auth/signin/SigninStudent"))
const SignupStudent = lazy(() => import("../pages/Auth/signup/SignupStudent"))
const MailSent = lazy(() => import("../pages/Auth/MailAuth/MailSent"))
const MailSentExpert = lazy(() => import("../pages/Auth/MailAuth/MailSentExpert"))
const MailVerifyStudent = lazy(() => import("../pages/Auth/MailAuth/MailVerifyStudent"))
const MailVerifyExpert = lazy(() => import("../pages/Auth/MailAuth/MailVerifyExpert"))
const TermsCondition = lazy(() => import("../pages/Auth/terms&Comdition/TermsCondition"))
const PaymentFailure = lazy(() => import("../pages/Auth/payment/PaymentFailure"))
const PaymentSuccess = lazy(() => import("../pages/Auth/payment/PaymentSuccess"))
const VerifyPayment = lazy(() => import("../pages/Auth/payment/VerifyPayment"))

// forgot password
const ForgotPassword = lazy(() => import("../pages/Auth/forgot-password/ForgotPassword"))
const ForgotPasswordMailSent = lazy(() => import("../pages/Auth/forgot-password/ForgotPasswordMailSent"))
const ResetPassword = lazy(() => import("../pages/Auth/forgot-password/ResetPassword"))

// Student dashboard pages
const HomeStudent = lazy(() => import("../pages/dashboardStudent/HomeStudent"))
const OneScholar = lazy(() => import("../pages/dashboardStudent/ScholarshipSection/OneScholar"))



export const element = createBrowserRouter([
    {
        path: "/",
        element: <SigninLayout />,
        children: [
            {
                index: true,
                element: <SigninStudent />
            },
        ]
    },
    {
        path: "/signup",
        element: <SignUpLayout />,
        children: [
            {
                index: true,
                element: <SignupStudent />
            },
            {
                path: "mailsent",
                element: <MailSent />
            },
            {
                path: "mailsentexpert",
                element: <MailSentExpert />
            },
            {
                path: "mailverifiedstudent",
                element: <MailVerifyStudent />
            },
            {
                path: "terms&conditions",
                element: <TermsCondition />
            }
        ]
    },
    {
        path: "/reset-password",
        element: <ForgotPasswordLayout />,
        children: [
            {
                index: true,
                element: <ForgotPassword />,
            },
            {
                path:"mailsent",
                element: <ForgotPasswordMailSent />
            },
        ]
    },
    {
        path: "/forgot-password.html",
        element: <ResetPasswordLayout />,
        children: [
            {
                index: true,
                element: <ResetPassword />,
            },
        ]
    },
    {
        path: "/verify",
        element: <VerifyLayout />,
        children: [
            {
                index: true,
                element: <MailVerifyExpert />
            }
        ]
    },
    {
        path: "/verify.html",
        element: <VerifyRedirectLayout />,
        children: [
            {
                index: true,
                element: <VerifyRedirect />
            }
        ]
    },
    {
        path: "/paymentsuccess",
        element: <PaymentSuccessLayout />,
        children: [
            {
                index: true,
                element: <PaymentSuccess />
            }
        ]
    },
    {
        path: "/paymentfailed",
        element: <PaymentFailureLayout />,
        children: [
            {
                index: true,
                element: <PaymentFailure />
            }
        ]
    },
    {
        path: "/verifypayment",
        element: <VerifyPaymentLayout />,
        children: [
            {
                index: true,
                element: <VerifyPayment />
            }
        ]
    },
    {
        path: "dashhome",
        element: <DashboardStudentLayout />,
        children: [
            {
                index: true,
                element: <HomeStudent />
            },
            {
                path: "/dashhome/scholarship",
                element: <Scholarship />
            },
            {
                path: "/dashhome/scholarship/details/:scholarshipId",
                element: <OneScholar />
            },
            {
                path: "/dashhome/messages",
                element: <MessageList />
            },
            {
                path: "/dashhome/expert",
                element: <Expert />
            },
            {
                path: "/dashhome/application",
                element: <Application />
            },
            {
                path: "/dashhome/transaction",
                element: <Transaction />
            },
            {
                path: "/dashhome/profile",
                element: <Profile />
            }
        ]
    }
])