import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { openMenu,goDarkMode } from '@/redux/slices/categorySlices';
import { useDispatch,useSelector } from 'react-redux';
function Header({openLogin}){
    const dispatch=useDispatch()
    const darkMode=useSelector(state=>state.book.darkMode)

    return(
    <div className='w-full fixed top-0 left-0  h-[70px] bg-[#685CFE] flex justify-between pl-4 pr-2 items-center'>
<div className='flex items-center justify-center gap-[10px]'>
    <h1 className="text-2xl text-white font-bold">Axtar.az</h1>
</div>
<div className='flex items-center justify-between gap-[15px] pr-[10px]'>
   <div className='w-[30px] h-[30px] rounded-[10px] bg-white flex items-center justify-center'>
   <Link href="/newpost">
   <AddIcon fontSize='medium' className='text-black font-bold'/>
   </Link>
   </div>
   <div className='w-[30px] h-[30px] rounded-[10px] bg-white flex items-center justify-center'>
   <PersonIcon fontSize='medium' className='text-black font-bold' onClick={()=>{openLogin(true)}}/>
   </div>
</div>
</div>
    )
}
export default Header