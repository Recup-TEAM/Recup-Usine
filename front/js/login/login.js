//je pleure en voyant ce js aled
//faudra faire les verifs de mail et hash de pswd ici

const formLogin = document.getElementById("formLogin");
const formRegister = document.getElementById("formRegister");
const email = document.getElementById("emailLogin");
const password = document.getElementById("passwordLogin");

const register = document.getElementById("register");
const login = document.getElementById("login");


const emailRegister = document.getElementById("emailRegister");
const passwordRegister = document.getElementById("passwordRegister");

let join = false;

formLogin.addEventListener("submit", (event) => {
    event.preventDefault();
    logger.login(email.value, password.value);
});

formRegister.addEventListener("submit", (event) => {
    event.preventDefault();
    logger.sign_up(emailRegister.value, passwordRegister.value);
});

register.addEventListener("click", () => {
    formLogin.style.display = "none";
    formRegister.style.display = "flex";
});

login.addEventListener("click", () => {
    formLogin.style.display = "flex";
    formRegister.style.display = "none";
});
