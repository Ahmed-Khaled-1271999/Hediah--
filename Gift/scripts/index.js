/**
 *
 */
/*************************************************************/
//load Data
/**كيف مع التحميل لا يتم فقد اي منتجات مضافة ام ليست مضافة؟؟
 * الاجابة مع كل تحميل يتم علي ثلاث مراحل متتالية:
 * الأولي يتم تحميل كل المنتجات من غير ان تكون ولا واحدة مضافة
 * الثانية يتم وضع عدسة المستخدم اي الكارت بتاعته-وذلك هو الذي لا يصح ابدا فقده- مع كل تحميل سيستعيد له داتا معدلة
 * الثالثة رسم بيدين مختلفين علي اساس قيمة الوجود في الجعبة ام خارجها
 * 
 * هذا المنطق معدوم التأثير الفوري -اي بين فترات التحميل المختلفة
 */
ind_productsMainSource=JSON.parse( localStorage.getItem("AllProducts") ) || [];
// console.log(ind_productsMainSource);
/*************************************************************/
/**
 * GET currently logged user Data (i called user cash RAM):
 *  register puts cash related to a new user, i.e empty cary Object 
 *  login searh USERS by email && password then retrieve its date to be put in cash.
 *  */ 
let current_userId     =    localStorage.getItem("id");
let current_userName   =    localStorage.getItem("userName");
let current_E_mail     =    localStorage.getItem("E_mail");
let current_password   =    localStorage.getItem("password");
let current_phoneNumber=    localStorage.getItem("phoneNumber");
/**مع كل تحميل للصفحة تأخذ من قاعدة البيانات ولذلك يلزم مع كل تغيير تسجيله حتي لا يتم فقده مع التحميل */
let current_cart=JSON.parse(localStorage.getItem("cart"));


/**
 * it works on first load, in reload, in search??
 * @param {the cart cash values classify all products domain to in cart or not, depends on that next it draw the gift card} currentCartParam 
 */
function asYourHandLeft(currentCartParam){
    allCartGiftsIds=Object.keys(currentCartParam); //either filled or empty array, elements in this array "strings"
    // console.log(allCartGiftsIds);
    // console.log(typeof allCartGiftsIds[0]); //string
    ind_productsMainSource.forEach(product=>{
        // console.log(typeof product.id);
        let productIDstr=product.id.toString();
        if(allCartGiftsIds.includes(productIDstr)){
            product.inCart=true;
        }
        else{
            product.inCart=false;
        }
    })
    // console.log(ind_productsMainSource); // every thing is OK
};
asYourHandLeft(current_cart);
// draw Data as i showed to you!
let productsDOM = document.querySelector(".products");
/**
 * IT chek if there is gifts to draw, if? then,
 *  IT draw two subtle different card for each gift depends on its .inCart property
 * 
 * each time action gift is added or removed it must recall "addToCart()" "removeFromCart()"
 * In search??
 * @param {*} productsToBeDrawn 
 */
function drawProductUI(productsToBeDrawn=[]){
    personalizeUI_lovesIcons();
    if(productsToBeDrawn.length!=0){
        let productUI = productsToBeDrawn.map(function(item){
            if (item.inCart==false){
                let html = `
                    <div class="product-item">
                        <div class="view-window">
                            ${item.belongsTo===localStorage.getItem("id") ?`<i class="fas fa-ellipsis-v fa-2x product-control" onclick="showControlMenu(${item.id})"></i>` : ""} 
                            ${item.belongsTo===localStorage.getItem("id") ? `
                                <div id="${item.id}" class="control-menu"> 
                                    <p class="edit" onclick="travelToEditYour(${item.id})"> <a href="edit.html" target="_blank">Edit</a></p>
                                    <p class="delete" onclick="deleteYourOwn(${item.id})">Delete</p>
                                </div>
                            `:""}
                            <img src="${item.imageURL}" alt="gift">
                        </div>
                        <div class="prduct-item-info">
                            <h2><a href="product.html" class="toGiftPadge" onclick="saveClickedId(${item.id})">${item.name}</a></h2>
                            <p>${item.desc}.</p>
                            <div class="price">price:<span>${item.price}$</span></div>
                        </div>
                        <div class="product-item-actions">
                            <button id="${item.id}" class="add-to-cart" onclick="AddToCart(${item.id})">Add To Cart</button>
                            <i id="${item.id}" class="heart fas fa-heart fa-lg" onclick="recordLove(${item.id})"></i>
                        </div>
                    </div>
                `;
                return html;
            }else{
                let html = `
                    <div class="product-item">
                        <div class="view-window">
                        ${item.belongsTo===localStorage.getItem("id") ?`<i class="fas fa-ellipsis-v fa-2x product-control" onclick="showControlMenu(${item.id})"></i>` : ""} 
                            ${item.belongsTo===localStorage.getItem("id") ? `
                                <div id="${item.id}" class="control-menu"> 
                                    <p class="edit" onclick="travelToEditYour(${item.id})"> <a href="edit.html" target="_blank">Edit</a></p>
                                    <p class="delete" onclick="deleteYourOwn(${item.id})">Delete</p>
                                </div>
                            `:""}
                        <img src="${item.imageURL}" alt="gift">
                    </div>
                    <div class="prduct-item-info">
                        <h2><a href="product.html" class="toGiftPadge" onclick="saveClickedId(${item.id})">${item.name}</a></h2>
                        <p>${item.desc}.</p>
                        <div class="price">price:<span>${item.price}$</span></div>
                    </div>
                    <div class="product-item-actions">
                        <button id="${item.id}" class="added" onclick="tellAdded(${item.id})">Added</button>
                        <i id="${item.id}" class="heart fas fa-heart fa-lg" onclick="recordLove(${item.id})"></i>
                        <div class="quantityController">
                            <div class="icon-space"  onclick="increaseQnt(${item.id})">
                                <i class="fas fa-sort-up"></i>
                            </div>
                            <span id="${item.id}" class="quantity">${retrieveQnt(item.id)}</span>  
                            <div class="icon-space" onclick="decreaseQnt(${item.id})">
                                <i class="fas fa-sort-down"></i>
                            </div>
                        </div>
                    </div>
                </div>
                `;
                return html;
            }
        }); ////current_cart[item.id]
        productsDOM.innerHTML=productUI.join("");
    }else{
        productsDOM.innerHTML=`
        <div class="declareNoGifts">
            <span>Opps,</span> Seems We have no Gifts!
        </div>
        `;
    }
}; 
drawProductUI(ind_productsMainSource);
/************************************************************/
/**************************************************************/
/***************************************************************/
/**
 * retrieve qnt for each the prduct cart in reload, and individual badge in cart
 * @param {*} id 
 * @returns 
 */
function retrieveQnt(id){
    let current_updated_cart=JSON.parse(localStorage.getItem("cart"));
    return current_updated_cart[id];
}
/************************************************************/
// function tellAdded(id){ToastMaker(`This gift is already in your Cart`);}
/************************************************************/
// // to directly update and preserve user data change
// //add to cart and increase decrese and also favourites
let currentUserID = localStorage.getItem("id");
let allUsers = JSON.parse( localStorage.getItem("USERS") );
let currentUser= allUsers.find(user=>user.id===(+currentUserID));
let currentUserIndex= allUsers.findIndex(user=>user.id===(+currentUserID));
/*********************************************************************************/
/**Quantity Controller scripts*/
function increaseQnt(id){
    let allQuantityContentDOM_nodeList=document.querySelectorAll(".quantity"); // Array prototype methods not operating on node List
    // console.log(allQuantityContentDOM_nodeList);
    let allQuantityContentDOM=Array.from(allQuantityContentDOM_nodeList);
    // console.log(typeof allQuantityContentDOM[0].getAttribute("id"));

    // live change for Qnt on individual badge on cart
    let allCartQuantityContentDOM_nodeList=document.querySelectorAll(".individual-badge");
    let allCartQuantityContentDOM=Array.from(allCartQuantityContentDOM_nodeList);
    // console.log(allCartQuantityContentDOM);

    idStr=id.toString();
    allQuantityContentDOM.forEach(element=>{
        if (element.getAttribute("id")===idStr){
            // immeditely visual effect on Qnt
            currentState= +element.textContent;
            nextState   = ++currentState;
            nextStateStr=nextState.toString();
            element.innerHTML=nextStateStr;

            // on reload? in after logins? 
            current_cart[id]=nextState;
            // console.log(current_cart);
            /*******************************************/
            /******************************************/
            /*****************************************/
            localStorage.setItem("cart", JSON.stringify(current_cart));
            /*****************************************/
            /******************************************/
            /*******************************************/
            let current_updated_cart=JSON.parse(localStorage.getItem("cart"));
            handleCounterBadge(current_updated_cart);
            /******************************************************************/
            /******************************************************************/
            /******************************************************************/
            currentUser.cart=current_updated_cart;
            allUsers[currentUserIndex]=currentUser;
            localStorage.setItem("USERS", JSON.stringify(allUsers));
            /******************************************************************/
            /******************************************************************/
            /******************************************************************/
        }
    });
    allCartQuantityContentDOM.forEach(element=>{
        if (element.getAttribute("id")===idStr){
            // immeditely visual effect on Qnt
            currentState= +element.textContent;
            nextState   = ++currentState;
            nextStateStr=nextState.toString();
            element.innerHTML=nextStateStr;
        }
    });
};
function decreaseQnt(id){
    let allQuantityContentDOM_nodeList=document.querySelectorAll(".quantity"); // Array prototype methods not operating on node List
    // console.log(allQuantityContentDOM_nodeList);
    let allQuantityContentDOM=Array.from(allQuantityContentDOM_nodeList);
    // console.log(typeof allQuantityContentDOM[0].getAttribute("id"));

    // live change for Qnt on individual badge on cart
    let allCartQuantityContentDOM_nodeList=document.querySelectorAll(".individual-badge");
    let allCartQuantityContentDOM=Array.from(allCartQuantityContentDOM_nodeList);
    // console.log(allCartQuantityContentDOM);

    idStr=id.toString();
    allQuantityContentDOM.forEach(element=>{
        if (element.getAttribute("id")===idStr){
            // immeditely visual effect on Qnt
            currentState= +element.textContent;
            nextState   = currentState>1 ? --currentState : currentState;
            nextStateStr=nextState.toString();
            element.innerHTML=nextStateStr;

            // on reload? in after logins? 
            current_cart[id]=nextState;
            // console.log(current_cart);
            /*******************************************/
            /******************************************/
            /*****************************************/
            localStorage.setItem("cart", JSON.stringify(current_cart));
            /*****************************************/
            /******************************************/
            /*******************************************/
            let current_updated_cart=JSON.parse(localStorage.getItem("cart"));
            handleCounterBadge(current_updated_cart);
            /******************************************************************* */
            /******************************************************************* */
            /******************************************************************* */
            currentUser.cart=current_updated_cart;
            allUsers[currentUserIndex]=currentUser;
            localStorage.setItem("USERS", JSON.stringify(allUsers));
            /******************************************************************* */
            /******************************************************************* */
            /******************************************************************* */
        }
    });

    allCartQuantityContentDOM.forEach(element=>{
        if (element.getAttribute("id")===idStr){
            // immeditely visual effect on Qnt
            currentState= +element.textContent;
            nextState   = currentState>1 ? --currentState : currentState;
            nextStateStr=nextState.toString();
            element.innerHTML=nextStateStr;
        }
    });
};
/**towards specific product*/
function saveClickedId(id){
    localStorage.setItem("towardsWhichProduct",id);
};
function previewFromCart(id){
    localStorage.setItem("towardsWhichProduct",id);
    window.location.href="product.html";
}
function redirectToEdit(id){
    localStorage.setItem("redirectToEdit",id);
    window.location.href="edit.html";
}
/*****************************************************************/
/************************************************************/
/************************************************************/
function searchPattern(pattern){
    // let ind_productsMainSource=JSON.parse(localStorage.getItem("AllProducts"));
    let searchedProducts=ind_productsMainSource.filter((gift)=>{
        let patternInLower =pattern.toLowerCase();
        let giftNameInLower=gift.name.toLowerCase();
        return giftNameInLower.includes(patternInLower);
    });
    let Scurrent_cart=JSON.parse(localStorage.getItem("cart"));
    asYourHandLeft(Scurrent_cart);
    // console.log(searchedProducts);
    return searchedProducts;
};
let serchBar= document.querySelector("#search");
// operate onkeyuP in search input
function dynamicSearch(){
    let returnedSearchedProducts=searchPattern(serchBar.value.trim());
    // console.log(Scurrent_cart);
    drawProductUI(returnedSearchedProducts);
    personalizeUI_lovesIcons();
}
/**************************************************************/
/**************************************************************/
/**************************************************************/
function AddToCart(id){
    if (localStorage.getItem("loggedIn")==="true"){
        // console.log(typeof id);  // number
        let id_str=id.toString();
        // console.log(ind_productsMainSource);
        let giftTryToAdd=ind_productsMainSource.find(gift=> gift.id.toString()===id_str);
        // console.log(giftTryToAdd);
        giftTryToAdd.inCart=true;
        /****************************************************************/
        cartproductsArray=[...cartproductsArray, giftTryToAdd]
        drawCartUI(cartproductsArray);
        /****************************************************************/
        /***************************************************************/
        /**************************************************************/
        let current_updated_cart=JSON.parse(localStorage.getItem("cart"));
        // add new unique gift, with qnt:1
        current_updated_cart[id]=1;
        localStorage.setItem("cart", JSON.stringify(current_updated_cart));

      
        currentUser.cart=current_updated_cart;
        allUsers[currentUserIndex]=currentUser;
        localStorage.setItem("USERS", JSON.stringify(allUsers));
        /**************************************************************************/
        /**************************************************************************/
        /**************************************************************************/


        // console.log(current_cart); //Global it useless wherever unless on reloading for the first time 
        // console.log(current_updated_cart);
        /**************************************************************/
        handleCounterBadge(current_updated_cart);
        /***************************************************************/
        /****************************************************************/
        drawProductUI(ind_productsMainSource);
        /****************************************************************/
        handleShowCart(cartproductsArray.length);
        /****************************************************************/
        personalizeUI_lovesIcons();
        /****************************************************************/
        initialIndividualBadgeCounter(id);
        /****************************************************************/

    }else{
        window.location.href="login.html";
    }
};
/****************************************************************/
let controlIcons_node= document.querySelectorAll(".product-control");
let controlIcons= Array.from(controlIcons_node);
// console.log(controlIcons);
let showed = false;
function showControlMenu(id){
    let controlMenues_node=document.querySelectorAll(".control-menu");
    let controlMenues =  Array.from(controlMenues_node);
    // console.log(controlMenues);
    // console.log(+controlMenues[0].id);
    // console.log(id);
    for(let i=0; i<controlMenues.length; i++){
        if(+controlMenues[i].id == id ){
            if( !showed){
                controlMenues[i].style.display= "block";
                showed=true;
            }else{
                controlMenues[i].style.display= "none";
                showed=false;
            }
        }
    }
};
/*******************************************************************************************************/
function travelToEditYour(id){
    localStorage.setItem("travelToEditWhat?",id);
    // the transition is made by anchor link
}
/*******************************************************************************************************/
function deleteYourOwn(id){
    let AllProducts_ed=JSON.parse( localStorage.getItem("AllProducts") );
    // console.log(AllProducts_ed);
    let ID=localStorage.getItem("travelToEditWhat?");
    let thisGiftPosition=AllProducts_ed.findIndex(gift=> gift.id=== (+ID) );
    // console.log(id);
    // console.log(thisGiftPosition);
    // /*************************************************************************************/
    // /************************************************************************************/
    // /***********************************************************************************/
    AllProducts_ed.splice( thisGiftPosition, 1);
    // console.log(AllProducts_ed);
    drawProductUI(AllProducts_ed)
    localStorage.setItem("AllProducts", JSON.stringify( productsMainSource ));
    // /***********************************************************************************/
    // /************************************************************************************/
    // /*************************************************************************************/
};
/**********************************************************************************************/
/**********************************************************************************************/
/**********************************************************************************************/

// console.log(+haertIcons[0].getAttribute("id"));
// first show to user liked is false
// let liked=false;
let liked; // the individual pointer to eacj product clicked
// console.log(liked); //undefined
let favouritesArray=JSON.parse( localStorage.getItem("favourites") )||[];
// console.log(favouritesArray);
// ON RELOADING AND ON RETRIEVAL :: affect like icon style based on user Favourited Data 
personalizeUI_lovesIcons();
function personalizeUI_lovesIcons(){
    let haertIcons_node= document.querySelectorAll(".heart");   
    let haertIcons=Array.from(haertIcons_node);
    haertIcons.forEach(heartIcon=>{
        if (favouritesArray.includes( +heartIcon.getAttribute("id") ) ){
            heartIcon.style.color="#389393";
        }
    });
};
function recordLove(id){
    let haertIcons_node= document.querySelectorAll(".heart");   
    let haertIcons=Array.from(haertIcons_node);
    // console.log(id);//number
    // console.log("you pressed love!");
    let allProducts= JSON.parse(localStorage.getItem( "AllProducts") );
    // console.log(allProducts); //number
    // let productReactedOn = allProducts.find(product=>product.id===id);
    let productReactedOnIndex = allProducts.findIndex(product=>product.id===id);
    // console.log(productReactedOn);
    let theIcon=haertIcons.find(heartI=>+heartI.getAttribute("id")===id);
    // console.log(theIcon);
    /*********************************************************************************/
    // built in Function ::if the product is in my fav arr let liked here = true
    if (!favouritesArray.includes(id)){
        // favouritesArray=[...favouritesArray, id];
        liked=false;
    }else{
        liked=true;
    }
    // console.log(favouritesArray)
    /**********************************************************************************/
    /// get current user in order to preserve this data on user array for permanently
    let currentUserID = localStorage.getItem("id");
    let allUsers = JSON.parse( localStorage.getItem("USERS") );
    let currentUser= allUsers.find(user=>user.id===(+currentUserID));
    let currentUserIndex= allUsers.findIndex(user=>user.id===(+currentUserID));
    
    if(!liked){
        allProducts[productReactedOnIndex].likes++;
        /**********************************************************************/
        /*********************************************************************/
        /********************************************************************/
        localStorage.setItem("AllProducts",JSON.stringify(allProducts));
        /********************************************************************/
        /*********************************************************************/
        /**********************************************************************/
        favouritesArray=[...favouritesArray, id];
        // apply styles on heartIcon
        theIcon.style.color="#389393";
        liked=true;

    }else{
        allProducts[productReactedOnIndex].likes--;
        /**********************************************************************/
        /*********************************************************************/
        /********************************************************************/
        localStorage.setItem("AllProducts",JSON.stringify(allProducts));
        /********************************************************************/
        /*********************************************************************/
        /**********************************************************************/
        // apply styles on heartIcon
        theIcon.style.color="#fff591";
        let idIndex=favouritesArray.findIndex(anId=> anId===id);
        //remove the id from fav
        favouritesArray.splice(idIndex, 1);
        liked=false;
    }
    // console.log(allProducts[productReactedOnIndex]);
    /***************************************************************************************/
    /**************************************************************************************/
    /*************************************************************************************/
    localStorage.setItem("favourites",JSON.stringify(favouritesArray));
    // يبقي اختيار حفظها مع المستخدم هنا ام مع الخروج!! يتم الخروج وتسجيل كل الداتا في الكاش
    currentUser.favourites=favouritesArray;
    allUsers[currentUserIndex]=currentUser;
    localStorage.setItem("USERS", JSON.stringify(allUsers));
    /*************************************************************************************/
    /**************************************************************************************/
    /***************************************************************************************/
};
/**********************************************************************************************/
/**********************************************************************************************/
/**********************************************************************************************/
/// its intended that every load we lost the filtered data so that tagsString is "" 
let tagsString = "";
let tagsSpans_nodeList= document.querySelectorAll(".filter span");
let tagsSpans = Array.from(tagsSpans_nodeList);
// console.log(tagsSpans);
function extractTagInfo(idTag){
    //aplly some styles of clicked TAG
    let clickedSpan=tagsSpans.find(tag=> tag.id===idTag);
    // console.log(clickedSpan);
    if (idTag.trim()===""){ // the product it self is not categorized
        drawProductUI(ind_productsMainSource);
    }else{
        if (tagsString.trim()==" "){
            drawProductUI(ind_productsMainSource);
        }
        else if (!tagsString.trim().includes(idTag.trim())){
            clickedSpan.style.background="#fff591";
            // console.log(idTag);
            tagsString += `${idTag} `;
            // console.log(tagsString);
            // console.log(tagsString);
            let returnedFilteredProducts = FilterByTagString(tagsString.trim());
            // console.log(returnedFilteredProducts);
            drawProductUI(returnedFilteredProducts);
            personalizeUI_lovesIcons();
        }else{
            clickedSpan.style.background="lightblue";

            const search = idTag.trim();
            const replaceWith = '';
            tagsString = tagsString.replaceAll(search, replaceWith).trim();
            // console.log(tagsString);

            // var resultedTagString= tagsString.replace(idTag,'').trim();
            let returnedFilteredProducts = FilterByTagString(tagsString.trim());
            // console.log(idTag);
            // console.log(resultedTagString);
            // console.log(returnedFilteredProducts);
            drawProductUI(returnedFilteredProducts);
            personalizeUI_lovesIcons();
        }
    }
    // console.log(tagsString);
   
};
function FilterByTagString(tagString){
    // let ind_productsMainSource=JSON.parse(localStorage.getItem("AllProducts"));
    let filteredProducts=ind_productsMainSource.filter((gift)=>{
        let tagStringInLower =tagString.toLowerCase();
        let giftTagsInLower=gift.tags.toLowerCase();
        return giftTagsInLower.includes(tagStringInLower);
    });
    let Fcurrent_cart=JSON.parse(localStorage.getItem("cart"));
    asYourHandLeft(Fcurrent_cart);
    // console.log(searchedProducts);
    return filteredProducts;
};
/*************************************************************************************************/
/*****************************************************/
// preserve user setting on lang
// ترجمة مضحكة
/*****************************************************/
let recentDirection = localStorage.getItem("pageDirection");
if (recentDirection){
    changeDirection(recentDirection);
    arabicFakeTranlation(recentDirection);
};
let englishLang = document.querySelector("#en-lang");
let arabicLang = document.querySelector("#ar-lang");

englishLang.addEventListener('click', ()=>{changeDirection("ltr");});
arabicLang.addEventListener('click', ()=>{changeDirection("rtl"); });
function changeDirection (dir){
    document.documentElement.setAttribute("dir", dir)
    localStorage.setItem("pageDirection", dir);
    arabicFakeTranlation(dir);
};
/*******************************************************************************/
function arabicFakeTranlation(dir){
    let brandLocalization = document.querySelector(".brand");
    // console.log(brandLocalization);
    let LogoutLocalization = document.querySelector("#logout");
    let arabicLocalization = document.querySelector("#ar-lang");
    let searchLocalization = document.querySelector("#search");
    let men_TagLocalization = document.querySelector("#mens");
    let womens_TagLocalization = document.querySelector("#wome-ns");
    let adults_TagLocalization = document.querySelector("#adults");
    let teenegers_TagLocalization = document.querySelector("#teenegers");
    let wedding_TagLocalization = document.querySelector("#wedding");
    let birthDay_TagLocalization = document.querySelector("#birthDay");
    let valantaine_TagLocalization = document.querySelector("#valantaine");
    let addToCartLocalization_nodeList =document.querySelectorAll(".add-to-cart");
    let addToCartLocalizationsArr=Array.from(addToCartLocalization_nodeList);
    // console.log(addToCartLocalizationsArr);
    // console.log(document.documentElement.getAttribute("dir"));
    if (dir === 'rtl'){
        brandLocalization.innerHTML="هــدية";

        LogoutLocalization.innerHTML="تسجيل خروج";
        LogoutLocalization.style.color="#fff";
        LogoutLocalization.style.cursor="pointer";

        arabicLocalization.innerHTML="ع";

        searchLocalization.placeholder="ابحث عن هديتك بكلمة مناسبة";

        men_TagLocalization.innerHTML="رجالي";
        womens_TagLocalization.innerHTML="حريمي";
        adults_TagLocalization.innerHTML="لبالغ";
        teenegers_TagLocalization.innerHTML="لمراهق";
        wedding_TagLocalization.innerHTML="زواج";
        birthDay_TagLocalization.innerHTML="عيد ميلاد";
        valantaine_TagLocalization.innerHTML="رومانسية";

        addToCartLocalizationsArr.forEach((addToCartLocalization)=>{
            addToCartLocalization.innerHTML="اضف الي جعبتك";
        });
    }else{
        brandLocalization.innerHTML="Gift";

        LogoutLocalization.innerHTML="Log Out";
        LogoutLocalization.style.color="#fff";
        LogoutLocalization.style.cursor="pointer";


        arabicLocalization.innerHTML="ar";

        searchLocalization.placeholder="Search Gifts by Name..";

        men_TagLocalization.innerHTML="Mens";
        womens_TagLocalization.innerHTML="Womens";
        adults_TagLocalization.innerHTML="Adults";
        teenegers_TagLocalization.innerHTML="Teenegers";
        wedding_TagLocalization.innerHTML="Wedding";
        birthDay_TagLocalization.innerHTML="BirthDay";
        valantaine_TagLocalization.innerHTML="Valantaine";

        addToCartLocalizationsArr.forEach((addToCartLocalization)=>{
            addToCartLocalization.innerHTML="Add To Cart";
        });
    }
}