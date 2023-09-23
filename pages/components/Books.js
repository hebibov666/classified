import Card from "./Card"
import Header from "./Header"
import SelectCategory from "./SelectCategory"
import Link from "next/link"
import { useSelector,useDispatch } from "react-redux"
import { products } from "@/redux/slices/products"
import { useEffect } from "react"
function Books(){
    const dispatch=useDispatch()
    const data=useSelector(state=>state.products.data)
    useEffect(()=>{
        dispatch(products())
        console.log(data);
    },[dispatch])
    useEffect(()=>{
        console.log(data);
    },[data])
    return(
<div className={`mx-auto w-full basis-[100%]  max-[1015px]:border-[#E8E8E8]  `}>

 <h1 className="mt-2 pl-2 text-xl text-blue-600">Bütün elanlar</h1>
  <div className="grid p-2 basis-[100%] grid-cols-3 max-[480px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
   {data.map(product=>{
    return <Link href={`/detail/${product.id}`}>
        <Card title={product.title} image={product.images[0]} price={product.price}/>
    </Link>
   })}
  </div>
</div>
    )
}
export default Books