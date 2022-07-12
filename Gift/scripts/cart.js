/**ON GLOBAL reload*/
let cart_AllProductsAtStore=JSON.parse(localStorage.getItem("AllProducts"));
// console.log(cart_AllProductsAtStore);
let current_updated_cart=JSON.parse(localStorage.getItem("cart"));
// console.log(current_updated_cart);
keysOfCartIds=Object.keys(current_updated_cart);
// console.log(keysOfCartIds);
cartproductsArray=cart_AllProductsAtStore.filter(product=>keysOfCartIds.includes(product.id.toString()));
// console.log(cartproductsArray);
/*************************************************************** */
/*********************************************************************/
/**Update badge Counter */
let badgeCounterDOM = document.querySelector(".badge");
// console.log(badgeCounterDOM);
handleCounterBadge(current_updated_cart);
function handleCounterBadge(current_updated_cart){
    let accumulator=0
    if (current_updated_cart !={}){
        let keys=Object.keys(current_updated_cart);
        for(let i=0 ; i<keys.length; i++){
            accumulator+= current_updated_cart[keys[i]];
        }
    }
    badgeCounterDOM.innerHTML=accumulator;
}
/*********************************************************************/
let NoOfGiftsDOM=document.querySelector("#totalNum");
// console.log(NoOfGiftsDOM);
updateTotalNumber(current_updated_cart);
function updateTotalNumber(current_updated_cart){
    let accumulator=0;
    if (current_updated_cart !={}){
        let keys=Object.keys(current_updated_cart);
        for(let i=0 ; i<keys.length; i++){
            accumulator+= current_updated_cart[keys[i]];
        }
    }
    NoOfGiftsDOM.innerHTML=accumulator;
}
/*********************************************************************/
let NotypesOfGiftsDOM=document.querySelector("#typeNum");
updateTypeNumber(cartproductsArray.length);
function updateTypeNumber(arrLength){
    NotypesOfGiftsDOM.innerHTML=arrLength; 
}
/*********************************************************************/
/**Update Total Price*/
let totalPriceDOM=document.querySelector("#totalPrice");
// console.log(totalPriceDOM);
updateTotalPrice(cartproductsArray);
function updateTotalPrice(cartproductsArray){
    let totalPrice= 0;
    for(let i=0; i<cartproductsArray.length; i++){
    totalPrice+=cartproductsArray[i].price;
    // console.log(totalPrice);
    }
    totalPriceDOM.innerHTML=totalPrice;
}
/************************************************************/
/************************************************************/
/************************************************************/
let cartSpace = document.querySelector(".cartSpace");
drawCartUI(cartproductsArray);
function drawCartUI(allCartProducts){
    let cartUI=allCartProducts.map(element => {
        let html =`
        <div id ="${element.id}" class="cart-item">
            <div class="product-image">
                <img src="${element.imageURL}" alt="">
            </div>
            <div class="product-name">${element.name}<br><span class="price">${element.price}$</span></div>
            <div class="product-trash" onclick="removeFromCart(${element.id})">
                <i class="fas fa-trash"></i><br>
                <span identity="${element.id}" class="qnt">${retrieveQnt(element.id)}</span>
            </div>
        </div>
         `;
    return html;
    });
    cartSpace.innerHTML=cartUI.join("");
}
/************************************************************/
function retrieveQnt(id){
    let current_updated_cart=JSON.parse(localStorage.getItem("cart"));
    return current_updated_cart[id];
}
/************************************************************/
activateStackedGifts();
function activateStackedGifts(){
    let AllCartItems_nodeList= document.querySelectorAll(".cart-item");
    let AllCartItems=Array.from(AllCartItems_nodeList);
    // console.log(AllCartItems);
    AllCartItems.forEach(item=>{
        let ID=item.getAttribute("id");
        let num_id= +ID;
        // console.log(ID);
        let identifyQnt = retrieveQnt(num_id).toString();
        // console.log(identifyQnt);

    
        if (+identifyQnt == 1 ){
            item.setAttribute("class", "cart-item");
        }
        else if ( (+identifyQnt)== 2){
            item.setAttribute("class", "cart-item stacked two");
        }
        else if( (+identifyQnt)==3){
            item.setAttribute("class", "cart-item stacked three");
        }
        else if( (+identifyQnt)==4){
            item.setAttribute("class", "cart-item stacked four");
        }else{
            item.setAttribute("class", "cart-item stacked five");
        }//extesible on more
    });
};
/************************************************************/
/************************************************************/
// console.log(cartproductsArray);
/**من أهم الفانكشنز هنا.. لانها الوجه الاخر لعملة الاضافة في الكارت */
function removeFromCart(id){ //removededItemID=id       
    let current_updated_cart=JSON.parse(localStorage.getItem("cart"));
    // console.log(current_updated_cart);
    let Qnt= current_updated_cart[id]; // Qnt is  num
    // console.log(Qnt);
    if (Qnt > 1){ //decrement quantity!
        --current_updated_cart[id];
        // console.log(current_updated_cart[id]);
        // console.log(current_updated_cart);
        /****************************************************/
        /***************************************************/
        /**************************************************/
        localStorage.setItem("cart", JSON.stringify(current_updated_cart));
        /**************************************************/
        /***************************************************/
        /****************************************************/
        updateTotalPrice(cartproductsArray); // the global declared 
        // updateTypeNumber();
        updateTotalNumber(current_updated_cart);
        handleCounterBadge(current_updated_cart);
        //ONLY to Update individual Counter!!:: bad!!!
        drawCartUI(cartproductsArray);
        activateStackedGifts();
    }else{ //remove the gift!

        delete current_updated_cart[id];
        // console.log(current_updated_cart);
        /****************************************************/
        /***************************************************/
        /**************************************************/
        localStorage.setItem("cart", JSON.stringify(current_updated_cart));
        /**************************************************/
        /***************************************************/
        /****************************************************/
        // live remove, different strategy, redrawn
        const indexOfID = cartproductsArray.findIndex(item => item.id === id);
        cartproductsArray.splice(indexOfID, 1);
        drawCartUI(cartproductsArray);


        updateTotalPrice(cartproductsArray); // the global declared 
        updateTypeNumber(cartproductsArray.length);
        updateTotalNumber(current_updated_cart);
        handleCounterBadge(current_updated_cart);
        activateStackedGifts();
    }
};