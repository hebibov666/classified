import Card from "./Card"
import Header from "./Header"

function Books(){
    return(
<div className={`mx-auto w-full p-4 basis-[80%]  max-[1015px]:border-t-[4px] max-[1015px]:border-[#E8E8E8]  max-[1015px]:basis-[100%] min-[1012px]:pt-[40px]`}>
  <div className="grid basis-[80%] max-[1015px]:basis-[100%] grid-cols-3 max-[480px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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