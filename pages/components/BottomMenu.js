import Link from "next/link"
import { useState,useEffect } from "react";
import { openCategory} from '@/redux/slices/categorySlices';
import { useDispatch,useSelector } from 'react-redux';
import { useRouter } from "next/router";
import PersonIcon from '@mui/icons-material/Person';
import LoginIcon from '@mui/icons-material/Login';
import FavoriteIcon from '@mui/icons-material/Favorite';
function BottomMenu(){
    const dispatch=useDispatch()
    const [login,setLogin]=useState("")
    const router=useRouter()
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

    return(
       
            
<div class="fixed z-[10000] w-full h-16   bg-white border border-gray-200 min-[490px]:hidden bottom-0">
    <div class="grid h-full max-w-lg grid-cols-5 mx-auto">

     <button data-tooltip-target="tooltip-home" type="button" class="inline-flex flex-col items-center justify-center px-5 rounded-l-full hover:bg-gray-50 group">
            <svg class="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
            </svg>
            <span class="sr-only">Home</span>
        </button>
    
     <button data-tooltip-target="tooltip-home" type="button" class="inline-flex flex-col items-center justify-center px-5 rounded-l-full text-gray-500 hover:bg-gray-50  group">
          <FavoriteIcon/>
            <span class="sr-only">Home</span>
        </button>
 <div class="flex items-center justify-center">
            <button data-tooltip-target="tooltip-new" type="button" class="inline-flex items-center justify-center w-10 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800">
                <svg class="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16"/>
                </svg>
                <span class="sr-only">New item</span>
            </button>
        </div>
       
        <button  onClick={()=>{dispatch(openCategory())}}  data-tooltip-target="tooltip-settings" type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
            <svg class="w-5 h-5 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12.25V1m0 11.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M4 19v-2.25m6-13.5V1m0 2.25a2.25 2.25 0 0 0 0 4.5m0-4.5a2.25 2.25 0 0 1 0 4.5M10 19V7.75m6 4.5V1m0 11.25a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5ZM16 19v-2"/>
            </svg>
            <span class="sr-only">Settings</span>
        </button>
       
        <button data-tooltip-target="tooltip-profile" type="button" class="inline-flex flex-col items-center justify-center px-5 rounded-r-full hover:bg-gray-50 text-gray-500 group">
        {login != "" ?  <Link href="/ProfilePage"><PersonIcon fontSize='medium'  className='font-bold'/></Link> : <Link href="/LoginBox"><LoginIcon fontSize='medium' className='font-bold'/></Link>}
        </button>
       
    </div>
</div>
    
    )
}
export default BottomMenu