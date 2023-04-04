import { createSlice } from "@reduxjs/toolkit"

const initialState = {data:[], password:""};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userData(state, action){
            state.data = action.payload
        },
        userPassword(state, action){
            state.password = action.payload
        }
    }
})


export default userSlice.reducer;

export const { userData, userPassword } = userSlice.actions;