import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCoin: 'ethusdt', 
  selectedInterval: '1m',
  candlestickData: [],
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    setSelectedCoin: (state, action) => {
      state.selectedCoin = action.payload;
    },
    setSelectedInterval: (state, action) => {
      state.selectedInterval = action.payload;
    },
    setCandlestickData: (state, action) => {
    state.candlestickData.push(action.payload); 

    },
  },
});

export const { setSelectedCoin, setSelectedInterval, setCandlestickData } = cryptoSlice.actions;
export default cryptoSlice.reducer;
