import axios from  "axios"
import { useState } from "react";
import { useEffect } from "react"
import { useSelector } from "react-redux";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Link from "next/link";
function FavoriteProducts({item}){
    const [user,setUser]=useState()
    const [favorites,setFavorites]=useState([])
  console.log(item)
    return(
        <div className="flex flex-col gap-[30px] w-full">
            <div className="flex w-full bg-red-600 h-[40px] font-bold text-white items-center gap-[40px] justify-start pl-2">
            <Link href="/">
               <ArrowBackIosNewIcon className="absolute top-2 left-2"></ArrowBackIosNewIcon>
               </Link>
                <h1>Seçilmişlər</h1>
            </div>
 <div className="w-full">
    {item.length>0 ? 
    <div className="grid p-2 max-[480px]:gap-[5px] pb-[100px] basis-[100%] grid-cols-3 max-[480px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
    {item.map(product=>{
        return    <div className="w-full card flex gap-[15px] bg-[#F5F5F5] shadow-sm shadow-grey-500  flex-col items-center relative min-[644px]:h-[300px] min-[644px]:gap-[35px] h-[250px] lg:pb-[10px] pb-[5px] min-[640px]:h-[270px] max-[632px]:w-1/1 sm:w-1/1 md:w-1/1 lg:w-1/1 xl:w-1/1 rounded-[7px]">
        <Link href={`/detail/${product?._id}`} className="w-full flex gap-[10px]  flex-col items-center relative min-[644px]:h-[300px] min-[644px]:gap-[35px] bg-white h-[250px] lg:pb-[10px] pb-[5px] min-[640px]:h-[270px] max-[632px]:w-1/1 sm:w-1/1 md:w-1/1 lg:w-1/1 xl:w-1/1 rounded-[7px]">
        <div className="flex w-full justify-center w-full h-[170px]">
        <img className="rounded-t-[7px] w-full h-[150px]  min-[644px]:h-[200px] lg:h-[180px]  object-cover" src={`https://res.cloudinary.com/dohj3wr2c/image/upload/${product?.image}`}></img>
        </div>
        <div className="flex flex-col w-full justify-between h-[130px]  pl-2">
            <h1 className="text-[#212C3A] text-[18px] price font-bold">{product?.price }  Azn</h1>
            <p className="text-[16px] h-[41px] text mt-[-3px] text-[#212C3A] w-[90%] overflow-ellipsis overflow-hidden">{product?.name}</p>
            <p className="text-[12px] text-[grey] mt-[7px] ">21.09.2023</p>
        </div>
        </Link>
            </div>
    })}</div> : <div className="w-full flex flex-col gap-[20px] pt-[70px] items-center justify-center">
        <img src="../bookmark.png" className="w-[70px] h-[70px]"></img>
        <p className="font-bold text-xl text-center">Seçilmişlərdə məhsul yoxdur!</p>
        </div>}
 </div>
            </div>
    )
}
export default FavoriteProducts

export async function getServerSideProps(context){
  const {userid}=context.query
  const response = await axios.get(`https://weblisting.onrender.com/favori/${userid}`)
  const item = await response.data;
  console.log(userid)
  return {
      props: {
          item,
        },
  }
}