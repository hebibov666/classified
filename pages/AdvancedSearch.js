import { useSelector,useDispatch } from "react-redux"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { selectModels } from "@/redux/slices/categorySlices";
import { useState } from "react";
import  { SearchProduct,AdvancedSearchs,refreshData} from "@/redux/slices/products";
import { useRouter } from "next/router";
import Card from "./components/Card";
import { getUser } from "@/redux/slices/userSlice";
import { useEffect } from "react";
import Books from "./components/Books";
function AdvancedSearch({setCategory,category}){
  const [text,setText]=useState("")
  const loading=useSelector(state=>state.products.searchLoading)
  const error=useSelector(state=>state.products.searchError)
    const options=useSelector(state=>state.book.list)
    const data=useSelector(state=>state.products.data)
    const city=useSelector(state=>state.book.city)
    const [openFilter,setOpenFilter]=useState(false)
    const favorites=useSelector(state=>state.user.favorites)
    const colors = useSelector(state => state.book.colors);
    const [parametr,setParametr]=useState({})
    const router=useRouter()
    const dispatch=useDispatch()

    useEffect(()=>{
      dispatch(getUser())
},[])

useEffect(()=>{
  dispatch(refreshData())
},[router.asPath])

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
  
    const search=()=>{
      dispatch(SearchProduct(text))
    }

    const renderFormBasedOnCategory = () => {
      switch (parametr.category) {
        case "Telefon":
          return (
           <div className='w-full flex  gap-[20px]  text-[#a9a9a9]'>
             <select name='model'
            onChange={handleInputChange}  className='w-[80%]  h-[40px] pl-2 outline-none border-0 text-[#a9a9a9]'>
              {options[1].models.map(item => {
                return <option>{item}</option>
              })}
            </select>
               <select name='color'  
               onChange={handleInputChange} className='w-[80%] rounded-[7px] outline-none border-0 text-[#a9a9a9] h-[40px] pl-2'>
               <option hidden>Rəng</option>
               {colors.map(color => {
                 return <option value={color}>{color}</option>
               })}
             </select>
           </div>
          );
        case "Komputer":
          return (
            <select name='model' 
            onChange={handleInputChange} className='w-[80%]  h-[40px] outline-none border-0 pl-2 text-[#a9a9a9]'>
              {options[4].models.map(item => {
                return <option>{item}</option>
              })}
            </select>
          );
        case "Televizor":
          return (
            <div className='w-full flex flex-col gap-[20px]  text-[#a9a9a9]'>
              <select name='model' 
             onChange={handleInputChange}  className='w-full h-[40px] pl-2 outline-none border-0'>
                {options[4].models.map(item => {
                  return <option>{item}</option>
                })}
              </select>
            </div>
          );
          case "Nəqliyyat":
            return (
              <div className='w-full md:grid sm:grid sm:grid-cols-2 lg:grid lg:grid-cols-3 md:grid-cols-3 flex flex-col gap-[20px]  text-[#a9a9a9]'>
              <select name='model' 
              onChange={handleInputChange} className='w-full rounded-[7px] h-[40px] pl-2 outline-none border-0'>
                 <option hidden>Marka</option>
                {options[2].models.map(item => {
                  return <option>{item}</option>
                })}
              </select>
              <select name='banType' onChange={handleInputChange} 
          className='w-full h-[40px] rounded-[7px] pl-2 outline-none border-0'>
             <option hidden>Ban növü</option>
            {options[2].banTypes.map(item => {
              return <option>{item}</option>
            })}
          </select>
              <select name='fuelType' 
              onChange={handleInputChange} className='w-full h-[40px] rounded-[7px] pl-2 outline-none border-0'>
               <option hidden>Yanacaq növü</option>
              <option>Benzin</option>
              <option>Dizel</option>
              <option>Qaz</option>
              <option>Elektrik</option>
              </select>
              <input type='text'  onChange={handleInputChange} className='w-full rounded-[7px] outline-none border-0  h-[40px] pl-2' name='engine'  placeholder='Mühərrik həcmi'></input>
              <select name='gearbox' 
              onChange={handleInputChange} className='w-full h-[40px] pl-2 rounded-[7px] outline-none border-0'>
               <option hidden>Sürətlər qutusu</option>
              <option>Mexaniki</option>
              <option>Avtomat</option>
              <option>Variator</option>
              <option>Robotlaşdırılmış</option>
              </select>
              <input type='text' onChange={handleInputChange}  className='w-full rounded-[7px] outline-none border-0  h-[40px] pl-2' name='year'  placeholder='Buraxılış ili'></input>
              <select name='color'  
            onChange={handleInputChange} className='w-[80%] rounded-[7px] outline-none border-0 text-[#a9a9a9] h-[40px] pl-2'>
            <option hidden>Rəng</option>
            {colors.map(color => {
              return <option value={color}>{color}</option>
            })}
          </select>
            </div>
            );
            case "Daşınmaz əmlak":
              return (
                <div className='w-full md:grid sm:grid sm:grid-cols-2 lg:grid lg:grid-cols-3 md:grid-cols-3 flex flex-col gap-[20px]  text-[#a9a9a9]'>
                  <select name='model' 
                  onChange={handleInputChange}  className='w-full h-[40px] pl-2 outline-none border-0'>
                      <option hidden>Mənzilin tipi</option>
                      <option >Bina evi</option>
                      <option >Həyət evi</option>
                  </select>
                  <select name='homeType' 
                  onChange={handleInputChange}  className='w-full h-[40px] pl-2 outline-none border-0'>
                      <option hidden>Elanın tipi</option>
                      <option >Satılır</option>
                      <option >Kiraye verilir</option>
                  </select>
                  <input type='number' name='rooms' onChange={handleInputChange}  className='w-full outline-none border-0 h-[40px] pl-2' placeholder='Otaq sayı'></input>
          
                  <select name='homeIsNew' 
                  onChange={handleInputChange}  className='w-[80%] h-[40px] outline-none border-0 text-[#a9a9a9]  pl-2'>
                  <option hidden>Mənzil vəziyyəti</option>
                  <option >Köhnə tikili</option>
                  <option >Yeni tikili</option>
                </select>
                 </div>
              );
            case "Aksessuar":
              return(
                <div className='w-full flex flex-col gap-[20px]  text-[#a9a9a9]'>
                <select name='model'
                onChange={handleInputChange} className='w-full h-[40px] pl-2 outline-none border-0'>
                    <option hidden>Məhsul tipi</option>
                  {options[6].models.map(item => {
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
  <div className={`flex flex-col`}>
    <div className="flex items-center gap-[20px] pl-2 bg-red-600 h-[50px] w-full text-white">
      <ArrowBackIosIcon onClick={()=>{router.push("/")}}></ArrowBackIosIcon>
<h1 className="font-bold">Axtaris</h1>
    </div>
        <div className='m-2 box-border bg-[#EBEDF3] rounded-[10px]'>
        <div className={`flex overflow-scroll noscroll flex-col justify-start  anime top-0 left-0   min-h-full   w-full max-[900px]:w-full  gap-[10px]`}>
<div className="p-2 flex flex-col  gap-[20px]">
<div className="flex searchinput  w-full bg-white justify-between p-[2px] items-center  rounded-[10px]">
<div onClick={()=>{setOpenFilter(openFilter?  false : true)}} className='w-[30px] h-[30px] rounded-[10px] bg-white  flex items-center justify-center'>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ">
  <path strokeLinecap="round" strokeLinejoin="round"  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
</svg>
</div>
    <input type="text" onChange={(e)=>{setText(e.currentTarget.value)}} placeholder="Elan axtar" className="search-input w-[90%] pl-2 box-border outline-0 border-none bg-[#F8F9FD]"></input>
    <span onClick={search} className=" bg-red-600  flex items-center justify-center w-[80px] p-[5px] rounded-[10px] text-white font-bold">Axtar</span>
</div>
<div className={`flex ${openFilter=== true ? "flex" : "hidden"} shadow-sm shadow-[#F1F3F7] p-2 flex-col bg-[#EBEDF3] rounded-[7px] w-full pt-[10px] gap-[10px]`}>
    <h1 className="pl-2">Ətraflı axtarış</h1>
<div className="w-[100%] noscroll h-full  custom  gap-[20px]  grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1 lg:grid-cols-3  justify-center  place-items-center">
                <select name="category" onChange={handleInputChange}  className='w-full text-[#a9a9a9] rounded-[7px] h-[40px] p-[5px] outline-none '>
                  <option hidden>Kateqoriya</option>
                  {options.map(item=>{
                    return <option value={item.name} className={item.name==="Bütün elanlar" ? "hidden" : null} >{item.name}</option>
                  })}
                </select>
               
                <div className="w-full  flex gap-[10px]">
                <input name="minPrice" onChange={handleInputChange} required placeholder='Min qiymət' type='number' className='w-full h-[40px] p-[5px] outline-none '></input>
                <input name="maxPrice" onChange={handleInputChange} required placeholder='Max qiymət' type='number' className='w-full h-[40px] p-[5px] outline-none '></input>
                </div>

                <select name="city" onChange={handleInputChange}  className='w-full text-[#a9a9a9] rounded-[7px] h-[40px] p-[5px] outline-none '>
<option hidden>Şəhər</option>
{city.map(city=>{
  return <option>{city}</option>
})}
                </select>
    
          
    
                 
           
            </div>
            {renderFormBasedOnCategory()}
            <button onClick={SendParams} className="bg-red-600 w-[49%] mt-[10px] outline-none border-0  p-2 rounded-[10px] text-white ">Axtar</button>
</div>
</div>

</div>
</div>


<div className="grid bg-[#EBEDF3] min-h-[100vh] p-2 max-[480px]:gap-[5px] pb-[50px] basis-[100%] grid-cols-3 max-[480px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
{data && data.map(product=>{
return   <Card  favorites={favorites} key={product._id} title={product.name} image={product.image[0]} id={product._id} price={product.price} />
})}
</div>
</div>
  
    )
}
export default AdvancedSearch