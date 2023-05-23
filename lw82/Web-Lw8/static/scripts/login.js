const showPasswordButton = document.querySelector(".form-field__show-password");
const hidePasswordButton = document.querySelector(".form-field__hide-password");

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

function Click()
{
    let email_field = document.getElementById('email_field');
        pass_field = document.getElementById('password');    
        email = email_field.value;  
        pass = pass_field.value;
        
    let email_name = "";
    let email_domen = "";
    let is_name = true;
    let is_email_valid = true;
        
    for(let i = 0; i < email.length; i++)
    {
        let ch = email[i];
        if(((ch >= 'A') && (ch <= 'Z')) || ((ch >= 'a') && (ch <= 'z')) || ((ch == "@") && is_name) || ((ch == ".") && (is_name == false)))
        {
            if(ch == "@")
            {
                is_name = false
            }
            else if(is_name)
            {
                email_name += ch;
            }
            else
            {
                email_domen += ch;
            }
        }
        else
        {
            is_email_valid = false;
        }
    }

    if((is_email_valid) && (email_name != "") && (email_domen != ""))
    {
        user.Email = email;
        user.Password = pass;
        console.log(user);
    }
    else{
        console.log('Введён некоректный Email');
    }
}
