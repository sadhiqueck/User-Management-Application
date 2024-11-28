    addEventListener('DOMContentLoaded',()=>{
   
    const currentPage = document.body.id;
    const form = document.querySelector('form');
    const username = document.getElementById("username")
    const email = document.getElementById("email")
    const password = document.getElementById("password")
    const confirmPassword = document.getElementById("confirm_password")
    const mssg = document.getElementById("mssg");
    const checkbox=document.getElementById("agreeCheckbox");

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    
   
    form.addEventListener('submit', (e) => {
    
     
        if(currentPage==="signupPage"){
          
          if (username.value.trim() == "" || email.value.trim() == "" ||password.value.trim() == "" ||confirmPassword.value.trim() == "") {
            console.log("ullil")
            mssg.textContent = "Fields cannot be blank!";
            e.preventDefault();

        } else if (!/^[a-zA-Z]+$/.test(username.value)) {
            mssg.textContent = "Enter a valid name";
            e.preventDefault();

        }  else if (!emailRegex.test(email.value)) {
            mssg.textContent = "Enter a valid email address!!";
            e.preventDefault();

        }else if (password.value !== confirmPassword.value) {
            mssg.textContent = "Passwords do not match!";
            e.preventDefault();
                 
        } else if (!checkbox.checked) {
        mssg.textContent = "You must agree with the term and conditions!";
            e.preventDefault();
         
    } else {
            mssg.textContent = ""; 
            form.submit(); 

        }
     }

    //  login page script
    else if(currentPage==="loginPage"){

        if (email.value.trim() == "" ||password.value.trim() == "") {
            mssg.textContent = "Fields cannot be blank!";
            e.preventDefault();
        } 
        else if (!emailRegex.test(email.value)) {
            mssg.textContent = "Enter a valid email address!!";
            e.preventDefault();
      
     
    } else {
            mssg.textContent = ""; 
            form.submit(); 

        }

    
    } 
 });
})



