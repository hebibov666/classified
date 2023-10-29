
import { useSelector, useDispatch } from 'react-redux';
import { setBorder } from '@/redux/slices/categorySlices';


function SelectCategory() {
  const categories = useSelector((state) => state.book.list);
  const dispatch = useDispatch();
  const border = useSelector((state) => state.book.border);
  return (
<div className='flex border-b-2 border-grey-500 overflow-scroll bg-[#F7F9FB] category-box  gap-[20px] noscroll items-center'>
    {categories.map(item=>{
        return <div onClick={()=>{dispatch(setBorder({id:item.key}))}} className={` h-[100px] mobile-div hover:text-red-600 flex ${border===item.key ? "mobile-after" : null} flex-col items-center justify-center`}>
       <div className={`h-[60px] w-[60px] bg-[#F1F3F7] hideimg max-[490px]:bg-white p-3 rounded-[10px] ${border===item.key ? "active" : null} `}>
       <img className='w-full h-full' src={item.icon}></img>
       </div>
            <h1 className={`text-[15px] text-black text-center w-[70px] truncate`}>{item.name}</h1>
        </div>
    })}
</div>
  );
}

export default SelectCategory;