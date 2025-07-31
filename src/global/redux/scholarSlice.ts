import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ScholarProfile } from "../../types/Interface";

interface ScholarState {
  scholarProfile: ScholarProfile | null;
  scholarships: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ScholarState = {
  scholarProfile: null,
  scholarships: [],
  loading: false,
  error: null,
};

const scholarSlice = createSlice({
  name: "scholar",
  initialState,
  reducers: {
    setScholarProfile: (state, action: PayloadAction<ScholarProfile>) => {
      state.scholarProfile = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateScholarProfile: (state, action: PayloadAction<Partial<ScholarProfile>>) => {
        if (state.scholarProfile) {
          state.scholarProfile = { ...state.scholarProfile, ...action.payload };
        }
    },
    setScholarships: (state, action: PayloadAction<any[]>) => {
      state.scholarships = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setScholarProfile, updateScholarProfile, setScholarships, setLoading, setError } = scholarSlice.actions;
export default scholarSlice.reducer;
