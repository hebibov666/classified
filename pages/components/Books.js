import Card from "./Card";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { products } from "@/redux/slices/products";
import CircularUnderLoad from "./Progress";
import axios from 'axios';
import { getUser } from "@/redux/slices/userSlice";
function Books({ category,text }) {
  const dispatch = useDispatch();
  const [data,setData]=useState()
  const [loading,setLoading]=useState(true)
  const [page, setPage] = useState(1);
  const [error,setError]=useState(false)
  const favorites=useSelector(state=>state.user.favorites)
  
 useEffect(()=>{
  dispatch(getUser())
 },[data])

const getData=async()=>{
try{
  const response=await axios.get(`https://weblisting.onrender.com/products/products/${category}?page=${page}`)
 if(page===1){
 setData(response.data)
 }else{
  setData([...data,...response.data])
 }
 
 setLoading(false)
 setError(false)
}catch{
  console.log("Xeta")
  setLoading(false)
  setError(true)
}

}

  useEffect(() => {
   getData()
  },[category,page]);

  useEffect(() => {
    setPage(1);
    console.log(data,page);
  },[category]);
const ChangePage=()=>{
  setPage(page+1)
}

 return (
    <div className={`bg-[#EBEDF3] min-[900px]:bg-white min-[900px]:mt-[12px]  books mx-auto pb-[40px] h-full flex flex-col w-full basis-[100%] max-[1015px]:border-[#E8E8E8] `}>
     <div className="flex">
     <h1 className="roboto flex items-center gap-[5px] mt-2 pl-2 text-xl title max-[450px]:text-[17px] text-black-600">{category}</h1>
     <h1>{text}</h1>
     </div>
      {data?.length <= 0 && error === false ?
        <p className="w-full flex items-start justify-center pt-[100px]  h-full">Bu kategoriyada elan yoxdur</p> :
        <div className="grid p-2 max-[480px]:gap-[5px] pb-[50px] basis-[100%] grid-cols-3 max-[480px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
   
          {data?.map(product => (
            <Card  favorites={favorites} key={product._id} title={product.name} city={product.city} date={product.date} vip={product.isVip} image={product.image[0]} id={product._id} price={product.price} />
          ))}
        </div>
      }
    {loading && <div  className="w-full  h-full gap-[15px]  flex items-start justify-center">
            <CircularUnderLoad />
          </div>}
    {data?.length <= 0 || loading===true || error===true ? null : <div className="flex pb-[100px] justify-center">  <button onClick={ChangePage} className="w-[300px] bg-red-600 rounded-[7px] flex items-center justify-center h-[40px] text-white p-[5px]">Daha çox</button></div>}
      {error !== false ? <p className="w-full h-full flex items-start text-center justify-center">Xəta!<br /> Yenidən cəhd edin</p> : null}
    </div>
  );
}

export default Books;
