
import { useSelector, useDispatch } from 'react-redux';
import { setBorder } from '@/redux/slices/categorySlices';


function SelectCategory() {
  const categories = useSelector((state) => state.book.list);
  const dispatch = useDispatch();
  const border = useSelector((state) => state.book.border);
  return (
<div className='flex border-b-2 border-white p-2 pl-0 pb-0  overflow-scroll bg-[#F7F9FB] category-box  gap-[20px] noscroll items-center'>
    {categories.map(item=>{
        return <div onClick={()=>{dispatch(setBorder({id:item.key}))}} className={`div h-[40px] gap-[10px]   p-2 ${border===item.key ? "bg-white  rounded-t-[7px]" : "bg-[#F8F8F8F] rounded-[7px]"}  cart-box  flex items-center justify-center`}>
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