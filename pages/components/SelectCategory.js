
import { useSelector, useDispatch } from 'react-redux';
import { setBorder } from '@/redux/slices/categorySlices';


function SelectCategory() {
  const categories = useSelector((state) => state.book.list);
  const dispatch = useDispatch();
  const border = useSelector((state) => state.book.border);
  return (
<div className='flex border-b-2 border-white p-2  overflow-scroll bg-white category-box  gap-[20px] noscroll items-center'>
   {categories.map(item=>{
        return <div onClick={()=>{dispatch(setBorder({id:item.key}))}} className={`h-[35px] gap-[10px] relative  p-2 ${border===item.key ? "bg-[#E6E6FA] div rounded-[7px]" : "bg-white border-[1px] border-[#87CEEB] rounded-[7px]"}  cart-box  flex items-center justify-center`}>
       <div className={`h-[20px] w-[20px]  hideimg rounded-[10px]`}>
       <img className='w-full h-full' src={item.icon}></img>
       </div>
            <h1 className={`text-[15px] text-black text-center truncate`}>{item.name}</h1>
        </div>
    })}
</div>
  );
}

export default SelectCategory;