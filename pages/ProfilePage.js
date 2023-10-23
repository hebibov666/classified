import { useEffect,useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "@/redux/slices/userSlice";
import axios from "axios"
import MyPosts from "./components/MyPosts";
import EditProfile from "./components/EditProfile";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { deleteUser } from "@/redux/slices/userSlice";
import { Loading } from 'react-loading-dot'
function ProfilePage(){
    const [activeTab, setActiveTab] = useState('tab1');
    const user=useSelector(state=>state.user.user)
    const dispatch=useDispatch()
const router=useRouter()
    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };
    useEffect(()=>{
        dispatch(getUser())
    },[])
 
    const Logout=()=>{
        localStorage.removeItem("user")
        router.push("/")
    }
    const deleteUser=()=>{
      axios.delete(`https://finalproject-etqp.onrender.com/login/${user?._id}`) 
      .then((response) => {
        localStorage.removeItem("user")
        router.push("/")
    })
      .catch((error) => {
        console.error('Xəta: ', error);
      });
}

    return(
<div className="w-full h-full  flex flex-col">
<div className="w-full h-[50px] bg-blue-600 flex items-center gap-[20px] justify-start pl-[10px] box-border">
    <ArrowBackIcon onClick={()=>{router.push("/")}} className="font-bold text-white"></ArrowBackIcon>
    <h1 className="text-white text-[20px] font-bold">Profil</h1>
</div>
{user!==null ? <div className="flex flex-col gap-[20px] justify-between p-[10px] box-border">
    <div className="w-full bg-white  rounded-[10px] h-full flex flex-col items-center pt-[20px]">

      <div>
        <img src="./nouser.png" className="w-[100px] h-[100px] rounded-full"></img>
      </div>
      <div className="flex flex-col gap-[10px]">
        <h1 className="text-center font-bold">{user?.name}</h1>
        <p>{user?.email}</p>
      </div>
     
     
      <div className="flex pt-[10px] justify-start w-full gap-[10px] pb-[5px]">
       <ul className="w-full pl-[10px] noscroll flex gap-[10px] overflow-x-scroll overflow-y-hidden shrink-0">
       <li
          onClick={() => handleTabClick('tab1')}
          className="cursor-pointer border-[1px]  text-black rounded-[10px] h-[40px] p-[10px] flex items-center"
        >
        Elanlar
        </li>
        <li
          onClick={() => handleTabClick('tab2')}
          className="cursor-pointer border-[1px] w-auto shrink-0 text-black rounded-[10px] h-[40px] p-[10px] flex items-center"
        >
       Redaktə et
        </li>
        <li onClick={Logout} className="cursor-pointer border-[1px] text-black rounded-[10px] h-[40px] p-[10px] flex items-center">Çıxış
        </li>
        <li
          onClick={deleteUser}
          className="cursor-pointer border-[1px] shrink-0 text-red-600 rounded-[10px] h-[40px] p-[10px] flex items-center"
        >
       Hesabı sil
        </li>
       </ul>
      </div>
   
    </div>
    <div className="bg-white rounded-[10px] w-full ">
        {activeTab === 'tab1' && <div><MyPosts/></div>}
        {activeTab === 'tab2' && <div><EditProfile/></div>}
        {activeTab === 'tab3' && <div>İçerik Tab 3</div>}
      </div>
</div> : <div className="w-full h-[100vh] flex items-center justify-center">
  <Loading/>
  </div>}
</div>
    )
}
export default ProfilePage;