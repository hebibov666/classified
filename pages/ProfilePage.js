import { useEffect,useState } from "react";
import { useRouter } from "next/router";
import axios from "axios"
function ProfilePage(){
    const [user,setUser]=useState()
    const [activeTab, setActiveTab] = useState('tab1');
const router=useRouter()
    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };
    useEffect(()=>{
        if(typeof window!=="undefined" && window.localStorage){
            let token=localStorage.getItem("user")
            axios.get('http://localhost:3001/login', {
                headers: {
                  Authorization: `Bearer ${token}`,
                }
              })
                .then(response => {
                  console.log(response.data);
                  setUser(response.data)
                })
                .catch(error => {
                  console.error('Kullanıcı bilgileri alınamadı', error);
                });
        }
    },[])
    const Logout=()=>{
        localStorage.removeItem("user")
        router.push("/")
    }
    return(
<div className="w-full h-full  flex flex-col">
<div className="w-full h-[50px] bg-red-600 flex items-center justify-start pl-[10px] box-border">
    <h1 className="text-white text-[20px] font-bold">Profil</h1>
</div>
<div className="flex flex-col gap-[20px] justify-between p-[10px] box-border">
    <div className="w-full bg-white  rounded-[10px] h-full flex flex-col items-center pt-[20px]">
      <div className="flex w-full pl-[20px] gap-[20px]">
      <div>
        <img src="./nouser.png" className="w-[100px] h-[100px] rounded-full"></img>
      </div>
      <div className="flex flex-col gap-[10px]">
        <h1 className="text-center font-bold">{user?.name}</h1>
        <p>{user?.email}</p>
      </div>
      </div>
     <div className="w-full">
     <div className="p-4 w-full">
      <div className="flex w-full gap-[10px]">
        <span
          onClick={() => handleTabClick('tab1')}
          className="text-black rounded-l-[10px] h-[40px] p-[10px] flex items-center"
        >
        Elanlar
        </span>
        <span
          onClick={() => handleTabClick('tab2')}
          className="text-black rounded-l-[10px] h-[40px] p-[10px] flex items-center"
        >
       Redaktə et
        </span>
        <span onClick={Logout} className="text-black rounded-l-[10px] h-[40px] p-[10px] flex items-center">Çıxış
        </span>
      </div>
    </div>
     </div>
    </div>
    <div className="bg-white rounded-[10px] w-full ">
        {activeTab === 'tab1' && <div>İçerik Tab 1</div>}
        {activeTab === 'tab2' && <div>İçerik Tab 2</div>}
        {activeTab === 'tab3' && <div>İçerik Tab 3</div>}
      </div>
</div>
</div>
    )
}
export default ProfilePage;