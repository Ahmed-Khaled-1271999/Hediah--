let product_ProductsLandingDB=localStorage.getItem("AllProducts");
product_ProductslocalDestination=JSON.parse(product_ProductsLandingDB);
itemID=localStorage.getItem("towardsWhichProduct");
let productDOM= document.querySelector(".product");
let catchedGift=product_ProductslocalDestination.find((gift)=>gift.id==itemID);
// console.log(catchedGift);
// console.log(catchedGift.Comments);
/**
 * Draw html elements that is unique
 */
(function drawProductUI(){
  let InoculatedHTML =`
  <div class="product-preview">
        <img src="${catchedGift.imageURL}" alt="">
        </div>
        <div class="container">
            <div class="like-comment-stripe">
                <ul>
                    <li> <i class="fa fa-heart fa-lg"></i> <span id="likes-value">${catchedGift.likes}k</span></li>
                    <li> <i class="fa fa-comment fa-lg"></i>   <span id="comments-value">${catchedGift.Comments.length}</span></li>
                </ul>
            </div>
            <div class="product-Info">
                <h3 class="glow">Gift Describtion</h3>
                <p>${catchedGift.name}<br>${catchedGift.desc}<br>${catchedGift.price}$</p>
            </div>                 
        </div>
    </div> 
  `;
  productDOM.innerHTML=InoculatedHTML;
})();
/********************************************************************************************************************/
/********************************************************************************************************************/
/********************************************************************************************************************/
let commentBag   = document.querySelector(".comment-bag");
// console.log(commentBag);
drawComments(catchedGift.Comments);
function drawComments(Comments=[]){
  let InoculatedHTML = Comments.map( (acomment, index)=>{
        let html= `
        <div class="comment-window">
            <div  class="comment-head">
                <div class="a-user-image" onmouseenter="showPrfilePopUp(${index})"  onmouseleave="hidePrfilePopUp(${index})"><img src="${acomment.user.image}" alt=""></div>
                <div class="a-user-name" >${acomment.user.name}</div>
                <div class="profile-pop-up">
                    <div class="image"> <img src="${acomment.user.image}" alt=""> </div>
                    <div class="info">
                        <h4> <a onclick="towardsSomeProfile(${acomment.user.id})">${acomment.user.name}</a></h4>
                        <p>${acomment.user.name==" Ahmed Khaled "? "CEO & Founder, هدية":"Member at هدية"}</p>
                        <div class="reach">
                            <div> <span class="title">Likes </span> <span class="number">120 </span> </div>
                            <div> <span class="title">Earns </span> <span class="number">980$</span> </div>
                            <div> <span class="title">Gifts </span> <span class="number">25  </span> </div>
                        </div>
                        <button>Call</button>                             
                    </div>
                </div>
            </div>


            <div class="comment-itself">${acomment.comment}
                ${(acomment.user.id===localStorage.getItem("id") )?`
                <i class="fas fa-ellipsis-h control-icon" onclick="showControlMenu(${acomment.id})"></i>
                ` 
                : ""} 
                ${acomment.user.id===localStorage.getItem("id") ? `
                    <div id="${acomment.id}" class="control-menu"> 
                        <p class="edit" onclick="editComment(${acomment.id})">Edit</p>
                        <p class="delete" onclick="removeComment(${acomment.id})">Delete</p>
                    </div>
                `:""}
            </div>
        </div>
    `;
    return html;
  });
  commentBag.innerHTML = InoculatedHTML.join("");
};
/*********************************************************************************/
// show profile on mouse enter
let profilePopUp_s = document.querySelectorAll(".profile-pop-up");
// console.log( Array.from(profilePopUp_s) );
let userImage_s = document.querySelectorAll(".a-user-image");
// console.log( Array.from(userImage_s) );
/**hover(func1, func2) is abetter solution with Jquery */
function showPrfilePopUp(index){
    // console.log( profilePopUp_s[index]);
    setTimeout(() => {
        profilePopUp_s[index].style.display="flex";
    }, 200);
}
function hidePrfilePopUp(index){
    // console.log( profilePopUp_s[index]);
    setTimeout(() => {
        profilePopUp_s[index].style.display="none";
    }, 2000);
}
function towardsSomeProfile(id){
    // console.log(id);
    localStorage.setItem("towardsSomeProfile",id);
    window.location.href="profile2.html";
}
/***********************************************************************************************************/
let commentInputDOM= document.querySelector("#comment");
// console.log(commentInputDOM);
commentInputDOM.addEventListener('keypress', writeComment);
function writeComment(e){
    // console.log("you key pressed");
    if (e.key === 'Enter') {
        // console.log("you key pressed is Enter!");
        // console.log(commentInputDOM.value);
        // create comment object the bust it to comments array of the product
        let anID = catchedGift.Comments.length!=0 ? catchedGift.Comments.length : 1; 
        let newComment={
            id: ++anID, 
            user:{
                id: localStorage.getItem("id"),
                image:localStorage.getItem("userImage") || "images/users/Default.png",
                name :localStorage.getItem("userName"),
            },
            comment:commentInputDOM.value,
        }
        catchedGift.Comments=[...catchedGift.Comments, newComment];
        drawComments(catchedGift.Comments);
        /*************************************************************************************/
        /************************************************************************************/
        /***********************************************************************************/
        localStorage.setItem("AllProducts", JSON.stringify(product_ProductslocalDestination));
        /***********************************************************************************/
        /************************************************************************************/
        /*************************************************************************************/
        commentInputDOM.value="";
    }
}
/****icon to update or delete the comment*///////////
let controlIcons_nodeList= document.querySelectorAll(".control-icon");
let controlIcons = Array.from(controlIcons_nodeList);
// console.log(controlIcons);
let showed = false;
function showControlMenu(id){
    let controlMenus_nodeList= document.querySelectorAll(".control-menu");
    let controlMenus = Array.from(controlMenus_nodeList);
    // console.log(controlMenus);
    // console.log(+controlMenues[0].id);
    // console.log(id);
    for(let i=0; i<controlMenus.length; i++){
        if(+controlMenus[i].id == id ){
            if( !showed){
                controlMenus[i].style.display= "block";
                showed=true;
            }else{
                controlMenus[i].style.display= "none";
                showed=false;
            }
        }
    }
};
//.. get the input Dom of edition not creation
let updateCommentInput=document.querySelector("#comment-up"); // in css the diplay of it is none
// console.log(updateCommentInput);
updateCommentInput.addEventListener('keypress', uploadEditedComment);
function editComment(id){
    //the whole comments ==> catchedGift.Comments
    let theCommentToEdit=catchedGift.Comments.find(comment=> comment.id === id);
    // console.log(theCommentToEdit);
    // let theIndexOfTheCommentToEdit=catchedGift.Comments.findIndex(comment=> comment.id === id);
    // console.log(theIndexOfTheCommentToEdit);
    commentInputDOM.style.display="none";
    updateCommentInput.value=theCommentToEdit.comment;
    updateCommentInput.setAttribute('commentID', id);
    // console.log(updateCommentInput);
};
function uploadEditedComment(e){
    if (e.key === 'Enter') {
        // console.log(+e.target.getAttribute("commentID"));
        let id = +e.target.getAttribute("commentID");
        // console.log(id);
        //the whole comments ==> catchedGift.Comments
        let theCommentToEdit=catchedGift.Comments.find(comment=> comment.id === id);
        // console.log(theCommentToEdit);
        let theIndexOfTheCommentToEdit=catchedGift.Comments.findIndex(comment=> comment.id === id);
        theCommentToEdit.comment=e.target.value;
        catchedGift.Comments[theIndexOfTheCommentToEdit];
        /*************************************************************************************/
        /************************************************************************************/
        /***********************************************************************************/
        localStorage.setItem("AllProducts", JSON.stringify(product_ProductslocalDestination));
        /***********************************************************************************/
        /************************************************************************************/
        /*************************************************************************************/
        e.target.value==" ";
        updateCommentInput.value="";
        drawComments(catchedGift.Comments);
    }
};
function removeComment(id){
    //the whole comments ==> catchedGift.Comments
    let theCommentToDelete=catchedGift.Comments.find(comment=> comment.id === id);
    // console.log(theCommentToDelete);
    let theIndexOfTheCommentToDelete=catchedGift.Comments.findIndex(comment=> comment.id === id);
    // console.log(theIndexOfTheCommentToDelete);
    catchedGift.Comments.splice(theIndexOfTheCommentToDelete, 1);
    // console.log(catchedGift.Comments);
    /********************************************************//*************************************************************************************/
        /************************************************************************************/
        /***********************************************************************************/
        localStorage.setItem("AllProducts", JSON.stringify(product_ProductslocalDestination));
        /***********************************************************************************/
        /************************************************************************************/
        /*************************************************************************************/
       
    drawComments(catchedGift.Comments);
};



