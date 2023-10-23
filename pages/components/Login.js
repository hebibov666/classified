import { useState } from 'react';
import TextField from '@mui/material/TextField';
import axios from "axios"
import { useSelector,useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import {  userLogin } from '@/redux/slices/userSlice';
import { useEffect } from 'react';
import { Loading } from 'react-loading-dot'
function Login() {
  const [email, setEmail] = useState('');
  const router=useRouter()
  const Login=useSelector(state=>state.user.isLogin)
  const loading=useSelector(state=>state.user.loading)
 const [error,setError]=useState("")
  const [password, setPassword] = useState('');
  const dispatch=useDispatch()
  const handleLogin = async () => {
    const userData={
      email,
      password
    }
 dispatch(userLogin(userData)).then((result)=>{
  if(typeof window!=="undefined" && window.localStorage){
   if(localStorage.getItem("user")){
    router.push("/")
   }else{
    setError(result.payload)
   }
   
}
 })
  }
  return (
   <div className='flex w-full flex-col items-center gap-[20px]'>
  <TextField
          id="outlined-password-input"
          label="Email ünvanınız"
          type="text"
          autoComplete="current-password"
        size='small'
        fullWidth
        onChange={(e) => setEmail(e.target.value)}
      
        />
        <TextField
          id="outlined-password-input"
          label="Şifrəniz"
          type="password"
          autoComplete="current-password"
        size='small'
    fullWidth
    onChange={(e) => setPassword(e.target.value)}
        />
        {error != "" ? <p className='text-red-400 text-start w-full pl-[2px]'>{error}</p> : null}
        <button   onClick={handleLogin} className='outline-none bg-blue-500 rounded-[5px] w-full h-[40px] flex items-center justify-center p-[5px] text-white'>
           {loading===true ? "Giriş edilir..." : " Giriş et"}
        </button>
   </div>
  );
}

export default Login;
