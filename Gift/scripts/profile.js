// Design purposes
setTimeout(() => {
    let animationArea= document.querySelector(".animation-area");
    let profileCard  =  document.querySelector(".card");
    // console.log(animationArea);
    animationArea.setAttribute("class", "animation-area antimated");
    profileCard.style.display="block";
}, 1600);
