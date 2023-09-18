import { useSelector } from "react-redux"
function Tvform(){
    const models=useSelector(state=>state.book.brands)
    const brands=models.map(item=>item.models)
  const colors=useSelector(state=>state.book.colors)
  const screenSize=useSelector(state=>state.book.screenSize)
return(
    <div className="w-full flex flex-col items-center">
      {brands.length>0 ?   (<form className="w-full flex flex-col items-center gap-[20px]">
       <select className='w-[80%] text-[#a9a9a9] rounded-[7px] h-[40px] p-[5px] outline-none shadow-[15px] shadow-[grey]'>
      <option hidden>Marka</option>
       {brands[0].map((item, index) => (
      <option key={index} className='flex flex-col'>
        {item}
      </option>
    ))}
       </select>
       <select className='w-[80%] text-[#a9a9a9] rounded-[7px] h-[40px] p-[5px] outline-none shadow-[15px] shadow-[grey]'>
<option hidden>Məhsul rəngi</option>
{colors.map(color=>{
  return <option>{color}</option>
})}
       </select>
       <select required className='w-[80%] text-[#a9a9a9] rounded-[7px] h-[40px] p-[5px] outline-none shadow-[15px] shadow-[grey]'>
        <option hidden>Ekran ölçüsü</option>
        {screenSize.map(size=>{
           return  <option>{size}</option>
        })}
       </select>
       <select required className='w-[80%] text-[#a9a9a9] rounded-[7px] h-[40px] p-[5px] outline-none shadow-[15px] shadow-[grey]'>
        <option hidden>Məhsul növü</option>
        <option>Lcd</option>
        <option>Led</option>
        <option>Qled</option>
        <option>Oled</option>
        <option>Plasma</option>
        <option>Crt</option>
        <option>Micro-Led</option>
       </select>
       <select className='w-[80%] text-[#a9a9a9] rounded-[7px] h-[40px] p-[5px] outline-none shadow-[15px] shadow-[grey]'>
                  <option hidden>Yeni?</option>
        <option>Bəli</option>
        <option>Xeyr</option>
       </select>
       <select className='w-[80%] text-[#a9a9a9] rounded-[7px] h-[40px] p-[5px] outline-none shadow-[15px] shadow-[grey]'>
                  <option hidden>Çatdrılıma var?</option>
        <option>Bəli</option>
        <option>Xeyr</option>
       </select>
       
</form>) : null }
    </div>
)
}
export default Tvform