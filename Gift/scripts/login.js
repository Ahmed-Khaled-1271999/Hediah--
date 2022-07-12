logi_AllUsers = JSON.parse(localStorage.getItem("USERS")) || [];
// console.log(logi_AllUsers);
let cancelMessageLayer=document.querySelector(".cancel-message-layer");
let E_mail=document.querySelector("#email");
let Password=document.querySelector("#Password");
let unregisteredMessage=document.querySelector(".unregistered-message");
let Login=document.querySelector("#login");
let tablue=document.querySelector(".form-tablue");

Login.addEventListener('click', signIn);
cancelMessageLayer.addEventListener("click", hideMessage);
function signIn(){
    let enteredEmail   =E_mail.value.trim();
    let enteredPassword=Password.value;
    let authentication1=logi_AllUsers.find(account=>account.e_mail===enteredEmail);
    // console.log(authentication1);
    let authentication2=authentication1?authentication1.password===enteredPassword:false;
    // console.log(authentication2);

    if(enteredEmail===""||enteredPassword===""){
        alert("You must Enter your Data to personalize you!!");
    }
    else{
        if ( authentication1 && authentication2){
            // user RAM!
            localStorage.setItem("id"         ,authentication1.id);
            localStorage.setItem("userName"   ,authentication1.UserName);
            localStorage.setItem("E_mail"     ,authentication1.e_mail   );
            localStorage.setItem("password"   ,authentication1.password  );
            localStorage.setItem("userImage"  ,authentication1.imageURL);
            localStorage.setItem("phoneNumber",authentication1.phone);
            // retrive the cart as it was
            // console.log(authentication1.cart);
            localStorage.setItem("cart"       ,JSON.stringify(authentication1.cart));
            localStorage.setItem("favourites"       ,JSON.stringify(authentication1.favourites));
            localStorage.setItem("loggedIn", "true");
            setTimeout(()=>{
                window.location.href="index.html"
            },500)
        }
        else{
            // console.log("those data to someone who does not among us, sorry.");
            cancelMessageLayer.style.display ="block";
            unregisteredMessage.style.display="block";
            tablue.style.opacity="0.3";
        }
    }
}
function hideMessage(){
    cancelMessageLayer.style.display ="none";
    unregisteredMessage.style.display="none";
    tablue.style.opacity="1";
}