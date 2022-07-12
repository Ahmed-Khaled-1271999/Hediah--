/**Global*/
/**index.js extension: we need to enable show,and draw cart in product.html and profile.html Nand cart.html */
/**to make main is a common script, why i filter by ids (whick is not changed) the  ind_productsMainSource which created on index.js,
*/
let sourceGiftsData= JSON.parse(localStorage.getItem("AllProducts"));
let current_updated_cart=JSON.parse(localStorage.getItem("cart"));
keysOfCartIds=Object.keys(current_updated_cart);
// console.log(keysOfCartIds);
/**This Cart Products Updated each time product Added and re drawn there*/
cartproductsArray=sourceGiftsData.filter(product=>keysOfCartIds.includes(product.id.toString()));
// console.log(cartproductsArray);
/****************************************************************************************/
/****************************************************************************************/
let cartSpace= document.querySelector(".cart-menu"); //the space to draw cart ui
let showAllCartText  =document.querySelector(".showAllCart");
//because of we use those in the Method and we declare with let
let dropdownDOM=document.querySelector(".dropdown");
let dropdown_swhon=false;
drawCartUI(cartproductsArray);
function drawCartUI(allCartProducts){
    let cartUI=allCartProducts.map(element => {
        let html =`
        <div class="cart-item">
            <span id="${element.id}" class="individual-badge">${retrieveQnt(element.id)}</span>
            <div class="product-image"><img src="${element.imageURL}" alt=""></div>
            <div class="product-name">${element.name}</div>
            <div class="product-preview" onclick="previewFromCart(${element.id})">
                <i class="fa fa-eye fa-lg"></i>
            </div>
        </div> `;
    return html;
    });
    cartSpace.innerHTML=cartUI.join("");
}
/****************************************************************************************/
/****************************************************************************************/
/**
 * retrieve qnt for each the prduct cart in reload, and individual badge in cart
 * @param {*} id 
 * @returns 
 */
 function retrieveQnt(id){
    let current_updated_cart=JSON.parse(localStorage.getItem("cart"));
    return current_updated_cart[id];
}
/****************************************************************************************/
/** */
let badgeCounter = document.querySelector(".badge");
let Mcurrent_updated_cart=JSON.parse(localStorage.getItem("cart"));
handleCounterBadge(current_updated_cart); //on load
function handleCounterBadge(current_updated_cart){
    let keys=Object.keys(current_updated_cart);
    // console.log(current_updated_cart[1]); // key passed as number, value returned as string
    let accumulator=0
    for(let i=0 ; i<keys.length; i++){
        accumulator+= current_updated_cart[keys[i]];
    }
    badgeCounter.innerHTML=accumulator;
}
// /** */
//show dropdown, the variable is declared before handleShowCart()that uses them
// // let dropdownDOM=document.querySelector(".dropdown");
// // let dropdown_swhon=false; //take its value every time page loading
function showDropdown(){
    if (dropdown_swhon){
        dropdownDOM.style.display="none";
        dropdown_swhon=false;
    }else{
        dropdownDOM.style.display="block";
        dropdown_swhon=true;
    }
}
// /**********************************************************/
handleShowCart(cartproductsArray.length);
function handleShowCart(cartArrayLength){
    if (cartArrayLength==0){
        showAllCartText.innerHTML="You have no gifts yet";
        // Or diable the cart show
    }
    else
    {
        showAllCartText.innerHTML="Show All Cart Content";
    }
}
/**
 * This function is called in Add To Cart to fires counter, not on reloading XXX!!, and similar to it is invoked in Qnt Controller that overwrite this function
 */
function initialIndividualBadgeCounter(id){
    // live change for Qnt on individual badge on cart
    let allCartQuantityContentDOM_nodeList=document.querySelectorAll(".individual-badge");
    let allCartQuantityContentDOM=Array.from(allCartQuantityContentDOM_nodeList);
    // console.log(allCartQuantityContentDOM);
    allCartQuantityContentDOM.forEach(element=>{
        // console.log(element.getAttribute("id"));
        // console.log(id);
        if (element.getAttribute("id")== id.toString()){
            element.innerHTML=1;
        }
    }
);}
/**********************************************************************/
// the user name to its profile
function towardsSomeProfile(){
    // the user header link,set the id of current user
    localStorage.setItem("towardsSomeProfile", localStorage.getItem("id"));
    window.location.href="profile2.html";
}