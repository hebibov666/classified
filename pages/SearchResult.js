import { useSelector } from "react-redux"
import { useRouter } from "next/router";
import Card from "./components/Card"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
function SearchResult(){
    const data=useSelector(state=>state.products.data)
    const favorites=useSelector(state=>state.user.favorites)
    const router=useRouter()
    return(
        <div className="flex flex-col">
            <div className="w-full h-[50px] flex gap-[20px] items-center font-bold bg-red-600 text-white">
               <ArrowBackIosNewIcon onClick={()=>{router.push("/")}}/>
                <h1>Axtaris neticesi</h1>
            </div>
<div className="grid p-2 max-[480px]:gap-[5px] pb-[50px] basis-[100%] grid-cols-3 max-[480px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
   
   {data?.map(product => (
     <Card  favorites={favorites} key={product._id} title={product.name} image={product.image[0]} id={product._id} price={product.price} />
   ))}
 </div>
        </div>
    )
}
export default SearchResult