
import AccessoriesForm from '@/pages/forms/AccessoriesForm'
import NotebookForm from '@/pages/forms/Notebook.Form'
import PhoneForm from '@/pages/forms/PhoneForm'
import Tvform from '@/pages/forms/TvForm'
import { createSlice } from '@reduxjs/toolkit'
const categories=[
    {
        key:0,
        name:"Telefon",
        models:["Iphone","Samsung","Huawei","Honor","Xiaomi","Alcatel","Realme","Nokia","Hisense","Fly","Tecno","Htc","ZTE","Casper","BlackBerry","Sony","Philips","Oppo","Hoffman","Infinix","Lg"],
    icon:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
  </svg>
  
    },
    {
        key:1,
        name:"Komputer",
        models:["Toshiba","Fijutsi","Macbook","Hp","Asus","Acer","Dell","Lg","Nexus","Samsung","Casper","Honor","Lenevo","Sony"],
        icon:"./notebook.png"
    },
    {
        key:2,
        name:"Televizor",
        models:["Toshiba","Arcelik","Shiwaki","Vestel","Zimmer","Acer","Thomson","Lg","Supra","Samsung","Supermax","Vestel","Westburg","Sony","Crystal","Corfug","Elenberg","Discovery","Daewo","Braun","Benq","Artel","Akai","Akira","Awai"],
icon:"./tv.png"
    },
    {
        key:3,
        name:"Aksessuar",
        models:["Qulaqciq","Mouse","Klavyiatura","Antiudar","Batareya","Usb","Flaskart","Adapter","Printer","Web kamera","Modem","Router","Kabro","Ekran"]
  
    },
]
const city=["Ağcabədi","Ağdam","Ağdaş","Ağstafa","Ağsu","Astara","Ağdərə","Bakı","Balakən","Beyləqan","Bərdə","Biləsuvar","Cəbrayıl","Cəlilabad","Culfa","Daşkəsən","Füzuli","Gədəbəy","Gəncə","Goranboy","Göyçay","Göygöl","Hacıqabul","Imişli","Saatlı","Kürdəmir","Kəlbəcər","Laçın","Lerik","Lənkəran","Masallı","Mingəçevir","Naftalan","Neftçala","Oğuz","Ordubad","Qax","Qazax","Qəbələ","Qobustan","Quba","Qubadlı","Qusar","Sabirabad","Səlyan","Samux","Şamaxı","Şəki","Şəmkir","Şərur","Şirvan","Siyəzən","Sumqayıt","Şuşa","Tərtər","Tovuz","Ucar","Xaçmaz","Xankəndi","Xocalı","Xocavənd","Xudat","Yardımlı","Yevlax","Zaqatala","Zəngilan","Zərdab"]

const colors=["Qara","Ağ","Qırmızı","Yaşıl","Boz","Qəhvəyi","Sarı","Narıncı","Qızılı"]

const screenSize=["51","53","56","58","61","64","66","69","71","74","76","79","81","82","84","86","89","91","94","96","99","102","104","107","109","111","114","117","119","122","124","127","130","132","137","139","142","145","147","150","152","155",""]

const components=[
    {
        id:0,
        phone:<PhoneForm/>
    },
    {
        id:1,
        phone:<NotebookForm/>
    },
    {
        id:2,
        phone:<Tvform/>
    },
    {
        id:3,
        phone:<AccessoriesForm/>
    }
]

export  const booksData = createSlice({
  name: 'counter',
  initialState:{
    list:categories,
    brands:[],
    city:city,
    colors:colors,
    screenSize:screenSize,
    components:components,
    formId:null,
   openCategory:false
  },
  reducers: {
    selectModels:(state,action)=>{
        if(action.payload.id==0){
         state.brands=categories.filter(item=>item.key==action.payload.id)
        }else if(action.payload.id==1){
            state.brands=categories.filter(item=>item.key==action.payload.id)
        }else if(action.payload.id==2){
            state.brands=categories.filter(item=>item.key==action.payload.id)
        }else if(action.payload.id==3){
            state.brands=categories.filter(item=>item.key==action.payload.id)
        }
        console.log(state.brands)
        state.formId=Number(action.payload.id)
        },
        openMenu:(state)=>{
state.menuShow=true
        },
        closeMenu:(state)=>{
            state.menuShow=false
        },
        goDarkMode:(state)=>{
          if(state.darkMode===false){
            state.darkMode=true
          }else{
            state.darkMode=false
          }
        },
        openCategory:(state)=>{
           state.openCategory= state.openCategory ? false : true
        }

  },
});

export const {selectModels,openMenu,closeMenu,goDarkMode,openCategory } = booksData.actions;

export default booksData.reducer;
