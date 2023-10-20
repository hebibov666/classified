import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useEffect,useState } from 'react';
import { useSelector,useDispatch} from 'react-redux';
import { useRouter } from 'next/router';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios"
function MyPosts(){
    const [posts,setPosts]=useState([])
    const [empty,setEmpty]=useState(false)
    const [modal,setModal]=useState(false)
    const userId=useSelector(state=>state.user.user)
    const router=useRouter()
    useEffect(()=>{
        axios.get(`http://localhost:3001/products/${userId?._id}`) 
        .then((response) => {
          setPosts(response.data)
        })
        .catch((error) => {
          console.error('Ilanlar getirilemedi: ', error);
        });
        setEmpty(false)
    },[empty])

const showModal=()=>{
    setModal(true)
}
    const removePost=(id)=>{
        axios.delete(`http://localhost:3001/products/${id}`) 
        .then((response) => {
        setEmpty(true)
        })
        .catch((error) => {
          console.error('Ilanlar getirilemedi: ', error);
        });
    }
    return(
        <div className='pb-[50px]'>
{posts.length !=0 ? posts.map(post=>{
    return <div className="grid p-2 max-[480px]:gap-[5px] basis-[100%] grid-cols-3 max-[480px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
    <div className="w-full relative bg-white h-[250px] pb-[5px] max-[632px]:w-1/1 sm:w-1/1 md:w-1/1 lg:w-1/1 xl:w-1/1 rounded-[7px]">
    <DeleteIcon onClick={showModal} fontSize="large" className="absolute p-[4px] text-black bg-white rounded-[50%] top-2 right-2"></DeleteIcon>
    <div className="flex justify-center h-[150px] w-full">
    <img className="rounded-t-[7px] h-full w-full" src=""></img>
    </div>
    <div className="flex flex-col  pl-2  gap-[5px]">
        <h1 className="text-black text-[21px] font-bold">{post.name}</h1>
        <p className="text-[18px] h-[30px] w-[90%] overflow-ellipsis overflow-hidden">Description</p>
        <p className="text-[12px] text-[grey] ">{post.price}</p>
    </div>
        </div>
        {modal===true ? <div className='fixed z-[1000000] w-full h-full top-0 left-0 bg-[#00000071] flex items-center justify-center'>
        <div class="w-[250px] flex flex-col rounded-[5px] justify-between h-[140px] bg-white shadow-lg  p-4">
 <h1 className='pl-[5px] pt-[10px]'>Elanı silməyi təsdiq edirsiniz?</h1>
<div className='w-full flex gap-[10px] justify-center'>
<button onClick={()=>{removePost(post._id)}} className='bg-green-600 text-white p-[5px] w-[90px]'>Bəli</button>
 <button onClick={()=>{setModal(false)}} className='bg-red-600 text-white p-[5px] w-[90px]'>Xeyr</button>
    </div>
</div>
        </div>: null}
        </div>
}) : <div className='w-full h-full flex flex-col gap-[20px]  pt-[30px] items-center justify-center'>
    <h1 className='text-center'>Heçbir elan əlavə etməmisiniz!</h1>
    <button onClick={()=>{router.push("/newpost")}} className='bg-red-600 rounded-[10px] w-[200px] text-white font-bold flex items-center justify-center p-[5px]'>
        Əlavə et
    </button>
    </div>}
   
</div>
    )
}
export default MyPosts