const userSchema = require('../models/userModel');
const bcrypt=require('bcrypt')
const salt=10;

const registerUser = async (req, res) => {

    
    try {
       
        const { username, email, password } = req.body;
        const user = await userSchema.findOne({ email });

        if (user) {
            
            return res.render("user/signup", {mssg: "User already exists!" });
        }
        const hashedPassword=await bcrypt.hash(password,salt);

        

        const newUser = new userSchema({ username, email, password:hashedPassword });
        await newUser.save()
        res.render('user/login',{smssg: "Account created succesfully" }) ;
 
        

    } catch (error) {
        console.log(error);
        res.render('user/signup',{mssg: "An error occurred, please try again." });
    }
}

const login = async (req, res) => {
    
    try {

        const { email,password } = req.body;

        const user = await userSchema.findOne({ email })
        
      
        if (!user)  return res.render('user/login', {mssg:"User not Found!,Please signup" })

        // checking hashed pasword
        const isMatch= await bcrypt.compare(password,user.password);
        console.log(isMatch)
       
        if (isMatch) {
            req.session.user=true;
            return res.render('user/home',{name:user.username})
        } else {
            return res.render('user/login', {mssg:"Incorrect password!,try again" })
        }

    } catch (error) {
        console.log(error);
        res.render('user/login', {mssg: "An error occurred, please try again." });
        
    }
}



module.exports = { registerUser,login}
