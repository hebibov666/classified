import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useSelector, useDispatch } from 'react-redux';
import { openCategory } from '@/redux/slices/categorySlices';

function SelectCategory() {
  const categories = useSelector((state) => state.book.list);
  const dispatch = useDispatch();
  const showCategory = useSelector((state) => state.book.openCategory);

  // Kategori gösterme durumuna göre bir sınıf adı belirleyin
  const categoryClass = showCategory ? 'flex' : 'hidden';

  return (
  <div className='flex pt-2 pl-2  h-[60px] gap-[15px] pb-[20px] overflow-scroll noscroll'>
{categories.map(item=>{
    return <span className='flex w-[130px] gap-[5px] items-center justify-between pl-2 pr-2  border-[2px] border-red-600 rounded-[7px]'>{item.icon}<span className='flex w-full justify-center items-center'>{item.name}</span></span>
})}
  </div>
  );
}

export default SelectCategory;