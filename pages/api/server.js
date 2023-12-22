const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const bodyParser=require("body-parser");
const app=express();
const DataUrl='mongodb+srv://asuslap503:<password>@cluster0.vnro9yz.mongodb.net/'
app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }));
mongoose.connect(DataUrl,{
    dbName:'Classifieds',
    user:'asuslap503',
    pass:'hebibov6661234',
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log("Mongodb connected");
})
const ProductRoute=require("./Routes/Product.route");
const UserRoute=require("./Routes/User.route")
const LoginRoute=require("./Routes/User.login")
const FavoriteProducts=require("./Routes/FavoriteProducts")
const SearchProduct=require("./Routes/SearchProduct")
const AdvancedSearch=require("./Routes/AdvancedSearch");
const MyAds= require("./Routes/MyAds")
const getOwner=require("./Routes/GetOwner")
app.use("/products",ProductRoute)
app.use("/users",UserRoute)
app.use("/login",LoginRoute)
app.use("/favori",FavoriteProducts)
app.use("/search",SearchProduct)
app.use("/advancedsearch",AdvancedSearch)
app.use("/myposts",MyAds)
app.use("/getOwner",getOwner)
app.use((req,res,next)=>{
   const err=new Error("Not found");
   err.status=404
})

app.listen(3001,()=>{
    console.log("Server basladi");
})