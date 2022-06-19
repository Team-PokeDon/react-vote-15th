import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICandidate, ICandidateListState } from '../../lib/types/candidates';
import { getCandidates } from '../../lib/api';

const initialState: ICandidateListState = {
  FEList: [],
  BEList: [],
  pending: false,
};

export const getCandidateThunk = createAsyncThunk(
  'candidate/getCandidate',
  async (part: string, { rejectWithValue }) => {
    try {
      const data = await getCandidates(part);
      return data.detail;
    } catch (e) {
      console.log(e);
      rejectWithValue(e);
    }
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
      });
  },
});

export default candidateSlice.reducer;
