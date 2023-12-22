import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import {useEffect} from "react"
import { useState } from "react";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Link from "next/link";
import axios from "axios"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/bundle'
import CancelIcon from '@mui/icons-material/Cancel';
import PhoneIcon from '@mui/icons-material/Phone';
import moment from 'moment';
import 'moment/locale/az';
function Detail(item) {
    const product = item.item
    const [bigImage, setBigImage] = useState()
    const [show, setShow] = useState(false)
    const [user,setUser]=useState()
   const userId=product?.userId
const getUserData=async()=>{
try{
    const response=await axios.get(`http://localhost:3001/getOwner/${userId}`)
setUser(response.data)
console.log(response.data)
}catch(error){
    console.log(error)
}
}
useEffect(()=>{
    getUserData()
},[])
moment.locale('az');
const bugun = moment();
const dun = moment().subtract(1, 'days');

const tarihFormatla = (tarih) => moment(tarih).format('YYYY-MM-DD HH:mm:ss');

let date;
console.log(moment(product.date).format("DD"))
if(moment(product.date).format("DD")==moment().format("DD")){
    date= "Bugün" +  moment(product.date).format("HH:mm")
  }else if(moment().format("DD")-1==moment(product.date).format("DD")){
    date= "Dünən" +  moment(product.date).format("HH:mm")
  }else{
    date= moment(product.date).format('HH:mm')
  }
    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex relative w-full font-bold items-center justify-center text-white h-[40px] bg-red-600">
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
                        className={`${show === true ? "swiper-wrapper2 swiper2 h-full" : "small-swiper swiper-wrapper h-full bg-black"}`}
                    >
                        <CancelIcon onClick={() => { setShow(false) }} className={`${show === false ? "hidden" : "flex z-[10000000]"} text-white fixed top-2 z-[1000000] right-2 w-[30px] h-[30px]`} />
                        {product.image.map(image => {
                            return <SwiperSlide onClick={() => { setShow(true) }} className="w-[100%]  full relative slider p-[20px] h-[90%] h-auto flex items-center justify-center">
                                <img className={`${show === true ? "w-full h-full object-contain" : "w-auto img object-contain h-auto  min-[822px]:w-[90%]"}`} src={`https://res.cloudinary.com/dohj3wr2c/image/upload/${image}`}></img>
                            </SwiperSlide>

                        })}
                    </Swiper>
                </div>


                <div className="basis-[50%] rounded-[10px] max-[822px]:mt-[-30px] p-2 flex flex-col gap-[20px] justify-between  relative">
                    <div className="flex flex-col bg-white rounded-[7px]">
                        <p className="text-black text-[25px] font-bold">{product?.price} Azn</p>
                        <h1 className="text-2xl ">{product?.name}</h1>
                    </div>
                    <div className="flex justify-between">
                        <div className="flex w-full flex-col gap-[10px]">
                            {product.category && <div className="flex justify-between  gap-[30px]"><p className="text-grey-500 font-bold">Kateqoriya: </p> <p className="text-start">{product.category}</p></div>}
                            {product.model && <div className="flex justify-between  gap-[30px]"><p className="text-grey-500 font-bold">Marka: </p> <p className="text-start">{product.model}</p></div>}
                            {product.marka && <div className="flex justify-between gap-[30px]"><p className="text-grey-500 font-bold">Model: </p> <p className="text-start">{product.marka}</p></div>}
                            {product.camera && <div className="flex justify-between gap-[30px]"><p className="text-grey-500 font-bold">Kamera: </p> <p className="text-start">{product.camera} Mbps</p></div>}
                            {product.memory && <div className="flex justify-between gap-[30px]"><p className="text-grey-500 font-bold">Yaddaş: </p> <p className="text-start">{product.memory} Gb</p></div>}
                            {product.engine && <div className="flex justify-between gap-[30px]"><p className="text-grey-500 font-bold">Mühərrik həcmi: </p> <p className="text-start">{product.engine} sm³</p></div>}
                            {product.fuelType && <div className="flex justify-between gap-[30px]"><p className="text-grey-500 font-bold">Yanacaq növü: </p> <p className="text-start">{product.fuelType}</p></div>}
                            {product.gearbox && <div className="flex justify-between gap-[30px]"><p className="text-grey-500 font-bold">Sürətlər qutusu: </p> <p className="text-start">{product.gearbox}</p></div>}
                            {product.walk && <div className="flex justify-between gap-[30px]"><p className="text-grey-500 font-bold">Yürüş: </p> <p className="text-start">{product.walk} km</p></div>}
                            {product.year && <div className="flex justify-between gap-[30px]"><p className="text-grey-500 font-bold">Buraxılış ili: </p> <p className="text-start">{product.year}</p></div>}
                            {product.color && <div className="flex justify-between gap-[30px]"><p className="text-grey-500 font-bold">Rəngi: </p> <p className="text-start">{product.color}</p></div>}
                            {product.isNew && <div className="flex justify-between gap-[30px]"><p className="text-grey-500 font-bold">Vəziyyəti: </p> <p className="text-start">{product.isNew}</p></div>}
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-col">
                            <h1 className="text-xl font-bold pb-[5px]">Məhsul açıqlaması</h1>
                            <p className="price text-[14px]">{product?.description}</p>
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-center">
                    <div className="w-full p-2 flex bg-[#EBEDF3] rounded-[10px] h-[60px] items-center">
                        <div className="w-[50px] border-[1px] border-black h-[50px] rounded-full">
                            <img className="w-full h-full rounded-full" src={`https://res.cloudinary.com/dohj3wr2c/image/upload/${user?.avatar}`}></img>
                        </div>
                        <div className="flex flex-col p-2 ">
                            <h1 className="text-black font-bold pl-2">{user?.name}</h1>
                            <h1 className="text-gray-700 pl-[4px]">{product?.number}</h1>
                        </div>

</div>
                    </div>
                    <div className="flex flex-col bg-[#EBEDF3] p-2 rounded-[7px]">
                        <h1>Baxış sayı: {product?.viewCount}</h1>
                        <h1>Əlavə edilib: {date}</h1>
                    </div>
                    <div className="w-full  p-[5px]  max-[480px]:w-full flex gap-[5px]  items-center flex-col justify-center">
                        <a href={`tel://${product?.number}`} className="text-white bg-[#4586ff] w-full h-[40px] justify-center rounded-[7px] flex gap-[20px] items-center"><PhoneIcon /> Zəng et</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Detail

export async function getServerSideProps(context) {
    const { id } = context.query
    const response = await axios.get(`http://localhost:3001/products/${id}`)
    const item = await response.data[0];
    console.log(item)
    return {
        props: {
            item,
        },
    }
}
