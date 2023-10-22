import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Link from "next/link";
function Detail({product}){
    const router=useRouter()
    const {id}=router.query
    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex relative w-full items-center justify-center text-white h-[40px] bg-red-600">
                <h1>Məhsul haqqında</h1>
               <Link href="/">
               <ArrowBackIosNewIcon className="absolute top-2 left-2"></ArrowBackIosNewIcon>
               </Link>
            </div>
           <div className="flex m-2 gap-[50px] max-[1000px]:flex-col h-[500px] mt-[20px] p-3">

    <img className="w-[100%] h-auto object-cover" src={`https://res.cloudinary.com/dohj3wr2c/image/upload/${product?.image}`}></img>

<div className="basis-[50%]  p-2 flex flex-col gap-[20px] justify-between  relative">
    <div className="flex flex-col gap-[10px]">
    <h1 className="text-2xl ">{product?.title}</h1>
    <p className="text-blue-400">{product?.category}</p>
    <p className="text-blue-400">{product?.model}</p>
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
    const response = await fetch(`https://finalproject-etqp.onrender.com/products/${id}`);
    const urunler = await response.json();
    return {
        props: {
            product,
          },
    }
}
