import { useSelector,useDispatch } from "react-redux"
import { products } from "@/redux/slices/products"
import { useEffect } from "react"
import Link from "next/link"
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
function Card({title,image,price,id}){
return(
    <div className="w-full card flex gap-[10px] shadow-sm shadow-grey-500 flex-col items-center relative min-[644px]:h-[300px] min-[644px]:gap-[35px] bg-white h-[250px] lg:pb-[10px] pb-[5px] min-[640px]:h-[270px] max-[632px]:w-1/1 sm:w-1/1 md:w-1/1 lg:w-1/1 xl:w-1/1 rounded-[7px]">
<BookmarkBorderIcon fontSize="large" className="absolute p-[5px] z-[10000] bg-white rounded-bl-[50%] top-0 w-[40px] h-[40px] text-black right-0"></BookmarkBorderIcon>
<Link href={`/detail/${id}`} className="w-full flex gap-[10px]  flex-col items-center relative min-[644px]:h-[300px] min-[644px]:gap-[35px] bg-white h-[250px] lg:pb-[10px] pb-[5px] min-[640px]:h-[270px] max-[632px]:w-1/1 sm:w-1/1 md:w-1/1 lg:w-1/1 xl:w-1/1 rounded-[7px]">
<div className="flex w-full justify-center w-full h-[170px]">
<img className="rounded-t-[7px] w-full h-[150px]  min-[644px]:h-[200px] lg:h-[180px]  object-cover" src={`https://res.cloudinary.com/dohj3wr2c/image/upload/${image}`}></img>
</div>
<div className="flex flex-col w-full justify-start  pl-2  gap-[5px]">
    <h1 className="text-black text-[20px] font-bold">{price }  Azn</h1>
    <p className="text-[18px] h-[30px] w-[90%] overflow-ellipsis overflow-hidden">{title}</p>
    <p className="text-[12px] text-[grey] ">21.09.2023</p>
</div>
</Link>
    </div>
)
}
export default Card