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
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
function Detail(item){
    const product=item.item
    const [bigImage,setBigImage]=useState()
    const [show,setShow]=useState(false)
    console.log(product);
 
 
    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex relative w-full items-center justify-center text-white h-[40px] bg-[#007FFF]">
                <h1>Məhsul haqqında</h1>
               <Link href="/">
               <ArrowBackIosNewIcon className="absolute top-2 left-2"></ArrowBackIosNewIcon>
               </Link>
            </div>
           <div className="flex min-[822px]:p-[30px]  gap-[50px] max-[822px]:flex-col w-full mt-[20px] ">
<div className="w-[50%] max-[822px]:w-full">
<Swiper
      spaceBetween={50}
      slidesPerView={1}
      className={`${show===true ? "swiper-wrapper2 swiper2 h-full" : "small-swiper swiper-wrapper h-full bg-black"}`}
    >
         <CancelIcon onClick={()=>{setShow(false)}} className={`${show===false ? "hidden" : "flex z-[10000000]"} text-white fixed top-2 z-[1000000] right-2 w-[30px] h-[30px]`}/>
{product.image.map(image=>{
    return  <SwiperSlide  onClick={()=>{setShow(true)}} className="w-[100%]  full relative slider p-[20px] h-[90%] h-auto flex items-center justify-center">
        <img className={`${show===true ? "w-full h-full object-contain" : "w-auto img object-contain h-auto  min-[822px]:w-[90%]"}`} src={`https://res.cloudinary.com/dohj3wr2c/image/upload/${image}`}></img>
    </SwiperSlide>
  
   })}
   </Swiper>
</div>


<div className="basis-[50%] rounded-[10px] max-[822px]:mt-[-30px] p-2 flex flex-col gap-[20px] justify-between  relative">
   <div className="flex flex-col">
   <p className="text-black text-[25px] font-bold">{product?.price} Azn</p>
   <h1 className="text-2xl ">{product?.name}</h1>
   </div>
   <div className="flex justify-between">
   <div className="flex flex-col gap-[10px]">
    <p className="text-grey-500">Kateqoriya: {product.category}</p>
    {product.model &&  <p className="text-grey-500">Model: {product.model}</p>}
    {product.city &&  <p className="text-grey-500">Seher: {product.city}</p>}
    {product.color &&  <p className="text-grey-500">Reng: {product.color}</p>}
    {product.engine &&  <p className="text-grey-500">Reng: {product.engine}</p>}
    {product.fuelType &&  <p className="text-grey-500">Reng: {product.fuelType}</p>}
    </div>
    </div>
    <div>
<div className="flex flex-col">
    <h1>Mehsul haqqinda</h1>
<p className="price text-[14px]">{product?.description}</p>
</div>
    </div>
   <div className="w-full  p-[5px]  max-[480px]:w-full flex gap-[5px]  items-center flex-col justify-center">
    <a href={`tel://${product?.number}`} className="text-white bg-[#4586ff] w-full h-[40px] justify-center rounded-[7px] flex gap-[20px] items-center"><PhoneIcon/> Zəng et</a>
   </div>
</div>
           </div>
        </div>
    )
}
export default Detail

export async function getServerSideProps(context){
    const {id}=context.query
    const response = await axios.get(`http://localhost:3001/products/${id}`)
    const item = await response.data[0];
    console.log(item)
    return {
        props: {
            item,
          },
    }
}
