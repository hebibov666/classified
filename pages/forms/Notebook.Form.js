import { useSelector } from "react-redux"
function NotebookForm(){
    const models=useSelector(state=>state.book.brands)
    const brands=models.map(item=>item.models)
  const colors=useSelector(state=>state.book.colors)
return(
    <div className="w-full flex flex-col items-center">
      {brands.length>0 ?   (<form className="w-full flex flex-col items-center gap-[20px]">
       <select className='w-[80%] text-[#a9a9a9] rounded-[7px] h-[40px] p-[5px] outline-none shadow-[15px] shadow-[grey]'>
      <option hidden>Marka</option>
       {
    brands[0].map((item, index) => (
      <option key={index} className='flex flex-col'>
        {item}
      </option>
    ))
    }
     <select className='w-[80%] text-[#a9a9a9] rounded-[7px] h-[40px] p-[5px] outline-none shadow-[15px] shadow-[grey]'>
                  <option hidden>Məhsul növü</option>
        <option>PC</option>
        <option>Notebook</option>
       </select>
       <select className='w-[80%] text-[#a9a9a9] rounded-[7px] h-[40px] p-[5px] outline-none shadow-[15px] shadow-[grey]'>
                  <option hidden>Əməliyyat sistemi</option>
        <option>Window</option>
        <option>MacOs</option>
        <option>Linux</option>
        <option>Unix</option>
        <option>Chorome OS</option>
        <option>FreeBSD</option>
        <option>Solaris</option>
        <option>Haiku</option>
       </select>
       </select>
       <select className='w-[80%] text-[#a9a9a9] rounded-[7px] h-[40px] p-[5px] outline-none shadow-[15px] shadow-[grey]'>
<option hidden>Məhsul rəngi</option>
{colors.map(color=>{
  return <option>{color}</option>
})}
       </select>

       
</form>) : null }
    </div>
)
}
export default NotebookForm