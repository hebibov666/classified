import { CheckBox } from "@mui/icons-material"
import { useSelector } from "react-redux"
function Subcategory(){
    const options = useSelector(state => state.book.list);
return(
    <div className="w-full flex flex-col items-center">
        <form className="w-full flex flex-col items-center gap-[20px]">
        <select className='w-full h-[30px] pl-2 outline-none border-0'>
          {options[2].models.map(item=>{
            return <option>{item}</option>
          })}
        </select>
</form>
    </div>
)
}
export default Subcategory