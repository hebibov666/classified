import Card from "./Card"
import Link from "next/link"
import {useState} from "react"
import { useSelector,useDispatch } from "react-redux"
import { products } from "@/redux/slices/products"
import { useEffect } from "react"
import CircularUnderLoad from "./Progress"
import ErrorAlert from "./Snackbars/ErrorAlert"
function SearchProduct(){
    const [text,setText]=useState("")
    const dispatch=useDispatch()
    const search=()=>{
        dispatch(SearchProduct(text))
      }

    return(
<div className={`mx-auto h-full w-full basis-[100%]  max-[1015px]:border-[#E8E8E8]  `}>

 <h1 className="mt-2 pl-2 text-xl max-[450px]:text-[17px] text-blue-600">{category}</h1>
 <div className="flex searchinput shadow-sm shadow-[#f1f3f7] w-full bg-white justify-between p-[2px] items-center  rounded-[10px]">
    <input type="text" onChange={(e)=>{setText(e.currentTarget.value)}} placeholder="Elan axtar" className="search-input w-[90%] pl-2 box-border outline-0 border-none bg-[#F8F9FD]"></input>
    <span onClick={search} className=" bg-blue-600  flex items-center justify-center w-[80px] p-[5px] rounded-[10px] text-white font-bold">Axtar</span>
</div>
</div>
    )
}
export default SearchProduct