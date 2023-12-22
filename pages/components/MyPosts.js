import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import DeleteIcon from '@mui/icons-material/Delete';
import { RemovePost } from '@/redux/slices/userSlice';
import Link from 'next/link';
import { getUser } from '@/redux/slices/userSlice';
import axios from "axios"
import moment from 'moment';
function MyPosts({userId}) {
    const [posts, setPosts] = useState([])
    const [modal, setModal] = useState(false)
    const dispatch = useDispatch()
const userid=userId
    const getData=async()=>{
        try{
          const response=await axios.get(`https://listingwebsite.onrender.com/myposts/${userid}`)
        setPosts(response.data)
        }catch(err){
        console.log(err)
        }
        
        }


useEffect(()=>{
getData()
},[])
    const showModal = () => {
        setModal(true)
    }
    const handleRemove = async (id) => {
        dispatch(RemovePost(id)).then(() => {
            const updatedPosts = posts.filter(post => post._id !== id);
            setPosts(updatedPosts);
            setModal(false)
        })
    }
    const Mymoment=(date)=>{
        if(moment(date).format("DD")==moment().format("DD")){
          return "Bugün, " +  moment(date).format("HH:mm")
        }else if(moment().format("DD")-1==moment(date).format("DD")){
          return "Dünən " +  moment(date).format("HH:mm")
        }else{
          return moment(date).format('HH:mm')
        }
      }
    return (
        <div className='w-full'>
            {posts && posts.length != 0 ? 
            <div className='pb-[50px] grid p-2 max-[480px]:gap-[5px] basis-[100%] grid-cols-3 max-[480px]:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
            {posts.map(post => {
                return <div  className="w-full card flex gap-[10px]  flex-col items-center relative min-[644px]:h-[300px] min-[644px]:gap-[35px] bg-white h-[250px] lg:pb-[10px] pb-[5px] min-[640px]:h-[270px] max-[632px]:w-1/1 sm:w-1/1 md:w-1/1 lg:w-1/1 xl:w-1/1 rounded-[7px]">
                        <DeleteIcon onClick={()=>{handleRemove(post._id)}} fontSize="large" className="absolute p-[20px] z-[10000] rounded-[50%] top-[-15px] w-[70px] h-[70px] text-grey-600 right-[-18px]"></DeleteIcon>
                        <Link href={`/detail/${post._id}`} className="w-full flex gap-[10px]  flex-col items-center relative min-[644px]:h-[300px] min-[644px]:gap-[35px] bg-white h-[250px] lg:pb-[10px] pb-[5px] min-[640px]:h-[270px] max-[632px]:w-1/1 sm:w-1/1 md:w-1/1 lg:w-1/1 xl:w-1/1 rounded-[7px]">
                        <div className="flex w-full justify-center w-full h-[170px]">
                            <img className="rounded-t-[7px] w-full h-[150px]  min-[644px]:h-[200px] lg:h-[180px]  object-cover" src={`https://res.cloudinary.com/dohj3wr2c/image/upload/${post.image[0]}`}></img>
                        </div>
                        <div className="flex flex-col w-full justify-start  pl-2  gap-[5px]">
                            <h1 className="text-black text-[21px] font-bold">{post.price}</h1>
                            <p className="text-[18px] h-[30px] w-[90%] overflow-ellipsis overflow-hidden">{post.name}</p>
                            <p className="text-[12px] text-[grey] ">{Mymoment(post.date)}</p>
                        </div>
                        </Link>
                    </div> })}</div> : <div className='w-full h-[100px] flex flex-col gap-[20px]  pt-[30px] items-center justify-center'>
                <h1 className='text-center'>Heçbir elan əlavə etməmisiniz!</h1>
            </div>}
        </div>
    )
}
export default MyPosts