import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import Link from 'next/link';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { addPost } from '@/redux/slices/userSlice';
import SearchIcon from '@mui/icons-material/Search';
import { getUser } from '@/redux/slices/userSlice';
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
useEffect(()=>{
dispatch(getUser())
},[])
    return(
    <div className='w-full top-0 left-0 z-[1]  h-[70px] bg-red-600   max-[490px]:h-[50px]  flex justify-between pl-4 pr-2 items-center'>
<div className='flex items-center max-[490px]:w-full justify-start gap-[10px]'>
    <h1 className="text-2xl text-white   font-bold">Axtar.az</h1>
</div>
<div className='max-[490px]:hidden'>
<div className='flex items-center justify-between gap-[15px] pr-[10px]'>
<div onClick={()=>{router.push("/AdvancedSearch")}} className='w-[30px] h-[30px] rounded-[10px] bg-white  flex items-center justify-center'>
<SearchIcon/>
</div>
   <div className='w-[30px] h-[30px] rounded-[10px] bg-white flex items-center justify-center'>
   <AddIcon fontSize='medium' onClick={addPost} className='text-black font-bold '/>
   </div>
   <div className='w-[30px] h-[30px] rounded-[10px] bg-white flex items-center justify-center'>
  {login != "" ?  <Link href="/ProfilePage"><img className='w-full h-full rounded-[20px] object-contain' src={`https://res.cloudinary.com/dohj3wr2c/image/upload/${user?.avatar}`}></img></Link> : <Link href="/LoginBox"><LoginIcon fontSize='medium' className='text-black font-bold'/></Link>}
   </div>
</div>
</div>
</div>
    )
}
export default Header