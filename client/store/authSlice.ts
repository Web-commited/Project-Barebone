import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  userId: string | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  token: null,
  userId: null,
  isLoggedIn: false,
};


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action: PayloadAction<{ token: string; userId: string }>) {
            state.token = action.payload.token;
            state.userId = action.payload.userId;
            state.isLoggedIn = true;
        },
        logout(state) {
            state.token = null;
            state.userId = null;
            state.isLoggedIn = false;
        },
        updateUser(state, action: PayloadAction<{ username:string }>) {
            if (!state.userId) return;
            state.userId = action.payload.username;
        }
    },
});



export const { login, logout, updateUser} = authSlice.actions;
export default authSlice.reducer;