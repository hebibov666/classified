import Card from "./Card"
import Link from "next/link"
import { useSelector,useDispatch } from "react-redux"
import { products } from "@/redux/slices/products"
import { useEffect } from "react"
import CircularUnderLoad from "./Progress"
function Books(){
    const dispatch=useDispatch()
    const data=useSelector(state=>state.products.data)
    const error=useSelector(state=>state.products.error)
    const loading=useSelector(state=>state.products.loading)
    useEffect(()=>{
        dispatch(products())
    },[dispatch])
    useEffect(()=>{
        console.log(data);
    },[data])
    return(
<div className={`mx-auto h-full w-full basis-[100%]  max-[1015px]:border-[#E8E8E8]  `}>

 <h1 className="mt-2 pl-2 text-xl max-[450px]:text-[18px] text-blue-600">Bütün elanlar</h1>
 {loading===true ? <div className="w-full pt-[100px] h-full gap-[15px] flex-col flex items-center justify-center">
 <CircularUnderLoad/>
 <h1>Elanlar yüklənir...</h1>
    </div>
     : 
 
 <div className="grid p-2 max-[480px]:gap-[5px] pb-[100px] basis-[100%] grid-cols-3 max-[480px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
 {data.map(product=>{
  return <Card title={product.name} image={product.image[0]} id={product._id}  price={product.price}/>
 })
 }
</div>
 }
 {error!=null ? <p className="w-full h-full flex items-center text-center justify-center">Xəta!<br></br> Yenidən yoxlayın</p> : null}
</div>
    )
}
export default Books

