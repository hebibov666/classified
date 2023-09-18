import AddIcon from '@mui/icons-material/Add';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link';
import { openMenu } from '@/redux/slices/categorySlices';
import { useDispatch } from 'react-redux';
function Header({openLogin}){
    const dispatch=useDispatch()
    return(
    <div className="w-full h-[70px] bg-[#685CFE] flex justify-between pl-4 pr-2 items-center">
<div className='flex items-center justify-center gap-[10px]'>
    <MenuIcon fontSize='large' className='text-white lg:hidden' onClick={()=>{dispatch(openMenu())}}/>
    <h1 className="text-2xl text-white font-bold">Elan.az</h1>
</div>
<div className='flex items-center justify-between gap-[15px] pr-[10px]'>
   <div className='w-[30px] h-[30px] rounded-[10px] bg-white flex lg:hidden items-center justify-center'>
   <SearchIcon fontSize='medium' className='text-black font-bold'/>
   </div>
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