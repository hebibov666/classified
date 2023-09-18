"use client"
import { useSelector } from "react-redux"
import { useState } from "react";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { useDispatch } from "react-redux";
import { closeMenu } from "@/redux/slices/categorySlices";
import { createTheme } from "@mui/material";
function Sidebar(){
    const categories=useSelector((state)=>state.book.list)
  const [border,setBorder]=useState(0);
  const show=useSelector(state=>state.book.menuShow)
  
  const dispatch=useDispatch()
  
    return(
<div className="w-full h-[100%] basis-[20%] min-[1015px]:pt-[40px] max-[1015px]:basis-[100%] flex flex-col items-start pt-[20px] bg-[#F8F9FD]">

<div className="pl-4 pr-2 w-full">
<div className="flex w-full justify-between p-[2px] items-center border-[1px] border-[#B0B0B0] rounded-[10px]">
    <input type="text" placeholder="Elan axtar" className="search-input w-[90%] pl-2 box-border outline-0 border-none bg-[#F8F9FD]"></input>
    <span className=" bg-[#685CFE] flex items-center justify-center w-[80px] p-[5px] rounded-[10px] text-white font-bold">Tap</span>
</div>
    </div>
<div className="pt-[10px] w-full max-[600px]:pt-[20px]">
<ul onChange={()=>{alert("ok")}} className="max-[1015px]:flex max-[1015px]:gap-[20px] max-[1015px]:ml-[15px] w-full overflow-hidden hover:overflow-scroll">
{categories.map(item=>{
    return <li onClick={(e)=>{setBorder(item.key)}} key={item.key} className={item.key==border? "p-3 max-[1015px]:w-[100px] items-center max-[1015px]:justify-center pl-4 max-[1015px]:text-white h-auto flex text-[18px] gap-[10px]  border-l-[5px] bg-[#eeeeee] text-black max-[1015px]:rounded-[20px] max-[1015px]:border-none max-[1015px]:bg-[#0F0F0F] border-blue-700 font-bold" : "p-3  max-[1015px]:w-[100px] items-center max-[1015px]:justify-center pl-4 h-auto flex text-[18px] gap-[10px] "}>{item.name}</li>
  
})}
</ul>
</div>
</div>
    )
}
export default Sidebar