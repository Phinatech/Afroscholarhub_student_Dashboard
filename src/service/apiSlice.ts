import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import Cookies from "js-cookie"
import { AllScholarships } from "../types/Interface"
import { jwtDecode } from "jwt-decode";

// import type { ScholarProfile } from "./scholar"

// const cookies = new Cookies()

interface ScholarProfile {
  data: any
  first_name: string
  last_name: string
  dob: string
  nationality: string
  gender: string
  academic_transcript: File | null
  academics_achievements: string
  career_goals: string
  current_education_level: string
  extra_curricular_activities: string
  field_of_study: string
  graduation_year: string
  institution_name: string
  preferred_languages: string[]
  preferred_scholarship_location: string
  preferred_study_field: string
  social_media_profiles: string[]
  special_circumstances: string
  specific_scholarship_requirement: string
  statement_of_purpose: string
  scholarship_type: string
  _id?: string
}

interface ScholarProfileResponse {
  success: boolean
  message: string
  data?: any
}

const API_BASE_URL = "https://afro-scholar-hub-server.onrender.com/api/v1";
// const REFRESH_INTERVAL = 10 * 60 * 1000; 

const logoutUser = () => {
  console.log("Logging out user...");
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  if (window.location.pathname !== "/") {
    window.location.href = "/";
  }
};

const isTokenExpired = (token: any) => {
  try {
    const decoded : any = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
};


const refreshAccessToken = async () => {
  const refreshToken = Cookies.get("refreshToken") || localStorage.getItem("refreshToken");

  if (!refreshToken) {
    console.log("No refresh token found, logging out...");
    logoutUser();
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/scholar/refreshToken`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    const data = await response.json();

    if (data.success && data.accessToken) {
      Cookies.set("accessToken", data.accessToken, { expires: data.expiresIn / (60 * 60 * 24) }); // Convert to days
      localStorage.setItem("accessToken", data.accessToken);

      console.log("Token refreshed successfully. Expires in:", data.expiresIn, "seconds");

      // Schedule next refresh based on expiresIn
      setTimeout(refreshAccessToken, (data.expiresIn - 30) * 1000); // Refresh 30 seconds before expiry
    } else {
      console.error("Failed to refresh token:", data.message);
      logoutUser();
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    logoutUser();
  }
};


const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: async (headers) => {
    let token = Cookies.get("accessToken") || localStorage.getItem("accessToken");

    if (token && isTokenExpired(token)) {
      console.log("Access token expired, refreshing...");
      await refreshAccessToken();
      token = localStorage.getItem("accessToken");
    }

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
  fetchFn: async (input, init) => {
    let response = await fetch(input, init);

    if (response.status === 401) {
      console.log("Access token expired, attempting to refresh...");
      await refreshAccessToken();
      const newAccessToken = localStorage.getItem("accessToken");

      if (newAccessToken) {
        console.log("Retrying request with new token...");
        response = await fetch(input, {
          ...init,
          headers: {
            ...init?.headers,
            authorization: `Bearer ${newAccessToken}`,
          },
        });
      } else {
        console.log("No new access token found, logging out...");
        logoutUser();
      }
    }

    return response;
  },
});

export const api = createApi({
  baseQuery,
  endpoints: (builder) => ({

    getScholarProfile: builder.query<ScholarProfile, string>({
      query: (id) => `/scholar/profile/${id}`,
    }),

    updateScholarProfile: builder.mutation<ScholarProfileResponse, { id: string; profile: ScholarProfile }>(
      {
        query: ({ id, profile }) => {
          const formData = new FormData();
    
          Object.entries(profile).forEach(([key, value]) => {
            if (key === "academic_transcript" && value instanceof File) {
              formData.append(key, value);
            } else if (Array.isArray(value)) {
              formData.append(key, JSON.stringify(value)); 
            } else if (value !== null && value !== undefined) {
              formData.append(key, value.toString());
            }
          });
    
          return {
            url: `scholar/profile/${id}`,
            method: "PATCH",
            body: formData,
          };
        },
      }
    ),    

    verifyScholar: builder.mutation<{ success: boolean; message: string }, { data: any }>({
      query: ({ data }) => ({
        url: `/scholar/verify`,
        method: "POST",
        body: data,
      }),
    }),

    // getApprovedScholarships: builder.query<AllScholarships[], { limit?: number; offset?: number }>({
    //   query: ({ limit = 3, offset = 2 }) => `/scholarship/approved?limit=${limit}&offset=${offset}`,
    // }),
    // getApprovedScholarships: builder.query<AllScholarships[], { limit?: number; offset?: number }>({
    //   query: ({ limit = 10, offset = 0 }) => `/scholarship/approved?limit=${limit}&offset=${offset}`,
    // }),
    
    getApprovedScholarships: builder.query<AllScholarships[], void>({
      query: () => "/scholarship/approved",
    }),

    startApplication: builder.mutation({
      query: (applicationData) => ({
        url: "/application/start",
        method: "POST",
        body: applicationData,
      }),
    }),

    getScholarsApplications: builder.query({
      query: (scholarId) => ({
        url: `application/scholar/${scholarId}`,
        method: "GET",
      })
    }),

    processPayment: builder.mutation<{ success: boolean; paymentLink?: string; message: string }, { email: string; amount: number; applicationId: string }>({
      query: (paymentData) => ({
        url: "/payment/pay",
        method: "POST",
        body: paymentData,
      }),
    }),
    
    getWallet: builder.query<{ balance: number }, string>({
      query: (userId) => `/payment/wallet/${userId}`,
    }),

    verifyPayment: builder.mutation<
      { success: boolean; message: string },
      { transactionId: string; applicationId: string }
    >({
      query: ({ transactionId, applicationId }) => ({
        url: `/payment/verify-payment/${transactionId}?applicationId=${applicationId}`,
        method: "GET",
      }),
    }),

    fundRelease: builder.mutation<{ status: string; message: string }, { applicationId: string }>({
      query: ({ applicationId }) => ({
        url: "payment/wallet/fund-release",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
        body: { applicationId },
      }),
    }),

  }),
});

export const { 
  useGetScholarProfileQuery, 
  useUpdateScholarProfileMutation, 
  useVerifyScholarMutation, 
  useGetApprovedScholarshipsQuery,
  useStartApplicationMutation, 
  useGetScholarsApplicationsQuery,
  useProcessPaymentMutation,
  useGetWalletQuery,
  useVerifyPaymentMutation,
  useFundReleaseMutation,
} = api

