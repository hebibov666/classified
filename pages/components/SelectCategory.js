
import { useSelector, useDispatch } from 'react-redux';
import { setBorder } from '@/redux/slices/categorySlices';


function SelectCategory({setCategory}) {
  const categories = useSelector((state) => state.book.list);
  const dispatch = useDispatch();
  const border = useSelector((state) => state.book.border);
  return (
<div className='flex border-b-2 border-white p-2   m-2 rounded-[10px]  overflow-scroll bg-[#F1F3F7]   gap-[20px] noscroll items-center'>
   {categories.map(item=>{
        return <div onClick={()=>{dispatch(setBorder({id:item.key})),setCategory(item.name)}} className={` shrink-0 category-box  rounded-[5px]  card-box gap-[10px]   p-[5px] pb-0 flex flex-col items-center justify-center`}>
       <div className={`h-[80px] w-[80px] max-[490px]:h-[60px] max-[490px]:w-[60px] bg-white p-3  hideimg rounded-full`}>
       <img className='w-full h-full' src={item.icon}></img>

       </div>
            <h1 className={`text-[14px] lg:text-[16px]  max-[490px]:mt-[-7px] text-black text-center truncate`}>{item.name}</h1>
        </div>
    })}
</div>
  );
}

export default SelectCategory;