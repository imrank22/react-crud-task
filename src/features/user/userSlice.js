import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    userToEdit: null
}

export const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        setUsers(state=initialState, action){
            state.users = action.payload
        },
        setUserToEdit(state=initialState, action){
            state.userToEdit = action.payload
        },
    }
})

export const {setUsers, setUserToEdit} = userSlice.actions;

export const userState = (state) => state.empState;

const userStateReducer = userSlice.reducer;

export default userStateReducer;