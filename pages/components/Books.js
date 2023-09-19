import Card from "./Card"
import Header from "./Header"
import SelectCategory from "./SelectCategory"

function Books(){
    return(
<div className={`mx-auto w-full basis-[80%] max-[1015px]:border-[#E8E8E8]  max-[1015px]:basis-[100%] min-[1012px]:pt-[40px]`}>
 <SelectCategory/>
  <div className="grid p-2 pt-[-20px] basis-[80%] max-[1015px]:basis-[100%] grid-cols-3 max-[480px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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