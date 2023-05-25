// Show/hide password onClick of button using Javascript only
function show() {
    let p = document.getElementById('password');
    p.setAttribute('type', 'text');
    let pReg = document.getElementById('passwordReg');
    pReg.setAttribute('type', 'text');
}
function hide() {
    let p = document.getElementById('password');
    p.setAttribute('type', 'password');
    let pReg = document.getElementById('passwordReg');
    pReg.setAttribute('type', 'password');
}




document.getElementById("eye").addEventListener("click", showOrHide);
document.getElementById("eyeReg").addEventListener("click", showOrHide);

let pwShown = 0;
function showOrHide() {
    if (pwShown == 0) {
        pwShown = 1;
        show();
    } else {
        pwShown = 0;
        hide();
    }
}
// ------Check validation & login acount------
let uname = document.querySelector('#username');
let upass = document.querySelector('#password');
let login = document.querySelector('#login');
let newObj;

login.onclick = function () {
    newObj = {
        "user_name": uname.value,
        "user_pass": upass.value
    }
    getDataUser();
}

function getDataUser() {
    fetch("userData.json")
        .then((response) => response.json())
        .then((data) => {
            let validation = 0;
            //loop if check data is valid
            for (let i = 0; i < data.length; i++) {
                if (newObj.user_name === data[i].user_name && newObj.user_pass === data[i].user_pass) {
                    validation = 1;
                }
            }
            if (validation === 1) {
                // console.log("welcome")
                window.open("Home.html", "_self");
                return validation = 0;
            } else {
                console.log("error")
            }
        })
}








//-----Show & hiden form----
let regsterBtnReg = document.querySelector('#register');
let loginBtnReg = document.querySelector('#login-reg');
let regsterForm = document.querySelector('.form.register');
let loginForm = document.querySelector('.form.login');

regsterBtnReg.addEventListener("click", () => {
    loginForm.style.left = '20%';
    loginForm.style.display = 'none';
    regsterForm.style.left = '50%';
    regsterForm.style.display = 'block';
});

loginBtnReg.addEventListener("click", () => {
    loginForm.style.left = '50%';
    loginForm.style.display = 'block';
    regsterForm.style.left = '20%';
    regsterForm.style.display = 'none';
});