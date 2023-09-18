
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
    },
    {
        key:1,
        name:"Komputer",
        models:["Toshiba","Fijutsi","Macbook","Hp","Asus","Acer","Dell","Lg","Nexus","Samsung","Casper","Honor","Lenevo","Sony"],
      
    },
    {
        key:2,
        name:"Televizor",
        models:["Toshiba","Arcelik","Shiwaki","Vestel","Zimmer","Acer","Thomson","Lg","Supra","Samsung","Supermax","Vestel","Westburg","Sony","Crystal","Corfug","Elenberg","Discovery","Daewo","Braun","Benq","Artel","Akai","Akira","Awai"],

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
    formId:null
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
        }

  },
});

export const {selectModels } = booksData.actions;

export default booksData.reducer;
