const express=require("express");
const router=express.Router();
const {login,loadDashboard,editUser,addUser,deleteUser}=require("../controllers/adminController")
const {authSession,isLogin}=require("../middlewares/adminAuth.js")


router.get('/login',isLogin, async(req,res)=>{
    res.render('admin/login')
})

router.get("/dashboard",authSession,loadDashboard)

router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.render('admin/login',{smssg:"Loggedout Succesfully"})
});





router.post('/login',login)

router.post('/logout')

router.post('/edit-user',authSession,editUser)

router.post('/add-user',authSession,addUser)

router.get('/delete-user/:id',authSession,deleteUser)

module.exports=router