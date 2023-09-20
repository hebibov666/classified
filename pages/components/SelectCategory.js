
import { useSelector, useDispatch } from 'react-redux';
import { setBorder } from '@/redux/slices/categorySlices';


function SelectCategory() {
  const categories = useSelector((state) => state.book.list);
  const dispatch = useDispatch();
  const border = useSelector((state) => state.book.border);
  return (
<div className='grid grid-cols-4 gap-[10px] p-1 text-black max-[571px]:grid-cols-2 place-items-center'>
    {categories.map(item=>{
        return <div onClick={()=>{dispatch(setBorder({id:item.key}))}} className={` w-full  shadow-sm ${border===item.key ? "shadow-inset" : ""} rounded-[7px] shadow-[grey] h-[100px] flex flex-col items-center justify-center`}>
            <span>{item.icon}</span>
            <h1 className='text-black'>{item.name}</h1>
        </div>
    })}
</div>
  );
}

export default SelectCategory;