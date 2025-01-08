import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  userList: [],
};

export const addNewUser = createAsyncThunk(
  "/users/addnewuser",
  async (formData) => {
    const result = await axios.post(
      "https://scn-royal-server.vercel.app/api/admin/users/add",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return result?.data;
  }
);

export const fetchAllusers = createAsyncThunk(
  "/users/fetchAllusers",
  async () => {
    const result = await axios.get(
      "https://scn-royal-server.vercel.app/api/admin/users/get"
    );

    return result?.data;
  }
);

export const edituser = createAsyncThunk(
  "/users/edituser",
  async ({ id, formData }) => {
    const result = await axios.put(
      `https://scn-royal-server.vercel.app/api/admin/users/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return result?.data;
  }
);

export const deleteuser = createAsyncThunk(
  "/users/deleteuser",
  async (id) => {
    const result = await axios.delete(
      `https://scn-royal-server.vercel.app/api/admin/users/delete/${id}`
    );

    return result?.data;
  }
);

const AdminusersSlice = createSlice({
  name: "adminusers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllusers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllusers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userList = action.payload.data;
      })
      .addCase(fetchAllusers.rejected, (state, action) => {
        state.isLoading = false;
        state.userList = [];
      });
  },
});

export default AdminusersSlice.reducer;
