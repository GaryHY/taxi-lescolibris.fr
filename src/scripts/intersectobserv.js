const herotitle = document.querySelector(".hero__title");
const navbar = document.getElementById("nav");
const cards = document.querySelectorAll(".card__element");
const title = document.getElementById("qualityheader");
const cardtitle = document.querySelector(".card__title");
const lastline = document.getElementById("lastline");
const vehicletitle = document.querySelector(".vehicle__title");
const rightcase = document.querySelector("[data-position=right]")

const moveBtn = (e) => {
    const buttonContainer = document.querySelector(".button__container");
    if(!e[0].isIntersecting) {
        buttonContainer.classList.add("floating");
        cards.forEach(card => {
            card.classList.add("animateCard");
        })
        title.classList.add("animateHeading");
    } else if (e[0].isIntersecting) {
        buttonContainer.classList.remove("floating");
        cards.forEach(card => {
            card.classList.remove("animateCard");
        })
        title.classList.remove("animateHeading");
    }
}

const displayPostalCard = (e) => {
    const postalCard = document.querySelector(".about__card");
    const aboutheader = document.getElementById("aboutheader");
    if(!e[0].isIntersecting) {
        aboutheader.classList.add("animateHeading");
        postalCard.classList.add("fade");
    } else if (e[0].isIntersecting) {
        aboutheader.classList.remove("animateHeading");
        postalCard.classList.remove("fade");
    }
}

const displayVehicle = (e) => {
    const vehicleheader = document.getElementById("vehicleheader");
    const carousel = document.querySelector(".carousel");
    if(!e[0].isIntersecting) {
        vehicleheader.classList.add("animateHeading");
        carousel.classList.add("fade");
    } else if (e[0].isIntersecting) {
        vehicleheader.classList.remove("animateHeading");
        carousel.classList.remove("fade");
    }
}

const displayVehicle2 = (e) => {
    const vehicle2 = document.querySelector(".vehicle__description");
    !e[0].isIntersecting ? vehicle2.classList.add("fade") : vehicle2.classList.remove("fade");
}

const displayService = (e) => {
    const serviceheader = document.getElementById("servicesheader");
    const leftservice = document.querySelector(".services");
    const rightservice = document.querySelector(".service__description");
    if(!e[0].isIntersecting) {
        serviceheader.classList.add("animateHeading");
        leftservice.classList.add("fade");
        rightservice.classList.add("slideUp");
    } else if (e[0].isIntersecting) {
        serviceheader.classList.remove("animateHeading");
        leftservice.classList.remove("fade");
        rightservice.classList.remove("slideUp");
    }
}

const displayContact = (e) => {
    const contactheader = document.getElementById("contactheader");
    const contactsection = document.querySelector(".contact__content");
    if(!e[0].isIntersecting) {
        contactheader.classList.add("animateHeading");
        contactsection.classList.add("getBig");
    } else if (e[0].isIntersecting) {
        contactheader.classList.remove("animateHeading");
        contactsection.classList.remove("getBig");
    }
}

const displayFooter = (e) => {
    const footerheader = document.getElementById("footerheader");
    const footersection = document.querySelector(".footer");
    if(!e[0].isIntersecting) {
        footerheader.classList.add("animateHeading");
        footersection.classList.add("getBig");
    } else if (e[0].isIntersecting) {
        footerheader.classList.remove("animateHeading");
        footersection.classList.remove("getBig");
    }
}


// TODO: try to finish the function to make this function more generalized, it doesnt make sense to have so much
// repetition.
// const displaySection = (e, header, section) => {
//     if(!e[0].isIntersecting) {
//         header.classList.add("animateHeading");
//         section.classList.add("fade");
//     } else if (e[0].isIntersecting) {
//         header.classList.remove("animateHeading");
//         section.classList.remove("fade");
//     }
// }

const moveBtnIntersectObs = new IntersectionObserver(moveBtn);
// moveBtnIntersectObs.observe(herotitle);
moveBtnIntersectObs.observe(navbar);

const postalCardIntersectObs = new IntersectionObserver(displayPostalCard);
postalCardIntersectObs.observe(cardtitle);

const vehicleIntersectObs = new IntersectionObserver(displayVehicle);
vehicleIntersectObs.observe(lastline);

const vehicleBlocIntersectObs = new IntersectionObserver(displayVehicle2);
vehicleBlocIntersectObs.observe(vehicletitle);

const serviceIntersectObs = new IntersectionObserver(displayService);
serviceIntersectObs.observe(rightcase);

const contactIntersectObs = new IntersectionObserver(displayContact);
contactIntersectObs.observe(contactintersect);

// const footerIntersect = new IntersectionObserver(displayFooter);
// footerIntersect.observe(nameintersect);
