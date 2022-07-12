regi_AllUsers = JSON.parse(localStorage.getItem("USERS")) || [];
// console.log(regi_AllUsers);

/**Register User */
let userName   = document.querySelector("#userName");
let  E_mail    = document.querySelector("#email"   );
let password   = document.querySelector("#pass"    );
let phoneNumber= document.querySelector("#phone"   );
let registerBtn= document.querySelector("#register");

function createNewUser(){
    let newUser = {};
    newUser.id= IdGenerator();
    newUser.UserName=userName.value.trim();
    newUser.e_mail  =E_mail.value.trim();
    newUser.password=password.value;
    newUser.phone   =phoneNumber.value.trim();
    newUser.favourites= [];
    newUser.cart    ={};
    newUser.imageURL="images/users/Default.png";
    newUser.role    ="";

    return newUser;
}
// it used in createNewUser()
function IdGenerator() {
    // return '_' + Math.random().toString(36).substr(2, 9);
    return Math.floor(Math.random() * Math.pow(10, 15));
};


registerBtn.addEventListener('click', function(){
    if(userName.value==="" || E_mail.value===""||password.value===""||phoneNumber.value===""){
        alert("SORRY,But You Must fill All the required full Stuff");
    }
    else{
        theNewUser=createNewUser();
        // console.log(theNewUser);
        updated_regi_AllUsers=[...regi_AllUsers, theNewUser];
        // console.log(updated_regi_AllUsers);
        /************************************************ */
        /*********************************************** */
        /********************************************** */
        /**very special code line, play with the DB */
        localStorage.setItem("USERS", JSON.stringify(updated_regi_AllUsers));
        /********************************************** */
        /*********************************************** */
        /************************************************ */
        /**user RAM! */
        localStorage.setItem("id"         ,theNewUser.id);
        localStorage.setItem("userName"   ,theNewUser.UserName);
        localStorage.setItem("E_mail"     ,theNewUser.e_mail   );
        localStorage.setItem("password"   ,theNewUser.password  );
        localStorage.setItem("userImage"  ,theNewUser.imageURL);
        localStorage.setItem("phoneNumber",theNewUser.phone);
        localStorage.setItem("favourites" ,JSON.stringify(theNewUser.favourites))
        /**retrive the cart as it was:NO XX, the cart is always {}*/
        localStorage.setItem("cart"       ,JSON.stringify(theNewUser.cart));


        //set previously products once onlogin/ onregister
        // localStorage.setItem("AllProducts", JSON.stringify(productsMainSource));


        localStorage.setItem("loggedIn", "true");
        setTimeout(()=>{
            window.location.href="index.html"
        },500)
    }
});