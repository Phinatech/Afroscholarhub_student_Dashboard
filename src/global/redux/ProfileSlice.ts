import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileState {
  profile: any;
  isLoading: boolean;
  expertId: string | null;
}

const initialState: ProfileState = {
  profile: null,
  isLoading: false,
  expertId: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile(state, action: PayloadAction<any>) {
      state.profile = action.payload;
    },
    setProfileLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setScholarId: (state, action: PayloadAction<string>) => {
        // const accessToken = localStorage.getItem("accessToken");
        // const refreshToken = localStorage.getItem("refreshToken");
  
        // // Only set expertId if tokens exist
        // if (accessToken && refreshToken) {
          state.expertId = action.payload;
        // } else {
        //   state.expertId = null;
        // }
    },
    clearProfile(state) {
      state.profile = null;
      state.expertId = null
    },
  },
});

export const { setProfile, clearProfile, setProfileLoading, setScholarId } = profileSlice.actions;

export default profileSlice.reducer;
