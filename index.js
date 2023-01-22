const express= require('express')
const dotenv=require('dotenv')
const mongoose=require('mongoose')
const authRoute=require('./routes/auth')
const userRoute=require('./routes/users')
const categoryRoute=require('./routes/categories')
const postRoute=require('./routes/posts')


dotenv.config()

const app=express()

app.use(express.json())


mongoose.set('strictQuery',false)

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,

}).then(console.log("connected to mongoDb")).catch(err=>console.log(err))




app.use('/api/auth',authRoute)
app.use('/api/user',userRoute)
app.use('/api/category',categoryRoute)
app.use('/api/post',postRoute)


app.listen("5000",()=>{
    console.log("server is running");
})