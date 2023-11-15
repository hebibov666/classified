import { useSelector,useDispatch } from "react-redux"
import { products } from "@/redux/slices/products"
import { useEffect,useState } from "react"
import Link from "next/link"
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from "axios"
import { getUser } from "@/redux/slices/userSlice";
function Card({title,image,price,id}){
    const [user,setUser]=useState(null)
    const [add,setAdd]=useState(false)
    const favorites=useSelector(state=>state.user.favorites)
    const dispatch=useDispatch()
    useEffect(()=>{
      const user=localStorage.getItem("login")
      dispatch(getUser())
      setUser(user)
    })
    const sendFavori = async (productId) => {
        const data={
            userId:user,
            productId:productId
        }
      if(user && user!=null){
        try {
          const response = await axios.post(`https://listingwebsite.onrender.com/favori`,data);
          if (response.status !== 200) { // HTTP başarı durumunu kontrol et
            throw new Error('HTTP Xətası: ' + response.status,setMessage(response.status + "Xətası"));
          }
          console.log(response.data);
         
        } catch (error) {
          console.error('Xəta:', error);
     
        }
      }
      };
      
      
return(
    <div className="w-full card flex gap-[15px] bg-[#F5F5F5] shadow-sm shadow-grey-500  flex-col items-center relative min-[644px]:h-[300px] min-[644px]:gap-[35px] h-[250px] lg:pb-[10px] pb-[5px] min-[640px]:h-[270px] max-[632px]:w-1/1 sm:w-1/1 md:w-1/1 lg:w-1/1 xl:w-1/1 rounded-[7px]">
<FavoriteIcon onClick={()=>{sendFavori(id)}} fontSize="large" className={`absolute p-[5px] z-[2] ${favorites.includes(id) ? "text-red-500" : "text-[#5c5757]"} bg-white   rounded-bl-[50%] top-0 w-[30px] h-[30px] right-0`}></FavoriteIcon>
<Link href={`/detail/${id}`} className="w-full flex gap-[10px]  flex-col items-center relative min-[644px]:h-[300px] min-[644px]:gap-[35px] bg-white h-[250px] lg:pb-[10px] pb-[5px] min-[640px]:h-[270px] max-[632px]:w-1/1 sm:w-1/1 md:w-1/1 lg:w-1/1 xl:w-1/1 rounded-[7px]">
<div className="flex w-full justify-center w-full h-[170px]">
<img className="rounded-t-[7px] w-full h-[150px]  min-[644px]:h-[200px] lg:h-[180px]  object-cover" src={`https://res.cloudinary.com/dohj3wr2c/image/upload/${image}`}></img>
</div>
<div className="flex flex-col w-full justify-between h-[130px]  pl-2">
    <h1 className="text-[#212C3A] text-[18px] price font-bold">{price }  Azn</h1>
    <p className="text-[16px] h-[41px] text mt-[-3px] text-[#212C3A] w-[90%] overflow-ellipsis overflow-hidden">{title}</p>
    <p className="text-[12px] text-[grey] mt-[7px] ">21.09.2023</p>
</div>
</Link>
    </div>
)
}
export default Card