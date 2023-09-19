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
    <div className={`mt-2 pl-4 pr-2 flex flex-col items-center w-full text-[#a9a9a9] `}>
      <span className="h-[35px] flex justify-between items-center pl-1 rounded-[5px] w-full bg-white">
        <h1>Kateqoriya secin</h1>
        <ArrowDropDownIcon onClick={() => dispatch(openCategory())} className="lg:hidden" />
      </span>
      <div className={`overflow-hidden flex justify-center w-full transition-max-height ease-in-out duration-500`}>
        <ul className={`bg-white mt-2 w-full rounded-[5px] flex flex-col gap-[5px] ${categoryClass} lg:flex`}>
          {categories.map((item) => {
            return <li className="flex pl-[5px] h-[30px]">{item.name}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}

export default SelectCategory;