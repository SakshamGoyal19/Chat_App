import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userStore";

const store = configureStore({reducer: {
    user: userSlice
  }
})

export default store;