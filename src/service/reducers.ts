import {createSlice} from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"
import Cookies from "js-cookie";

interface UserDetails {
    email?: string;
    password?: string;
    accessToken?: string;
    refreshToken?: string;
}

const initialState = {
	value: 0,
	currentUser: {} as UserDetails | any,
    approvedScholarships: []
};

export const Reducers = createSlice({
    name: "afrohub",
    initialState,
    reducers: {
        updateUserDetails: (state, action: PayloadAction<UserDetails>) => {
            state.currentUser = action.payload
        },

        // logoutUser: () => initialState

        logoutUser: () => {
            Cookies.remove("applicationId");
            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");
      
            localStorage.removeItem("applicationId");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("scholarId");
      
            return initialState;
          },
    }
})

export const {updateUserDetails, logoutUser} = Reducers.actions;

export default Reducers.reducer