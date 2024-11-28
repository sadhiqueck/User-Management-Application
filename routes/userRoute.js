const express=require('express');
const router=express.Router();
const userController=require("../controllers/userController")
const {authSession,isLogin}=require("../middlewares/auth.js")

router.get("/login",isLogin,(req,res)=>{
    const smssg= req.query.mssg
    
    res.render('user/login',{smssg})
});

router.get("/register",isLogin,(req,res)=>{
    res.render('user/signup')
     
});

router.get("/home",authSession,(req,res)=>{
    res.render('user/home')
});
router.post("/logout",authSession,(req,res)=>{
    req.session.destroy();
    res.redirect('/login?mssg="Logged out Succesfully"')
});



const validateRegisterInput = (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.render('user/signup', { mssg: "All fields are required!"});
    }
    next();
};

router.post("/register", validateRegisterInput, userController.registerUser);

router.post("/login",userController.login);


module.exports=router