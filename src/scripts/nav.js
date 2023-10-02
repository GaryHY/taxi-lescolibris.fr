const primaryNav = document.querySelector("#primary-navigation");
const navToggle = document.querySelector(".mobile-nav-toggle");
const nav = document.querySelector(".nav");

navToggle.addEventListener("click", ()=>{
    const visible = primaryNav.getAttribute("data-visible");
    if(visible === "true"){
        navToggle.setAttribute("aria-expanded", "false");
        primaryNav.setAttribute("data-visible", "false");
    } else {
        navToggle.setAttribute("aria-expanded", "true");
        primaryNav.setAttribute("data-visible", "true");
    }

})
