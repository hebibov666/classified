import Card from "./Card"
import Header from "./Header"
import SelectCategory from "./SelectCategory"

function Books(){
    return(
<div className={`mx-auto w-full  max-[1015px]:border-[#E8E8E8]  `}>

 <h1 className="mt-2 pl-2 text-xl text-blue-600">Bütün elanlar</h1>
  <div className="grid p-2  max-[1015px]:basis-[100%] grid-cols-3 max-[480px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
   <Card/>
   <Card/>
   <Card/>
   <Card/>
   <Card/>
   <Card/>
   <Card/>
   <Card/>
   <Card/>
   <Card/>
   <Card/>
   <Card/>
  </div>
</div>
    )
}
export default Books