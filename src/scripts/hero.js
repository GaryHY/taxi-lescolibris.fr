const heroBody = document.querySelector(".hero__body");

const moveBtn = (e) => {
    const buttonContainer = document.querySelector(".button__container");
    if(!e[0].isIntersecting) {
        console.log("We need to add the mail button");
        buttonContainer.classList.add("floating");
    } else if (e[0].isIntersecting) {
        console.log("We need to leave the button in its current form.");
        buttonContainer.classList.remove("floating");
    }
    console.log(e);
}

const moveBtnIntersectObs = new IntersectionObserver(moveBtn);


moveBtnIntersectObs.observe(heroBody);




