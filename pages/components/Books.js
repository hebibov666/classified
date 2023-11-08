import Card from "./Card"
import Link from "next/link"
import {useState} from "react"
import { useSelector,useDispatch } from "react-redux"
import { products } from "@/redux/slices/products"
import { useEffect } from "react"
import CircularUnderLoad from "./Progress"
import ErrorAlert from "./Snackbars/ErrorAlert"
function Books({category}){
    const dispatch=useDispatch()
    const data=useSelector(state=>state.products.data)
    const error=useSelector(state=>state.products.error)
    const loading=useSelector(state=>state.products.loading)
    const [open,SetOpen]=useState(false)
    const [message,setMessage]=useState()
    const [status,setStatus]=useState(0)
    console.log(category)
    useEffect(()=>{
        dispatch(products(category))
    },[category])

    return(
<div className={`mx-auto h-full w-full basis-[100%]  max-[1015px]:border-[#E8E8E8]  `}>

 <h1 className="mt-2 pl-2 text-xl max-[450px]:text-[17px] text-blue-600">{category}</h1>
 {loading===true ? <div className="w-full pt-[100px] h-full gap-[15px] flex-col flex items-center justify-center">
 <CircularUnderLoad/>
 <h1>Elanlar yüklənir...</h1>
    </div>
     : 
 data.length<=0 && error===null ? <p className="w-full flex items-center justify-center pt-[100px] h-full">Bu kateqoriyada elan yoxdur</p> : <div className="grid p-2 max-[480px]:gap-[5px] pb-[100px] basis-[100%] grid-cols-3 max-[480px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
 {data.map(product=>{
  return <Card setStatus={setStatus} setMessage={setMessage} setOpen={SetOpen} title={product.name} image={product.image[0]} id={product._id}  price={product.price}/>
 })
 }
</div>
 }
 {error!=null ? <p className="w-full h-full flex items-center text-center justify-center">Xəta!<br></br> Yenidən yoxlayın</p> : null}
{open===true ? <ErrorAlert status={status} message={message} open={open} setOpen={SetOpen}/> : null}
</div>
    )
}
export default Books

