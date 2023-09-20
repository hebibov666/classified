
import { useSelector, useDispatch } from 'react-redux';
import { setBorder } from '@/redux/slices/categorySlices';


function SelectCategory() {
  const categories = useSelector((state) => state.book.list);
  const dispatch = useDispatch();
  const border = useSelector((state) => state.book.border);
  return (
<div className='flex overflow-scroll p-2 gap-[20px] noscroll items-center'>
    {categories.map(item=>{
        return <div onClick={()=>{dispatch(setBorder({id:item.key}))}} className=" h-[100px] hover:text-red-600 flex flex-col items-center justify-center">
            <span className={`w-[60px] hover:border-[1px] ${border==item.key ? "border-[1px]" : null} border-red-600 h-[60px] bg-white flex items-center justify-center rounded-[15px]`}>{item.icon}</span>
            <h1 className='text-[14px]'>{item.name}</h1>
        </div>
    })}
</div>
  );
}

export default SelectCategory;