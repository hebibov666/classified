import { useSelector,useDispatch } from "react-redux"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { closeCategory } from "@/redux/slices/categorySlices";
function AdvancedSearch(){
    const colors=useSelector(state=>state.book.colors)
    const cities=useSelector(state=>state.book.city)
    const categories=useSelector(state=>state.book.list)
    const show=useSelector(state=>state.book.openCategory)
    const dispatch=useDispatch()
    return(
        <div className={`flex flex-col justify-start   fixed ${show ? 'left-0' : 'left-[-300%]'}  z-[999] anime top-0 left-0  bg-[#F8F9FD] h-full w-full lg:w-[30%]  gap-[10px]`}>
<div className="flex h-[40px]  items-center justify-end pr-2 border-b-[1px] border-[#a9a9a9]">
<ArrowBackIosIcon  onClick={()=>{dispatch(closeCategory())}}/>
</div>
<div className="p-2 flex flex-col gap-[20px]">
<div className="flex w-full bg-white justify-between p-[2px] items-center border-[1px] border-[#B0B0B0] rounded-[10px]">
    <input type="text" placeholder="Elan axtar" className="search-input w-[90%] pl-2 box-border outline-0 border-none bg-[#F8F9FD]"></input>
    <span className=" bg-red-600 flex items-center justify-center w-[80px] p-[5px] rounded-[10px] text-white font-bold">Axtar</span>
</div>
<div className={`flex p-2 flex-col bg-white rounded-[7px] w-full pt-[10px] gap-[10px]`}>
<div className=" flex flex-col gap-[20px]">
<h1 className="text-[19px]">Ətraflı axtarış</h1>
<select className="w-full shadow-sm shadow-[grey] pl-2 text-[#a9a9a9] rounded-[7px] outline-none border-0 h-[30px] bg-white">
    <option hidden>Kateqoriya</option> 
    {
        categories.map(category=>{
            return <option className="border-0 outline-none" >{category.name}</option>
        })
    }
  </select>
  <div className="flex gap-[10px]">
  <input type="text" placeholder="Max qiymət" className="w-full shadow-sm shadow-[grey] pl-2 rounded-[7px] outline-none border-0 h-[30px] bg-white "></input>
  <input type="text" placeholder="Min qiymət" className="w-full shadow-sm shadow-[grey] pl-2 rounded-[7px] outline-none border-0 h-[30px] bg-white"></input>
  </div>
  <select className="w-full pl-2 text-[#a9a9a9] shadow-sm shadow-[grey] rounded-[7px] outline-none border-0 h-[30px] bg-white">
    <option hidden>Rəng</option>
    {
        colors.map(color=>{
            return <option >{color}</option>
        })
    }
  </select>
  <select className="w-full pl-2 text-[#a9a9a9] shadow-sm shadow-grey rounded-[7px] outline-none border-0 h-[30px] bg-white">
    <option hidden>Şəhər</option>
    {
        cities.map(city=>{
            return <option >{city}</option>
        })
    }
  </select>
  <button className="bg-red-600 outline-none border-0 w-full p-2 rounded-[10px] text-white mt-[20px]">Axtar</button>
</div>
</div>
</div>
</div>
    )
}
export default AdvancedSearch