

const form = document.querySelector('form');
const email = document.getElementById("email")
const password = document.getElementById("password")
let mssg = document.getElementById("mssg");


const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/


form.addEventListener('submit', (e) => {

    
    if (email.value.trim() === "" || password.value.trim() === "") {
        mssg.textContent = "Fields cannot be blank!";
        e.preventDefault();
    }
    else if (!emailRegex.test(email.value)) {
        mssg.textContent = "Enter a valid email address!!";
        e.preventDefault();


    } else {
        mssg.textContent = "";

    }



});
