const showPasswordButton = document.querySelector(".form-field__show-password");
const hidePasswordButton = document.querySelector(".form-field__hide-password");
const emailInp = document.getElementById('emailField');
const passInp = document.getElementById('passField');

emailInp.addEventListener(
    "blur", 
    () => {
        if (emailInp.value === ''){
            inp.classList.add("form-field__email-invalid");
            emailReq.classList.add("form-field__email-mess-visible"); 
        }
        else {
            inp.classList.remove("form-field__email-invalid");
            emailReq.classList.remove("form-field__email-mess-visible");
        }
    }
);

passInp.addEventListener(
    "blur", 
    () => {
        if (passInp.value === ''){
            inp2.classList.add("form-field__password-invalid");
            passReq.classList.add("form-field__pass-mess-visible"); 
        }
        else {
            inp2.classList.remove("form-field__password-invalid");
            passReq.classList.remove("form-field__pass-mess-visible");
        }
    }
);


showPasswordButton.addEventListener(
    "click",
    () => {
        showPasswordButton.classList.add("form-field__show-password-replace");
        hidePasswordButton.classList.add("form-field__hide-password-replace");
        document.querySelector(".form-field__password").type = "text";
    }
)

hidePasswordButton.addEventListener(
    "click",
    () => {
        showPasswordButton.classList.remove("form-field__show-password-replace");
        hidePasswordButton.classList.remove("form-field__hide-password-replace");
        document.querySelector(".form-field__password").type = "password";
    }
)

let regEmail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
let    regPassword = /^[a-zA-Z0-9!@#$%^&*]{8,}$/;

let inp = document.getElementById('emailField');
let    inp2 = document.getElementById('passField');
let    emailReq = document.getElementById('emailReq');
let  passReq = document.getElementById('passReq');
let    warning = document.getElementById('warning');

window.addEventListener("DOMContentLoaded", (event)=> {
    event.preventDefault();
    document.getElementById('testButton').addEventListener(
        "click", 
        () => {
            var EmailisValid = true;
            var PassisValid = true;
            if (!validate(regEmail, inp.value) && (!validate(regPassword, inp2.value))) {
                warning.classList.add("form__warning-visible");
                emailReq.classList.add("form-field__email-mess-visible");
                passReq.classList.add("form-field__pass-mess-visible");
                inp.classList.add("form-field__email-invalid");
                inp2.classList.add("form-field__password-invalid");
                EmailisValid = false;
                PassisValid = false;
            }
            else {
            if (!validate(regEmail, inp.value)) {
                warning.classList.add("form__warning-visible");               
                emailReq.classList.add("form-field__email-mess-visible");
                passReq.classList.remove("form-field__pass-mess-visible");
                inp.classList.add("form-field__email-invalid");
                inp2.classList.remove("form-field__password-invalid");
                EmailisValid = false;
            }
            if (!validate(regPassword, inp2.value)) {
                warning.classList.add("form__warning-visible");                
                emailReq.classList.remove("form-field__email-mess-visible");
                passReq.classList.add("form-field__pass-mess-visible");
                inp.classList.remove("form-field__email-invalid");
                inp2.classList.add("form-field__password-invalid");
                PassisValid = false;
            }
            }
            if (EmailisValid && PassisValid){
                window.location.href = '/admin';
                warning.classList.add("form__warning");
                emailReq.classList.remove("form-field__email-mess-visible");
                passReq.classList.remove("form-field__pass-mess-visible");
                inp.classList.remove("form-field__email-invalid");
                inp2.classList.remove("form-field__password-invalid");
            }           
        });     
});


function validate(regex, inp){
    return regex.test(inp);
}
