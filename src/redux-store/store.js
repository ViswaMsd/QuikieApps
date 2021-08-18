import { configureStore, createSlice } from "@reduxjs/toolkit";

const coinSlice = createSlice({
  name: "coins",
  initialState: {
    coins: [],
    savedCoins: [],
  },
  reducers: {
    pushCoins(state, action) {
      state.coins = action.payload;
    },
    saveHandler(state, action) {
      for (let i = action.payload.range[0]; i < action.payload.range[1]; i++) {
        if (state.coins[i].symbol === action.payload.symbol) {
          state.coins[i].isSaved = true;
          state.savedCoins.push(state.coins[i]);
        }
      }
    },
    deletHandler(state, action) {
      state.savedCoins = state.savedCoins.filter((coin) => coin.symbol !== action.payload);
      const index = state.coins.findIndex((coin) => coin.symbol === action.payload);
      state.coins[index].isSaved = false;
    },
  },
});

const store = configureStore({ reducer: coinSlice.reducer });
export default store;
export const coinActions = coinSlice.actions;
