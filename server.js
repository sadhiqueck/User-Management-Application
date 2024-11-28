const express=require('express');
const app=express();
const path = require('path');
const mongoose=require('mongoose')
const userRoutes=require("./routes/userRoute")
const adminRoutes=require("./routes/adminRoute");
const connectDb=require('./config/db');
const session=require('express-session')
const nocache =require('nocache')

app.use(nocache())

app.use(session({
    secret:"mySecret",
    resave:false,
    saveUninitialized:true,
   cookie:{
        maxAge:1000*60*60*24
}}))

// setting static file & EJS view Engine
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname,'public')))
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// ROutes
app.use('/',userRoutes)
app.use('/admin',adminRoutes)




// Database
connectDb()

app.listen(process.env.PORT||3000);