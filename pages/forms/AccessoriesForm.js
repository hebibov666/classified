import { useSelector } from "react-redux"
function AccessoriesForm(){
    const models=useSelector(state=>state.book.brands)
    const brands=models.map(item=>item.models)
return(
    <div className="w-full flex flex-col items-center">
      {brands.length>0 ?   (<form className="w-full flex flex-col items-center gap-[20px]">
       <select className='w-[80%] text-[#a9a9a9] rounded-[7px] h-[40px] p-[5px] outline-none shadow-[15px] shadow-[grey]'>
       <option hidden>Məhsul növü</option>
       {
    brands[0].map((item, index) => (
      <option key={index} className='flex flex-col'>
        {item}
      </option>
    ))
    }
     
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
export default AccessoriesForm