import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICandidate, ICandidateListState } from '../../lib/types/candidates';
import { axiosPublic } from '../../lib/api/axios';

const initialState: ICandidateListState = {
  FEList: [],
  BEList: [],
  pending: false,
};

export const getCandidateThunk = createAsyncThunk(
  'candidate/getCandidate',
  async (part: string, { rejectWithValue }) => {
    const res = await axiosPublic.get(`/candidates/?part=${part}`);
    console.log(res);
    if (!res) {
      rejectWithValue('error');
    }
    return res.data.detail;
  },
);

export const candidateSlice = createSlice({
  name: 'candidate',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCandidateThunk.pending, (state) => {
        state.pending = true;
      })
      .addCase(getCandidateThunk.fulfilled, (state, action) => {
        const part = action.meta.arg;
        if (part == 'FE') {
          state.FEList = action.payload as ICandidate[];
        }
        if (part == 'BE') {
          state.BEList = action.payload as ICandidate[];
        }
        state.pending = false;
      })
      .addCase(getCandidateThunk.rejected, (state, action) => {
        state.pending = false;
        console.error(action.error);
      });
  },
});

export default candidateSlice.reducer;
