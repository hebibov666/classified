import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
export const userLogin=createAsyncThunk('user/userLogin',async(userData)=>{
  const request=await axios.post("http://localhost:3001/login",userData)
  const response=request.data
if(response.token){
  localStorage.setItem('user',JSON.stringify(response.token))
  console.log(response.token);
}
  return response
})
export  const User = createSlice({
  name: 'user',
  initialState:{
   isLogin:false,
   loading:false,
   error:"",
},
  reducers: {
  
   },
  extraReducers:(builder)=>{
    builder.addCase(userLogin.pending,(state,action)=>{
    state.loading=true
    }),
    builder.addCase(userLogin.fulfilled,(state,action)=>{
      state.loading=false;
     if(!action.payload.token){
   state.error=action.payload
     }else{
state.isLogin=action.payload.token
     }
  })
  }
});

export const {login} = User.actions;

export default User.reducer;
