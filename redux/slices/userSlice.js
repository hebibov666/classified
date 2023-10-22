import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
export const userLogin=createAsyncThunk('user/userLogin',async(userData)=>{
  const request=await axios.post("https://finalproject-etqp.onrender.com/login",userData)
  const response=request.data
if(response.token){
  localStorage.setItem('user',JSON.stringify(response.token))
  console.log(response.token);
}
  return response
})

export const getUser=createAsyncThunk('user/getUser',async()=>{
 if(typeof window!=="undefined" && window.localStorage){
  var token=localStorage.getItem("user")
    }
  const request=await axios.get('https://finalproject-etqp.onrender.com/login', {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
 return request.data

})

export  const User = createSlice({
  name: 'user',
  initialState:{
   isLogin:false,
   loading:false,
   error:"",
   userId:null,
   user:null,
   loading:false,
   posts:[],
},
  reducers: {
 
   },
  extraReducers:(builder)=>{
    builder.addCase(userLogin.pending,(state,action)=>{
    state.loading=true,
    state.loading=true
    }),
    builder.addCase(userLogin.fulfilled,(state,action)=>{
      state.loading=false;
     if(!action.payload.token){
   state.error=action.payload
     }else{
state.isLogin=action.payload.token;
state.loading=false
     }
  })
  builder.addCase(getUser.pending,(state,action)=>{
    state.user=null
   })
  builder.addCase(getUser.fulfilled,(state,action)=>{
   state.user=action.payload,
   console.log(action.payload);
  })
  }
});

export const {login,deleteUser} = User.actions;

export default User.reducer;
