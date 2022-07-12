let nameInputDom = document.querySelector("#nameInput");
let descriptionInputDom = document.querySelector("#descInput");
let priceInputDom = document.querySelector("#priceInput");
let imageInputDom = document.querySelector("#image");
const imagepreview = document.querySelector('#imgPreview');
// let postBtnDom= document.querySelector("#post");
let postFormDom= document.querySelector("#postForm");
//
postFormDom.addEventListener('submit', createGift);
imageInputDom.addEventListener('change', uploadImage);


let giftImage; //global variable used in uploadImage() and createGift()
function uploadImage(e){
    // console.log(imageInputDom.files[0]);
    let file = imageInputDom.files[0];  // this is reffered to the even target "imageInputDom".
    // console.log(file);
    let F_reader= new FileReader();
    if (file) {
        F_reader.readAsDataURL(file);
    }
    F_reader.addEventListener("load", function () {
        // convert image file to base64 string
        giftImage=F_reader.result;
        imagepreview.src = F_reader.result;
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
};

let stringTagPreview =document.querySelector("#string-tag-preview");
// console.log(stringTagPreview);
let selectDom =document.querySelector("#category");
// console.log(selectDom);
// console.log(selectDom.value);
//
selectDom.addEventListener('change', makeTagSrtring);

function makeTagSrtring(){
    stringTagPreview.innerHTML+=selectDom.value+" ";
};

function createGift(e){
    let giftName= nameInputDom.value;
    let giftDescribtion= descriptionInputDom.value;
    let giftPrice= priceInputDom.value;
    // console.log(giftImage);
    if(giftName&&giftDescribtion&&giftPrice&&giftImage!=""){
        let productsMainSource = JSON.parse( localStorage.getItem("AllProducts") );
        let newGift = {
            Comments: [],
            desc: giftDescribtion,
            id: productsMainSource.length + 1 ,
            imageURL: giftImage?giftImage :"",
            inCart: false,
            likes: 0,
            name: giftName,
            price: giftPrice,
            belongsTo: localStorage.getItem("id"),
            tags: stringTagPreview.innerHTML|| "",
        };
        /***********************************************************************/
        /**********************************************************************/
        /*********************************************************************/
        productsMainSource=[...productsMainSource, newGift];
        // console.log(productsMainSource);
        localStorage.setItem("AllProducts", JSON.stringify( productsMainSource ));
        /*********************************************************************/
        /**********************************************************************/
        /***********************************************************************/
        nameInputDom.value="";
        descriptionInputDom.value="";
        priceInputDom.value="";
        imagepreview.src= "images/imagePreview.png";

        setTimeout(() => {
            window.location.href="index.html";
        }, 1000);
    }else{
        alert("Enter Your Gift Data in order to Post!");
    }
};
/*******************************************************************************/
/*******************************************************************************/
/*******************************************************************************/


















