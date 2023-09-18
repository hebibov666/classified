function Card(){
return(
    <div className="w-full bg-white h-auto pb-[5px] max-[632px]:w-1/1 sm:w-1/1 md:w-1/1 lg:w-1/1 xl:w-1/1">
<div className="flex justify-center  w-full">
<img className="rounded-t-[7px] h-full w-full object-contain" src="/masin.webp"></img>
</div>
<div className="flex flex-col  pl-2  gap-[5px] object-fit">
    <h1 className="text-[#5F2C3A] text-[21px] font-bold">10 AZN</h1>
    <p className="text-[18px]">Hundai</p>
    <p className="text-[12px] text-[grey] ">21.09.2023</p>
</div>
    </div>
)
}
export default Card