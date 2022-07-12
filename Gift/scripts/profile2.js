/**Design Purposes */
let lightLamb = document.querySelector(".light");
// console.log(lightLamb);
let focuslight = document.querySelector(".focus");
// console.log(focuslight);
let theBigSection = document.querySelector(".drak");
let isDark = true;
function illuminate_turnOff(){
    // console.log("i am in!!");
    if (isDark){
        focuslight.setAttribute('class', "fo-cus");
        theBigSection.style.cursor="auto";
        isDark=false;
    }else{
        focuslight.setAttribute('class', "focus");
        theBigSection.style.cursor="none";
        isDark=true;
    }
};
/*********************************Design Purposes**********************************/
function darkFav_lightenOwn(){
    if (favIsDark && ownIsDark){
        myFavouritesRect.style.background="#000";
        myFavouritesRect.style.color="#fff";
        favIsDark=true;

        myMinesRect.style.background="#fff";
        myMinesRect.style.color="#000";
        ownIsDark=false;
    }
};
function darkOwn_lightenFav(){
    if (ownIsDark && favIsDark){
        myFavouritesRect.style.background="#fff";
        myFavouritesRect.style.color="#000";
        favIsDark=false;
        
        myMinesRect.style.background="#000";
        myMinesRect.style.color="#fff";
        ownIsDark=true;
    }
};
/************************************************************************/
// to set real numirical Data about this user.
// ===>> this partneed Optmization of redunudant code inside show fav and show own!
// console.log(AllProducts);
let AllProducts = JSON.parse( localStorage.getItem("AllProducts") );
let myFavouritesArr = localStorage.getItem("favourites") || [];
let favouritesProduct=AllProducts.filter((product)=> myFavouritesArr.includes(product.id));
// console.log(favouritesProduct);
let currentUserID = localStorage.getItem("id");
let myOwnProducts=AllProducts.filter((product)=> product.belongsTo=== currentUserID);
// console.log(myOwnProducts);
/*******************************************************************************************************/
/*******************************************************************************************************/
/*******************************************************************************************************/
let allUSERSS = JSON.parse( localStorage.getItem("USERS") );
// console.log(allUSERSS);
let id_redirection= localStorage.getItem("towardsSomeProfile");
// console.log(id_redirection);
let catchedUser=allUSERSS.find((auser)=>auser.id==id_redirection);
// console.log(catchedUser.imageURL);
// console.log(catchedUser);
let indexOfcatchedUserInUSERS= allUSERSS.findIndex((auser)=>auser.id==id_redirection);
// console.log(indexOfcatchedUserInUSERS); // number
// console.log(catchedUser);
let profileDom=document.querySelector(".profile-area");
// console.log(profileDom);
var imageInputDom;
setTimeout(function () {
    // var imageInputDom = document.getElementsByClassName("image-uploded");
    imageInputDom = $(".image-uploded");
    // console.log(imageInputDom[0]);
    imageInputDom[0].addEventListener('change', uploadUserImage);
}, 3000);
//

/**update  catchedUser.imageURL*/
// console.log(catchedUser.imageURL);
function uploadUserImage(e){
    // console.log("update Me");
    // console.log(imageInputDom.files[0]);
    let file = imageInputDom[0].files[0];  // this is reffered to the even target "imageInputDom".
    // console.log(file);
    let F_reader= new FileReader();
    if (file) {
        F_reader.readAsDataURL(file);
    }
    F_reader.addEventListener("load", function () {
        // convert image file to base64 string
        catchedUser.imageURL=F_reader.result;
        /*************************************************************/
        /************************************************************/
        localStorage.setItem("userImage", catchedUser.imageURL); // to be generalized on users profiles from comments also!!
        allUSERSS[indexOfcatchedUserInUSERS]=catchedUser;
        localStorage.setItem("USERS", JSON.stringify( allUSERSS ) );
        /************************************************************/
        /*************************************************************/
        drawUserUI();
        // imagepreview.src = F_reader.result;
    }, false);
    F_reader.addEventListener("error", function () {
        alert("Error on loading your Image");
    }, false);
    //
    let allowedFileTypes = [ "image/jpeg" ,"image/png", "image/gif" ];
    if (allowedFileTypes.indexOf(file.type) === -1){
        alert("this File Type is not supported, only png, jpg, and gif images");
        return;
    }
    if (file.size > 3*1024*1024){
        alert("you Image is too Large!, the Max size is 3MB.");
        return;
    }
    // console.log(catchedUser.imageURL);

};
/**update  catchedUser.UserName*/
/**update  catchedUser.phone*/
let updateNameInput =document.querySelector(".update-name-input");
// console.log(updateNameInput);
let updatePhoneInput =document.querySelector(".update-phone-input");
// console.log(updatePhoneInput);
let updateDialouge=document.querySelector(".update-dialouge");
// console.log(updateDialouge);
function showUpdateDialouge(){
    setTimeout(() => {
        // display block to dialouge box
        updateDialouge.style.display="block";
        // show with retrieval current User Data
        updateNameInput.value= catchedUser.UserName;
        updatePhoneInput.value= catchedUser.phone;
    }, 300);
};
// update btn && camcel btn on dialouge box
let userLink=document.querySelector("#user a"); //upadate the name immediately
function UPDate(){
    catchedUser.UserName=updateNameInput.value;
    userLink.innerHTML=updateNameInput.value;
    catchedUser.phone= updatePhoneInput.value;
    allUSERSS[indexOfcatchedUserInUSERS]=catchedUser;
    /*************************************************/
    /************************************************/
    /***********************************************/
    localStorage.setItem("USERS", JSON.stringify(allUSERSS));
    /***********************************************/
    /************************************************/
    localStorage.setItem("phoneNumber", updatePhoneInput.value.trim());
    localStorage.setItem("userName", updateNameInput.value.trim());
    /*************************************************/
    drawUserUI();
    CANcel();
};
function CANcel(){
    // display none to dialouge box
    updateDialouge.style.display="none";
};
/**
 * Draw html elements that is unique
 */
 drawUserUI();
 function drawUserUI(){
    let InoculatedHTML =`
    <div class="card">
        <div class="image-upload">
            <label for="file-input">
                <img src="${catchedUser.imageURL}" alt="" style="width:100%" class="default-user-image"></img>
                <input type="file" id="file-input" name="myfile" class="image-uploded">
            </label>
        </div>

        <i class="far fa-edit update-user-data" onclick="showUpdateDialouge()"></i>
        <h1>${catchedUser.UserName}</h1>
        <p class="title">${catchedUser.UserName==" Ahmed Khaled "? "CEO & Founder, هدية":"Member at هدية"}</p>
        <a href="#"><i class="fab fa-youtube"></i></a>
        <a href="#"><i class="fab fa-twitter"></i></a>
        <a href="#"><i class="fab fa-linkedin-in"></i></a>
        <a href="#"><i class="fab fa-facebook-f"></i></a>
        <p><a href="tel:01126258559"><button>Call Me ${catchedUser.phone}</button></a></p>

        <div class="contribution">
            <div class="gifts part">
                <i class="fas fa-gifts fa-lg"></i>
                <p>Gifts</p>
                <span>${myOwnProducts.length}</span>
            </div>
                
            <div class="earns part">
                <i class="fas fa-hand-holding-usd fa-lg"></i>
                <p>Earns</p>
                <span>2500$</span>
            </div>
            
            <div class="likes part">
                <i class="fas fa-heart fa-lg"></i>
                <p>Likes</p>
                <span>${favouritesProduct.length}</span>
            </div>
        </div>
        </div>
    
    `;
    profileDom.innerHTML=InoculatedHTML;
};
/***************************************************************************/
/***************************************************************************/
let myFavouritesIcon = document.querySelector(".myFav-icon");
let myFavouritesRect = document.querySelector(".shape1 .semi-rectangle");
// console.log(myFavouritesRect);
let favIsDark = false; // dark means clicked
// console.log(myFavouritesIcon);
let myPostedIcon = document.querySelector(".myGifts-icon");
let myMinesRect = document.querySelector(".shape2 .semi-rectangle");
// console.log(myMinesRect);
let ownIsDark = false;
// console.log(myPostedIcon);
//
myFavouritesIcon.addEventListener('click', showFavourites);
function showFavourites(){
    // console.log("you clicked fav");
    // let AllProducts = JSON.parse( localStorage.getItem("AllProducts") );
    // console.log(AllProducts);
    // let myFavouritesArr = localStorage.getItem("favourites") || [];
    // let favouritesProduct=AllProducts.filter((product)=> myFavouritesArr.includes(product.id));
    // console.log(favouritesProduct);
    if (!favIsDark){
        itemsSpaceDom.style.display="block";
        if (favouritesProduct.length==0){
            itemsSpaceDom.style.display="block";
            itemsSpaceDom.innerHTML="you have not any Favourites Products!";
        }else{
            drawListUI(favouritesProduct, 'f'); 
        }
        // darken
        myFavouritesRect.style.background="#000";
        myFavouritesRect.style.color="#fff";
        favIsDark=true;
    }else{
        itemsSpaceDom.style.display="none";
        myFavouritesRect.style.background="#fff";
        myFavouritesRect.style.color="#000";
        favIsDark=false;
    }
    // in case of click fav and then own
    darkFav_lightenOwn();
};
myPostedIcon.addEventListener('click', showOwned);
function showOwned(){
    // console.log("you clicked mines");
    // let AllProducts = JSON.parse( localStorage.getItem("AllProducts") );
    // let currentUserID = localStorage.getItem("id");
    // let myOwnProducts=AllProducts.filter((product)=> product.belongsTo=== currentUserID);
    // console.log(myOwnProducts);
    if (!ownIsDark){
        itemsSpaceDom.style.display="block";
        if (myOwnProducts.length==0){
            itemsSpaceDom.style.display="block";
            itemsSpaceDom.innerHTML="you have not any Favourites Products!";
        }else{
            drawListUI(myOwnProducts, 'm'); // m for mine
        }
        // darken
        myMinesRect.style.background="#000";
        myMinesRect.style.color="#fff";
        ownIsDark=true;
    }else{
        itemsSpaceDom.style.display="none";
        myMinesRect.style.background="#fff";
        myMinesRect.style.color="#000";
        ownIsDark=false;
    }
    // in case of click own and then fav
    darkOwn_lightenFav();
};
//
let itemsSpaceDom = document.querySelector(".items");
// console.log(itemsSpaceDom);
function drawListUI(productBunsh ,drawWhich){
    let drawHeaderTitle= `
        <div class="items-head">
            ${drawWhich==='f'? "your Favourites": "your own Products"}
            <hr>
        </div>
        `;
    
    let drawedGiftsHTML=productBunsh.map(product=>{
        let html=
        `
        <div class="items-body">
            <div class="items-body-content" onclick="towardsGiftProduct(${product.id})">
                <span>${product.name}</span>
                <i class="fa fa-angle-right"></i>
            </div>
        </div>
        `;
        return html;
    });
    itemsSpaceDom.innerHTML=drawHeaderTitle+drawedGiftsHTML.join("");
};
// product div takes you to specific product
function towardsGiftProduct(id){
    // console.log(id);
    /*******************************************************/
    /******************************************************/
    /*****************************************************/
    localStorage.setItem("towardsWhichProduct", id.toString())
    /*****************************************************/
    /******************************************************/
    /*******************************************************/
    window.location.href="product.html";
    

};