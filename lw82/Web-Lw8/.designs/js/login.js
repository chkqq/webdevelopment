function validation(form)
{
    function validateEmailFully(input, text)
    {
        var dog = text.indexOf("@");
        var point = text.indexOf(".");
        var currLength = arr.length;
        var minLength = 6;
        
        
        if (txt == "") 
        {
            disableError(input);
            enableError(input, "Введен пустой адрес эл. почты");
            return false
        }
        
        if (currLength <= minLength)
        {
            disableError(input);
            enableError(input, "Vинимальный размер адреса эл. почты – 6 символов");
            return false
        }
        else
        {
            if (point == -1) 
            {
                disableError(input);
                enableError(input, "Отсутствует символ .");
                return false
            }

            if (dog == -1) 
            {
                disableError(input);
                enableError(input, "Отсутствует символ @");
                return false
            }

            if (text.indexOf(",")>=0 || text.indexOf(";")>=0 || text.indexOf(" ")>=0)
            {
                disableError(input);
                enableError(input, "В адресе эл.почты не может быть запятых,точек с запятой и пробелов.");
                return false
            }

            if (dog>point)
            {
                disableError(input);
                enableError(input, "Cправа от символа «@» должна быть, как минимум, одна точка");
                return false
            }

            if ((point-dog)==1 )  
            {
                disableError(input);
                enableError(input, "Между символом «@» и следующей за ним точкой должен быть, как минимум, один символ.");
                return false
            }

            if ((dog<1)) 
            {
                disableError(input);
                enableError(input, "Слева от символа @, должен быть как минимум 1 символ.");
                return false
            }
              //5
            if (!(point < txt.length - 2)) 
            {
                disableError(input);
                enableError(input, "Справа от последней точки должно быть, как минимум, 2 символа.");
                return false
            }
        }

        return true;
    }

    function validatePassword(input)
    {
        var value = input.value;
        var result = true;

        if (value == "")
        {
            result = false;
            removeError(input);
            createError(input, input.name + " is required.");
        }


        return result;
    }

    function validateEmail(input) 
    {
        const emailRegexp = new RegExp(
        /^[a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1}([a-zA-Z0-9][\-_\.\+\!\#\$\%\&\'\*\/\=\?\^\`\{\|]{0,1})*[a-zA-Z0-9]@[a-zA-Z0-9][-\.]{0,1}([a-zA-Z][-\.]{0,1})*[a-zA-Z0-9]\.[a-zA-Z0-9]{1,}([\.\-]{0,1}[a-zA-Z]){0,}[a-zA-Z0-9]{0,}$/i
        )

        var value = input.value;
        var result = true;

        if (!emailRegexp.test(value))
        {
            result = false;
            removeError(input);
            createError(input, "Incorrect email format. Correct format is ****@**.***");
        }

        if (value == "")
        {
            result = false;
            removeError(input);
            createError(input, input.name + " is required.");
        }

        return result;
    }

    function createError(input, text)
    {
        const parent = input.parentNode;
        const errorLabel = document.createElement('div');

        errorLabel.classList.add('auth-form__input-description');
        errorLabel.textContent = text;

        parent.classList.add('error');
        parent.appendChild(errorLabel);
    }

    function removeError(input)
    {
        var parent = input.parentNode;
        
        
        if (parent.classList.contains('error'))
        {   
            parent.querySelector('.auth-form__input-description').remove();
            parent.classList.remove('error');
        }
    }

    let result = true;
    let correctEmail = "sanic@yandex.ru";
    let correctPass = "root";
    
    const allInputs = document.querySelectorAll('.auth-form__field-text');
    for (const input of allInputs)
    {
        if (input.name == "Email")
        {
            if (validateEmail(input))
            {
                if (input.value != correctEmail)
                {
                    createWarning("critical", "Email or password is incorrect.");
                    result = false;
                }
            }
            else {
                createWarning("critical", "A-Ah! Check all fields.");
                result = false;
            }
        }
        
        if (input.name == "Password")
        {
            if (validatePassword(input))
            {
                if (input.value != correctPass)
                {
                    createWarning("critical", "Email or password is incorrect.");
                    result = false;
                }
            }
            else {
                createWarning("critical", "A-Ah! Check all fields.");
                result = false;
            }
        }
    }
    return result;
}

function createWarning(warningType, warningText)
{
    var warning = document.querySelector('.auth-form__warning');
    warning.classList.remove('auth-form__warning--hidden');
    
    switch(warningType)
    {
        case "success":
            warning.classList.add('auth-form__warning--success');
            warning.classList.remove('auth-form__warning--critical');
            warning.querySelector('.auth-form__warning-text').textContent = warningText;
            break;
        
        case "critical":
            warning.classList.add('auth-form__warning--critical');
            warning.classList.remove('auth-form__warning--success');
            warning.querySelector('.auth-form__warning-text').textContent = warningText;
            break;
        
        default:
            warning.classList.remove('auth-form__warning--critical');
            warning.classList.remove('auth-form__warning--success');
            warning.querySelector('.auth-form__warning-text').textContent = warningText;
            break;
    }
}


function removeWarning()
{
    document.querySelector('.auth-form__warning').classList.add('auth-form__warning--hidden');
}


document.getElementById('auth-form').addEventListener('submit', function(event) 
    {
        event.preventDefault();
        if (validation(this))
        {
            removeWarning();
            createWarning("success", "All is GOOD")
            console.log("do smth");
        }
    }
)