import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Axios } from '../api/axios'


export const getAllUsers = createAsyncThunk("getUserFromMockAPI", async (args, { rejectWithValue }) => {
  try {
    const res = await Axios.get("/crud")    // /crud is a end point
    // console.log(res.data)
    return res.data
  } catch (error) {
    console.log(error)
    return rejectWithValue
  }
})

export const deleteUser = createAsyncThunk("deleteUserFromMokeAPI", async (id, { rejectWithValue }) => {
  try {
    const res = await Axios.delete(`/crud/${id}`)
    return res.data
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const createUser = createAsyncThunk("postUserToMockAPI", async (data, { rejectWithValue }) => {
  try {
    const res = await Axios.post("/crud", data)
    return res.data
  } catch (error) {
    return rejectWithValue(error)
  }
})


export const updateUser = createAsyncThunk("updateUserInMockAPI", async ({ id, user }, rejectWithValue) => {
  console.log({ id, user })
  try {
    const res = await Axios.put(`/crud/${id}`, user)
    return res.data;
  } catch (error) {
    // console.log("error", rejectWithValue)
    return rejectWithValue
  }
})



export const genderWisePost = createAsyncThunk("getGenderPosts", async (genderType, rejectWithValue) => {
  console.log({ genderType })
  const params = {
    search: genderType
  }
  try {
    const res = await Axios.get("/crud", { params })
    console.log(res)
  } catch (error) {
    // console.log("error", rejectWithValue)
    return rejectWithValue
  }
})

export const searchUser = createAsyncThunk("searhUser", async (searchData, { rejectWithValue }) => {
  const params = {
    // search is matched to the all fields  
    search: searchData
  }
  try {
    const res = await Axios.get("/crud", { params })
    const data = res.data
    return data;
  } catch (error) {
    // console.log("error", rejectWithValue)
    return rejectWithValue(error)
  }
})


export const userDetail = createSlice({
  name: "userDetail",
  initialState: {
    users: [],
    userInfo: [],
    isAuthenticated:false,
    isLoading: false,
    error: null,
    modal:{
      id:null,
      open:false,
    }
  },
  reducers: {
    loginUser:(state,action)=>{
        state.userInfo = action.payload;
        localStorage.setItem("userProfile",JSON.stringify( action.payload))
        state.isAuthenticated = true
    },
    logoutUser:(state)=>{
      state.userInfo = []
      state.isAuthenticated = false
      localStorage.setItem("userProfile",false)
      state.isAuthenticated = false
    },
    setUsers: (state, { payload }) => {
      state.users = payload
      state.isLoading = false;
    },
    maleOrFemale: (state, action) => {
      const gender = action.payload
      state.genderWise = state.users.filter((item) => {
        return (item.gender == gender) ? item : ""
      })
    },
    openModal:(state,action)=>{
      state.modal.open = !(state.modal.open)
      state.modal.id = action.payload;
    },
    closeModal:(state)=>{
      state.modal.open=!(state.modal.open);
      state.modal.id = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    })
    builder.addCase(getAllUsers.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    })

    builder.addCase(deleteUser.pending, (state) => {
      state.isLoading = false;
    })
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.isLoading = false;
      // console.log(action.payload.id)   
      //geting index of deleted obj with findIndex    
      const index = state.users.findIndex(obj => obj.id === action.payload.id)
      state.users.splice(index, 1);

    })
    builder.addCase(deleteUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    builder.addCase(createUser.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users.push(action.payload)
    })
    builder.addCase(createUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    })

    builder.addCase(updateUser.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isLoading = false;
      // updating user in redux store
      state.users.findIndex(obj => {
        if (obj.id === action.payload.id) {
          obj.id = action.payload.id;
          obj.name = action.payload.name;
          obj.email = action.payload.email;
          obj.age = action.payload.age;
          obj.gender = action.payload.gender;
        }
      })
    })
    builder.addCase(updateUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload.message;
    })

    builder.addCase(searchUser.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(searchUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    })
    builder.addCase(searchUser.rejected, (state) => {
      state.isLoading = false;
      state.error = "User not found";
    })
  }
})

export const { setUsers, maleOrFemale,openModal,closeModal,loginUser,logoutUser } = userDetail.actions
export default userDetail.reducer