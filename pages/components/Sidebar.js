"use client"
import { useSelector } from "react-redux"
import { useState } from "react";
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { useDispatch } from "react-redux";
import { closeMenu } from "@/redux/slices/categorySlices";
import { createTheme } from "@mui/material";
import SelectCategory from "./SelectCategory";
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
    <span className=" bg-[#685CFE] flex items-center justify-center w-[80px] p-[5px] rounded-[10px] text-white font-bold">Axtar</span>
</div>
    </div>
    <SelectCategory/>
</div>
    )
}
export default Sidebar