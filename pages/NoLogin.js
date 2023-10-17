import { useRouter } from "next/router"

function NoLogin(){
    const router=useRouter()
    return(
       <div className="w-full fixed bg-white  h-full flex flex-col items-center justify-center">
<div className="flex flex-col gap-[50px] items-center justify-center">
    <h1 className="text-[20px] text-center">Elan əlavə etmək üçün sayta giriş etməlisiniz</h1>
   <div className="flex gap-[20px]">
   <button onClick={()=>{router.push("/LoginBox")}} className="bg-blue-500 w-[200px] text-white flex items-center justify-center rounded-[5px] p-[5px]">Giriş et</button>
    <button onClick={()=>{router.push("/")}} className="bg-red-500 w-[200px] text-white flex items-center justify-center rounded-[5px] p-[5px]">Geri</button>
   </div>
</div>

       </div>
    )
}
export default NoLogin