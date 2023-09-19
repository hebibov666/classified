
import { useSelector, useDispatch } from 'react-redux';
import { setBorder } from '@/redux/slices/categorySlices';


function SelectCategory() {
  const categories = useSelector((state) => state.book.list);
  const dispatch = useDispatch();
  const border = useSelector((state) => state.book.border);
  return (
  <div className='flex pt-2 pl-2  max-[1015px]:h-[50px] h-[60px] gap-[15px] pb-[10px] overflow-scroll noscroll'>
{categories.map(item=>{
    return <span  onClick={()=>{dispatch(setBorder({id:item.key}))}} className={border==item.key ? "flex w-[130px] gap-[5px] items-center justify-between bg-[#ff000034] border-red-600 pl-2 pr-2  border-[2px]  rounded-[7px]" : "flex w-[130px] gap-[5px] items-center justify-between pl-2 pr-2 border-black  border-[2px]  rounded-[7px]"}>{item.icon}<span className='flex w-full justify-center items-center'>{item.name}</span></span>
})}
  </div>
  );
}

export default SelectCategory;