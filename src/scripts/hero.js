const heroBody = document.querySelector(".hero__body");

const moveBtn = (e) => {
    const buttonContainer = document.querySelector(".button__container");
    if(!e[0].isIntersecting) {
        buttonContainer.classList.add("floating");
    } else if (e[0].isIntersecting) {
        buttonContainer.classList.remove("floating");
    }
}

const moveBtnIntersectObs = new IntersectionObserver(moveBtn);


moveBtnIntersectObs.observe(heroBody);




