import { useSelector } from "react-redux"
function AdvancedSearch(){
    const colors=useSelector(state=>state.book.colors)
    const cities=useSelector(state=>state.book.city)
    const categories=useSelector(state=>state.book.list)
    const show=useSelector(state=>state.book.openCategory)
    return(
<div className={`flex flex-col max-[1015px]:fixed ${show ? 'bottom-0' : 'bottom-[-300%]'} anime bottom-0 left-0 max-[1015px]:bg-white h-[50%] max-[1015px]:rounded-t-[20px] w-full pt-[10px] gap-[10px]`}>
<div className="p-2 flex flex-col gap-[20px]">
<select className="w-full pl-2 rounded-[7px] outline-none border-0 h-[30px] bg-white">
    <option hidden>Kateqoriya</option> 
    {
        categories.map(category=>{
            return <option className="border-0 outline-none" >{category.name}</option>
        })
    }
  </select>
  <div className="flex gap-[10px]">
  <input type="text" placeholder="Max qiymət" className="w-full pl-2 rounded-[7px] outline-none border-0 h-[30px] bg-white "></input>
  <input type="text" placeholder="Min qiymət" className="w-full pl-2 rounded-[7px] outline-none border-0 h-[30px] bg-white"></input>
  </div>
  <select className="w-full pl-2 rounded-[7px] outline-none border-0 h-[30px] bg-white">
    <option hidden>Rəng</option>
    {
        colors.map(color=>{
            return <option >{color}</option>
        })
    }
  </select>
  <select className="w-full pl-2 rounded-[7px] outline-none border-0 h-[30px] bg-white">
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
    )
}
export default AdvancedSearch