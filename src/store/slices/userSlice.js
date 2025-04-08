import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    isAuthenticated: false,
    user: {},
    leaderboard: [],
    error: null,
  },
  reducers: {
    registerRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
    },
    registerSuccess(state, action) {
      state.loading = false; // Fixed: should be false after successful registration
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    registerFailed(state) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
    }, loginRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
    },
    loginSuccess(state, action) {
      state.loading = false; // Fixed: should be false after successful registration
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    loginFailed(state) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
    },
    FetchUserRequest(state) {
      state.loading = true;
      state.isAuthenticated = false;
      state.user = {};
    },
    FetchUserSuccess(state, action) {
      state.loading = false; // Fixed: should be false after successful registration
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    FetchUserFailed(state) {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {};
    },
    logoutSuccess(state) {
      state.isAuthenticated = false;
      state.user = {};
      state.error = null;
    },
    logoutFailed(state) {
      state.loading = false;
    },

    fetchLeaderboardRequest(state,action){
      state.loading=true;
      state.leaderboard=[];
    },
    fetchLeaderboardSuccess(state,action){
      state.loading=false;
      state.leaderboard=action.payload;
    },
    fetchLeaderboardFailed(state,action){
      state.loading=false;
      state.leaderboard=[];
    },

    clearAllErrors(state) {
      state.error = null;
      state.loading = false;
    },
  },
});

export const register = (data) => async (dispatch) => {
  dispatch(userSlice.actions.registerRequest()); // Fixed: added missing parentheses

  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/user/register",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    dispatch(userSlice.actions.registerSuccess(response.data));
    toast.success(response.data.message);
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.registerFailed());
    toast.error(error.response?.data?.message || "Registration failed");
    dispatch(userSlice.actions.clearAllErrors());
  }
};
export const login = (data) => async (dispatch) => {
  dispatch(userSlice.actions.loginRequest()); // Fixed: added missing parentheses

  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/user/login",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );

    dispatch(userSlice.actions.loginSuccess(response.data));
    toast.success(response.data.message);
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.loginFailed());
    toast.error(error.response?.data?.message || "Registration failed");
    dispatch(userSlice.actions.clearAllErrors());
  }
};

export const logout = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/v1/user/logout",
      { withCredentials: true }
    );

    dispatch(userSlice.actions.logoutSuccess());
    toast.success(response.data.message);
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.logoutFailed());
    toast.error(error.response?.data?.message || "Logout failed");
    dispatch(userSlice.actions.clearAllErrors()); // Fixed: added missing parentheses
  }
};
export const FetchUser = () => async (dispatch) => {
  dispatch(userSlice.actions.FetchUserRequest());
  try {
    const response = await axios.get(
      "http://localhost:3000/api/v1/user/me",
      { withCredentials: true }
    );

    dispatch(userSlice.actions.FetchUserSuccess(response.data.user));
    
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.FetchUserFailed());

    dispatch(userSlice.actions.clearAllErrors()); // Fixed: added missing parentheses
    console.error(error);
  }
};

export const fetchLeaderboard = () => async (dispatch) => {
  dispatch(userSlice.actions.fetchLeaderboardRequest());
  try {
    const response = await axios.get(
      "http://localhost:3000/api/v1/user/leaderboard",
      { withCredentials: true }
    );

    dispatch(userSlice.actions.fetchLeaderboardSuccess(response.data.leaderboard));
    
    dispatch(userSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(userSlice.actions.fetchLeaderboardFailed());

    dispatch(userSlice.actions.clearAllErrors()); // Fixed: added missing parentheses
    console.error(error);
  }
};

export default userSlice.reducer;
