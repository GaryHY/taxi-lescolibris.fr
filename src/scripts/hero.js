// const heroBody = document.querySelector(".hero__body");
const title = document.querySelector(".hero__title");
const cards = document.querySelectorAll(".card__element");

const moveBtn = (e) => {
    const buttonContainer = document.querySelector(".button__container");
    if(!e[0].isIntersecting) {
        buttonContainer.classList.add("floating");
        cards.forEach(card => {
            card.classList.add("animateCard");
        })
    } else if (e[0].isIntersecting) {
        buttonContainer.classList.remove("floating");
        cards.forEach(card => {
            card.classList.remove("animateCard");
        })
    }
}

const moveBtnIntersectObs = new IntersectionObserver(moveBtn);


// moveBtnIntersectObs.observe(heroBody);
moveBtnIntersectObs.observe(title);




