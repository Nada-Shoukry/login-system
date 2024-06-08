// ==== signup Elements ====

var signupUsername = document.getElementById("signup-name");
var signupEmail = document.getElementById("signup-email");
var signupPassword = document.getElementById("signup-password");

var signupCheck = document.getElementById("signup-check");

var signupBtn = document.getElementById("signupBtn");

// ==== Signin Elements ====

var signinEmail = document.getElementById("signin-email");
var signinPassword = document.getElementById("signin-password");

var signinCheck = document.getElementById("signin-check");

var signinBtn = document.getElementById("signinBtn");

// ===== Welcome/Home Elements ====

var welcomeUser = document.getElementById("welcomeUser");

// ===== Validation Elements ====

var usernameAlert= document.getElementById("usernameAlert");
var emailAlert  = document.getElementById("emailAlert");
var passwordAlert = document.getElementById("passwordAlert");


// =======================(1)==========================
// ======= SignUp and Store Data in Local Storage ======

// ==== signup and store data ====

var signupInputsArray = JSON.parse(localStorage.getItem("Users")) ?? [];

// signupBtn.addEventListener("click", signUp);

function signUp(){

    validation ();

    var signupInput = {
        name : signupUsername.value,
        email: signupEmail.value,
        password: signupPassword.value
    }


    if (signupUsername.value == "" || signupEmail.value == "" || signupPassword.value == ""){
        signupCheck.innerHTML = `<span class="inputs-required bg-danger text-white p-1">All inputs are required</span>`
    }


    else if (signupInputsArray.length == 0){

        signupInputsArray.push (signupInput);
        localStorage.setItem("Users" , JSON.stringify(signupInputsArray));
        signupCheck.innerHTML = `<span class="signup-success bg-success text-white p-1">Success</span>`;
        window.location = "./index.html";

    }

    else if (emailExist() == false){
        signupCheck.innerHTML = `<span class="inputs-required bg-warning text-white p-1">This Email already Exist, Please Sign-in!</span>`
    }

    else {

        signupInputsArray.push(signupInput);
        localStorage.setItem("Users", JSON.stringify(signupInputsArray));
        signupCheck.innerHTML = `<span class="signup-success bg-success text-white p-1">Success</span>`;
        window.location = "./index.html";
    }
}


// ==== Function if email is already exist ====

function emailExist(){
    for (var i=0; i < signupInputsArray.length; i++ ){
        if (signupEmail.value == signupInputsArray[i].email){
            return false;
        }
    }
}

// console.log (signupInputsArray);


// =======================(2)===========================
// ==================== Sign in =====================

// signinBtn.addEventListener ("click", signIn);


function signIn(){

    var signinInput = {
        email: signinEmail.value,
        password : signinPassword.value 
    }

    if (signinEmail.value == "" || signinPassword.value == ""){
        signinCheck.innerHTML = `<span class="inputs-required bg-danger text-white p-1">All inputs are required</span>`
    } 

    else {
        for (var i=0; i< signupInputsArray.length; i++){
            if(signinInput.email == signupInputsArray[i].email && signinInput.password == signupInputsArray[i].password){

                localStorage.setItem("currentUsername", signupInputsArray[i].name);
                window.location = "./home.html";
    
            }

            else {
                signinCheck.innerHTML = `
                <span class="inputs-required bg-danger text-white p-1">Incorrect Email or Password</span>
                ` ;
            }
        }   
    }       
}

// =======================(3)=======================
// ================ Welcome / Home =================

var username = localStorage.getItem("currentUsername");

if (username){
    welcomeUser.innerHTML = "Welcome " + username + " :)";
}


// ===== API =====

var row = document.getElementById("row");

var products = [];

var httpReq = new XMLHttpRequest ();


httpReq.open("get", "https://ecommerce.routemisr.com/api/v1/products");

httpReq.send();

httpReq.addEventListener("readystatechange", function(){
    if(httpReq.readyState == 4){
        products = JSON.parse(httpReq.response).data;
    }

    var box = "";
    for (var i=0; i < products.length; i ++){
        box += `
        <div class="col-md-4 g-4">
            <div class="bg-white rounded-3 h-100 p-3">
              <img src="${products[i].imageCover}" alt="product pic" class="w-100">
              <h3 class="my-2">${products[i].title}</h3>
              <p>${products[i].price} EGP</p>
            </div>
          </div>
        `;
    }

    row.innerHTML = box;
})


// =======================(4)======================
// ================ Log Out Function ==============

function logout(){
    window.location = "./index.html";
}

// ======================(5)======================
// ================= Validation ==================

function validation(){
    if (/^[a-zA-Z0-9$_]{3,}$/.test(signupUsername.value)){
        // console.log("Valid");
        usernameAlert.classList.add("d-none");
    } else {
        usernameAlert.classList.remove("d-none");
    }

    if (/^[\w_\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(signupEmail.value)){
        emailAlert.classList.add("d-none");
    } else {
        emailAlert.classList.remove("d-none");
    }

    if (/^(?=.*[A-Z])(?=.*[\w_])(?=.*\d).*$/.test(signupPassword.value)){
        passwordAlert.classList.add("d-none");
    } else {
        passwordAlert.classList.remove("d-none");
    }
}

