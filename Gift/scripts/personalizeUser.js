// let AllUsers= JSON.parse( localStorage.getItem("USERS") );
// console.log(AllUsers);

/**Handle login and register, personalization*/
let brandLogo     =document.querySelector(".brand");
let links         =document.querySelector(".navi-links"     );
let userRegistered=document.querySelector(".user-registered");
let user          =document.querySelector("#user a"         ); //li
let logOut        =document.querySelector("#logout");
let signIn        =document.querySelector("#signIn");
// console.log(signIn);

/**
 * الأمل كبير هنا ان هيتم الحاق الكارت الخاص باليوزر الأكتيف حاليا قبل مايخرج!!
 */
logOut.addEventListener('click', function(){
    localStorage.setItem("loggedIn", "false");


    let AllUsers = JSON.parse(localStorage.getItem("USERS"));






    window.location.href="login.html";


});
// console.log(localStorage.getItem("password"));
let LogInFlag=localStorage.getItem("loggedIn");
let userName =localStorage.getItem("userName");

// quick sign in with the recent account opened
signIn.addEventListener('click', function(){
    if( ( localStorage.getItem("E_mail") )!="" && ( localStorage.getItem("password") ) !=""){
        showPesronalized();
        window.location.href="index.html";
    }else{
        window.location.href="login.html";
    }
});

if(LogInFlag=="true"){
    showPesronalized();
}else{
    showNavLinks();
}
function showNavLinks(){
    userRegistered.style.display="none";
    localStorage.setItem("loggedIn", "false");
};
function showPesronalized(){
    localStorage.setItem("loggedIn", "true");
    links.remove();
    userRegistered.style.display="block";
    user.innerHTML=userName;    
};