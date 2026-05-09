import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        otherUsers: [],
        onlineUsers: [],
        activeUser: null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setOtherUsers: (state, action) => {
            state.otherUsers = action.payload;
        },
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        },
        setActiveUser: (state, action) => {
            state.activeUser = action.payload;
        }
    }
})

export const { setUser, setOtherUsers, setOnlineUsers, setActiveUser } = authSlice.actions;
export default authSlice.reducer;