import { useSelector,useDispatch } from "react-redux"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { selectModels } from "@/redux/slices/categorySlices";
import { useState } from "react";
import { SearchProduct,AdvancedSearchs } from "@/redux/slices/products";
import { useRouter } from "next/router";
import Card from "./components/Card";
import CircularUnderLoad from "./components/Progress"
function AdvancedSearch(){
  const [text,setText]=useState("")
  const loading=useSelector(state=>state.products.searchLoading)
  const error=useSelector(state=>state.products.searchError)
    const options=useSelector(state=>state.book.list)
    const models=useSelector(state=>state.book.brands)
    const city=useSelector(state=>state.book.city)
    const brands=models.map(item=>item.models)
    const components=useSelector(state=>state.book.components)
   const form=useSelector(state=>state.book.formId)
    const show=useSelector(state=>state.book.openCategory)
    const products=useSelector(state=>state.products.searchProducts)
    const [openFilter,setOpenFilter]=useState(false)
    const favorites=useSelector(state=>state.user.favorites)
    const [parametr,setParametr]=useState({})
const SendParams=()=>{
  dispatch(AdvancedSearchs(parametr))
}
const handleInputChange=(e)=>{
const {name,value}=e.currentTarget
setParametr((prevParams) => ({
  ...prevParams,
  [name]: value,
}));
}
    const router=useRouter()
    const dispatch=useDispatch()
    const search=()=>{
      dispatch(SearchProduct(text))
    }

    const renderFormBasedOnCategory = () => {
      switch (parametr.category) {
        case "Telefon":
          return (
            <select name='model'
            onChange={handleInputChange}  className='w-[80%]  h-[30px] pl-2 outline-none border-0 text-[#a9a9a9]'>
              {options[1].models.map(item => {
                return <option>{item}</option>
              })}
            </select>
          );
        case "Komputer":
          return (
            <select name='model' 
            onChange={handleInputChange} className='w-[80%]  h-[30px] outline-none border-0 pl-2 text-[#a9a9a9]'>
              {options[2].models.map(item => {
                return <option>{item}</option>
              })}
            </select>
          );
        case "Televizor":
          return (
            <div className='w-[80%] flex flex-col gap-[20px]  text-[#a9a9a9]'>
              <select name='model' 
             onChange={handleInputChange}  className='w-full h-[30px] pl-2 outline-none border-0'>
                {options[3].models.map(item => {
                  return <option>{item}</option>
                })}
              </select>
            </div>
          );
          case "Nəqliyyat":
            return (
              <div className='w-full flex flex-col gap-[20px]  text-[#a9a9a9]'>
              <select name='model' 
              onChange={handleInputChange} className='w-full h-[30px] pl-2 outline-none border-0'>
                 <option hidden>Marka</option>
                {options[2].models.map(item => {
                  return <option>{item}</option>
                })}
              </select>
              <select name='fuelType' 
              onChange={handleInputChange} className='w-full h-[30px] pl-2 outline-none border-0'>
               <option hidden>Yanacaq növü</option>
              <option>Benzin</option>
              <option>Dizel</option>
              <option>Qaz</option>
              <option>Elektrik</option>
              </select>
              <input type='text'  onChange={handleInputChange} className='w-full outline-none border-0  h-[30px] pl-2' name='engine'  placeholder='Mühərrik həcmi'></input>
              <select name='gearbox' 
              onChange={handleInputChange} className='w-full h-[30px] pl-2 outline-none border-0'>
               <option hidden>Sürətlər qutusu</option>
              <option>Mexaniki</option>
              <option>Avtomat</option>
              <option>Variator</option>
              <option>Robotlaşdırılmış</option>
              </select>
            </div>
            );
            case "Aksessuar":
              return(
                <div className='w-full flex flex-col gap-[20px]  text-[#a9a9a9]'>
                <select name='model'
                onChange={handleInputChange} className='w-full h-[30px] pl-2 outline-none border-0'>
                    <option hidden>Məhsul tipi</option>
                  {options[5].models.map(item => {
                    return <option>{item}</option>
                  })}
                </select>
              </div>
              );
        default:
          return null;
      }
    };
    return(
        <div className={`flex overflow-scroll noscroll flex-col justify-start  anime top-0 left-0   min-h-full   w-full max-[900px]:w-full  gap-[10px]`}>
<div className="p-2 flex flex-col gap-[20px]">
<div className="flex searchinput  w-full bg-white justify-between p-[2px] items-center  rounded-[10px]">
<div onClick={()=>{setOpenFilter(openFilter?  false : true)}} className='w-[30px] h-[30px] rounded-[10px] bg-white  flex items-center justify-center'>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ">
  <path strokeLinecap="round" strokeLinejoin="round"  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
</svg>
</div>
    <input type="text" onChange={(e)=>{setText(e.currentTarget.value)}} placeholder="Elan axtar" className="search-input w-[90%] pl-2 box-border outline-0 border-none bg-[#F8F9FD]"></input>
    <span onClick={search} className=" bg-[#007FFF]  flex items-center justify-center w-[80px] p-[5px] rounded-[10px] text-white font-bold">Axtar</span>
</div>
<div className={`flex ${openFilter=== true ? "flex" : "hidden"} shadow-sm shadow-[#F1F3F7] p-2 flex-col bg-white rounded-[7px] w-full pt-[10px] gap-[10px]`}>
    <h1 className="pl-2">Ətraflı axtarış</h1>
<div className="w-[100%] noscroll h-full  custom  gap-[20px]  grid grid-cols-1 justify-center  place-items-center">
                <select name="category" onChange={handleInputChange}  className='w-full text-[#a9a9a9] rounded-[7px] h-[40px] p-[5px] outline-none shadow-[15px] shadow-[grey]'>
                  <option hidden>Kateqoriya</option>
                  {options.map(item=>{
                    return <option value={item.name} className={item.name==="Bütün elanlar" ? "hidden" : null} >{item.name}</option>
                  })}
                </select>
                {renderFormBasedOnCategory()}
                <div className="w-full flex gap-[10px]">
                <input name="minPrice" onChange={handleInputChange} required placeholder='Min qiymət' type='text' className='w-full h-[40px] p-[5px] outline-none shadow-[15px] shadow-[grey]'></input>
                <input name="maxPrice" onChange={handleInputChange} required placeholder='Max qiymət' type='text' className='w-full h-[40px] p-[5px] outline-none shadow-[15px] shadow-[grey]'></input>
                </div>
  

                <select name="city" onChange={handleInputChange}  className='w-full text-[#a9a9a9] rounded-[7px] h-[40px] p-[5px] outline-none shadow-[15px] shadow-[grey]'>
<option hidden>Şəhər</option>
{city.map(city=>{
  return <option>{city}</option>
})}
                </select>
    
        
    
                 
                <button onClick={SendParams} className="bg-[#007FFF] outline-none border-0 w-full p-2 rounded-[10px] text-white mt-[20px]">Axtar</button>
            </div>
</div>
</div>

</div>
    )
}
export default AdvancedSearch