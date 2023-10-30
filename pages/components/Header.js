import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import Link from 'next/link';
import { openCategory} from '@/redux/slices/categorySlices';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { addPost } from '@/redux/slices/userSlice';
function Header({openLogin}){
    const dispatch=useDispatch()
    const router=useRouter()
    const user=useSelector(state=>state.user.user)
const [login,setLogin]=useState("")
useEffect(()=>{
    if(typeof window!=="undefined" && window.localStorage){
        let user=localStorage.getItem("user")
       if(user){
        setLogin(user)
       }else{
        setLogin("")
       }
    }
},[])
const addPost=()=>{
    if(login===""){
     router.push("/NoLogin")
    }else{
        router.push("/newpost")
    }
}
    return(
    <div className='w-full top-0 left-0 z-[1]  h-[70px] bg-[#8A2BE2] max-[490px]:bg-white  max-[490px]:h-[50px]  flex justify-between pl-4 pr-2 items-center'>
<div className='flex items-center justify-center gap-[10px]'>
    <h1 className="text-2xl text-blue-700  font-bold">Axtar.az</h1>
</div>
<div className='max-[490px]:hidden'>
<div className='flex items-center justify-between gap-[15px] pr-[10px]'>
<div onClick={()=>{dispatch(openCategory())}} className='w-[30px] h-[30px] rounded-[10px] bg-white  flex items-center justify-center'>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ">
  <path strokeLinecap="round" strokeLinejoin="round"  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
</svg>
</div>
   <div className='w-[30px] h-[30px] rounded-[10px] bg-white flex items-center justify-center'>
   <AddIcon fontSize='medium' onClick={addPost} className='text-black font-bold '/>
   </div>
   <div className='w-[30px] h-[30px] rounded-[10px] bg-white flex items-center justify-center'>
  {login != "" ?  <Link href="/ProfilePage"><PersonIcon fontSize='medium'  className='text-black font-bold'/></Link> : <Link href="/LoginBox"><LoginIcon fontSize='medium' className='text-black font-bold'/></Link>}
   </div>
</div>
</div>
</div>
    )
}
export default Header