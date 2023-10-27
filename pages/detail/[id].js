import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import { useState } from "react";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Link from "next/link";
import axios from "axios"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/bundle'
import CancelIcon from '@mui/icons-material/Cancel';
function Detail(item){
    const product=item.item
    const [bigImage,setBigImage]=useState()
    const [show,setShow]=useState(false)
    console.log(product);
 
 
    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex relative w-full items-center justify-center text-white h-[40px] bg-blue-600">
                <h1>Məhsul haqqında</h1>
               <Link href="/">
               <ArrowBackIosNewIcon className="absolute top-2 left-2"></ArrowBackIosNewIcon>
               </Link>
            </div>
           <div className="flex min-[822px]:p-[30px] p-[10px] gap-[50px] max-[822px]:flex-col w-full mt-[20px] ">
<div className="w-[50%] max-[822px]:w-full">
<Swiper
      spaceBetween={50}
      slidesPerView={1}
      className={`${show===true ? "swiper-wrapper2 swiper2 h-full" : "small-swiper rounded-[20px] swiper-wrapper h-full bg-black"}`}
    >
         <CancelIcon onClick={()=>{setShow(false)}} className={`${show===false ? "hidden" : "flex"} text-white fixed top-2 z-[1000000] right-2 w-[30px] h-[30px]`}/>
{product.image.map(image=>{
    return  <SwiperSlide  onClick={()=>{setShow(true)}} className="w-[100%]  full relative slider p-[20px] h-[90%] h-auto flex items-center justify-center">
        <img className={`${show===true ? "w-full h-full object-contain" : "w-auto img object-contain h-auto  min-[822px]:w-[90%]"}`} src={`https://res.cloudinary.com/dohj3wr2c/image/upload/${image}`}></img>
    </SwiperSlide>
  
   })}
   </Swiper>
</div>


<div className="basis-[50%]  bg-white rounded-[10px] max-[822px]:mt-[-30px] p-2 flex flex-col gap-[20px] justify-between  relative">
    <div className="flex flex-col gap-[10px]">
    <h1 className="text-2xl ">{product?.name}</h1>
    <p className="text-blue-400">{product?.price}</p>
    <p className="text-blue-400">Kateqoriya: {product?.category}</p>
    <p className="text-blue-400">Model: {product?.model}</p>
    <p className="text-blue-400">Rəng: {product?.color}</p>
    <p className="text-blue-400">{product?.color}</p>
    <p>{product?.description}</p>
    </div>
   <div className="flex justify-center items-end w-full gap-[10px] top-[95%]">
   <a href="" className="flex w-[110px] rounded-[7px] bg-red-600 text-white p-2 items-center justify-center">Zəng et</a>
   <a href="" className="flex w-[110px] rounded-[7px] bg-green-600 text-white p-2 items-center justify-center">Whatsapp</a>
   </div>
</div>
           </div>
        </div>
    )
}
export default Detail

export async function getServerSideProps(context){
    const {id}=context.query
    const response = await axios.get(`https://finalproject-etqp.onrender.com/products/${id}`)
    const item = await response.data[0];
    console.log(item)
    return {
        props: {
            item,
          },
    }
}
