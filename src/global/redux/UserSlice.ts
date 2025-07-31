import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { AllScholarships } from '../../types/Interface';

interface UserState {
  user: any;
  accessToken?: any;
  refreshToken?: any;
  approvedScholarships: any[],
}

const initialState: UserState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  approvedScholarships: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<any>) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
      state.approvedScholarships = [];
    },
    setApprovedScholarships(state, action: PayloadAction<any[]>) {
      console.log("Updating Redux store:", action.payload);
      state.approvedScholarships = action.payload;
    },
    // setAccessToken: (state, action) => {
    //   state.accessToken = action.payload;
    // },
  },
});

export const { setUser, clearUser, setApprovedScholarships } = userSlice.actions;

export default userSlice.reducer;


