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
        <div className={show===true ? "w-[100%] fixed top-0 left-0 h-[100%] basis-[20%] flex flex-col items-start pt-[40px] bg-[#00000054]" : "w-[20%] h-[100%] basis-[20%] max-[1015px]:hidden flex flex-col items-start pt-[40px] bg-[#F8F9FD]"}>
<div className={show===true ? "w-[70%] fixed top-0 left-0 h-[100%] basis-[20%] flex flex-col items-start pt-[40px] bg-[#F8F9FD]" : "w-full h-[100%] basis-[20%] max-[1015px]:hidden flex flex-col items-start pt-[40px] bg-[#F8F9FD]"}>
<ArrowCircleLeftIcon fontSize="large" className="absolute text-[#685CFE]  top-1 right-1 text-2xl min-[1015px]:hidden" onClick={()=>{dispatch(closeMenu())}}/>

<div className="pl-4 pr-2 max-[600px]:pt-[20px]">
<div className="flex  justify-between p-[2px] items-center border-[1px] border-[#B0B0B0] rounded-[10px]">
    <input type="text" placeholder="Elan axtar" className="search-input w-[90%] pl-2 box-border outline-0 border-none bg-[#F8F9FD]"></input>
    <span className="bg-blue-700 flex items-center justify-center w-[80px] p-[5px] rounded-[10px] text-white font-bold">Tap</span>
</div>
    </div>
<div className="pt-[10px] w-full max-[600px]:pt-[20px]">
<ul onChange={()=>{alert("ok")}}>
{categories.map(item=>{
    return <li onClick={(e)=>{setBorder(item.key)}} key={item.key} className={item.key==border? "p-3 pl-4  h-auto flex text-[18px] gap-[10px]  border-l-[5px] bg-[#eeeeee] text-black border-blue-700 font-bold" : "p-3 pl-4 h-auto flex text-[18px] gap-[10px] "}>{item.name}</li>
  
})}
</ul>
</div>
</div>
</div>
    )
}
export default Sidebar