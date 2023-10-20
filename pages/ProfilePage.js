import { useEffect,useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "@/redux/slices/userSlice";
import axios from "axios"
import MyPosts from "./components/MyPosts";
import EditProfile from "./components/EditProfile";
import { deleteUser } from "@/redux/slices/userSlice";
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
<div className="w-full h-[50px] bg-red-600 flex items-center justify-start pl-[10px] box-border">
    <h1 className="text-white text-[20px] font-bold">Profil</h1>
</div>
<div className="flex flex-col gap-[20px] justify-between p-[10px] box-border">
    <div className="w-full bg-white  rounded-[10px] h-full flex flex-col items-center pt-[20px]">

      <div>
        <img src="./nouser.png" className="w-[100px] h-[100px] rounded-full"></img>
      </div>
      <div className="flex flex-col gap-[10px]">
        <h1 className="text-center font-bold">{user?.name}</h1>
        <p>{user?.email}</p>
      </div>
     
     <div className="w-full">
     <div className="p-4 w-full">
      <div className="flex w-full gap-[10px]">
        <span
          onClick={() => handleTabClick('tab1')}
          className="cursor-pointer text-black rounded-l-[10px] h-[40px] p-[10px] flex items-center"
        >
        Elanlar
        </span>
        <span
          onClick={() => handleTabClick('tab2')}
          className="cursor-pointer text-black rounded-l-[10px] h-[40px] p-[10px] flex items-center"
        >
       Redaktə et
        </span>
        <span onClick={Logout} className="cursor-pointer text-black rounded-l-[10px] h-[40px] p-[10px] flex items-center">Çıxış
        </span>
        <span
          onClick={deleteUser}
          className="cursor-pointer text-red-600 rounded-l-[10px] h-[40px] p-[10px] flex items-center"
        >
       Hesabı sil
        </span>
      </div>
    </div>
     </div>
    </div>
    <div className="bg-white rounded-[10px] w-full ">
        {activeTab === 'tab1' && <div><MyPosts/></div>}
        {activeTab === 'tab2' && <div><EditProfile/></div>}
        {activeTab === 'tab3' && <div>İçerik Tab 3</div>}
      </div>
</div>
</div>
    )
}
export default ProfilePage;