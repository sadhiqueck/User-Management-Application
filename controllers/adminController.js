const adminModel=require("../models/adminModel");
const bcrypt=require('bcrypt')
const  userModel=require('../models/userModel')

const login=async (req,res)=>{


  
    try {
    const {email,password}=req.body;
  
    const admin= await adminModel.findOne({email});
   
    if(!admin) return res.render('admin/login',{mssg:"Invalid Credentials!"})
    
    const isMatch= await bcrypt.compare(password,admin.password)
    

    if(!isMatch) return res.render('admin/login',{mssg:"Invalid Password!,Try again"})
    
        req.session.admin=true;
        res.redirect('/admin/dashboard')

    } catch (error) {
      
        console.log(error);
        res.render('admin/login', {mssg: "An error occurred, please try again." });
    }

}

const loadDashboard= async(req,res)=>{
    try {
        
        if(req.session.admin){
            const users= await userModel.find({})
            res.render("admin/dashboard",{users})
        }
        else{
            return res.redirect('/admin/login')
        }
        
    } catch (error) {
        console.log(error);
        res.render('admin/login', {mssg: "An error occurred, please try again." });
    }
}

const editUser= async(req,res)=>{
    try {

        const{email,password,id}=req.body;
        
        const hashedPassword= await bcrypt.hash(password,10)
        
        const user= await userModel.findOneAndUpdate({_id:id},{$set:{email,password:hashedPassword}})
       res.redirect('/admin/dashboard')
        
    } catch (error) {
        
        console.log(error);
    }
}

const addUser= async(req,res)=>{
    try {
    const{username,email,password,id}=req.body;
    
    const hashedPassword= await bcrypt.hash(password,10)
    const newUser= new userModel({
        username,
        email,
        password:hashedPassword
    })
    
    await newUser.save()
    res.redirect('/admin/dashboard')

    } catch (error) {
        
        console.log(error);
        
    }
}


const deleteUser= async(req,res)=>{
    try {

        const {id}=req.params;
        const user= await userModel.findOneAndDelete({_id:id})
        res.redirect('/admin/dashboard')
    } catch (error) {
        
        console.log(error);
        
    }
}
module.exports={login,loadDashboard,editUser,addUser,deleteUser}


