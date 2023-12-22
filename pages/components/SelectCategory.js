
import { useSelector, useDispatch } from 'react-redux';
import { setBorder } from '@/redux/slices/categorySlices';


function SelectCategory({setCategory}) {
  const categories = useSelector((state) => state.book.list);
  const dispatch = useDispatch();
  const border = useSelector((state) => state.book.border);
  
  return (
<div className='flex  min-[900px]:flex-col border-b-2 border-white p-2 max-[490px]:m-0 max-[490px]:rounded-[0px]  m-2 rounded-[10px]  overflow-scroll bg-white min-[900px]:bg-[#EBEDF3] shadow-md shadow-[#EBEDF3] border-2 pb-[10px] mt-[10px] mb-[20px] border-[#EBEDF3]   gap-[20px] noscroll items-center'>
   {categories.map(item=>{
        return <div onClick={()=>{dispatch(setBorder({id:item.key})),setCategory(item.name)}} className={`shrink-0 category-box  rounded-[5px]  card-box gap-[10px]   p-[5px] pb-0 flex flex-col items-center justify-center`}>
       <div style={{ backgroundColor:border===item.key ? "white" : `${item.color}`}} className={`h-[80px]  relative w-[80px]  max-[490px]:h-[60px] max-[490px]:w-[60px]  p-3  hideimg rounded-full`}>
       <img className={`${item.key===0 ? "relative" : "absolute"} absolute left-[50%] top-[50%] translate-x-[-50%]  translate-y-[-50%]    `} src={item.icon}></img>

       </div>
            <h1 className={`text-[14px] lg:text-[16px] max-[490px]:mt-[-7px] text-black text-center truncate`}>{item.name}</h1>
        </div>
    })}
</div>
  );
}

export default SelectCategory;