// Des variables interessantes pour le debut.
const col_count = parseInt(getComputedStyle(document.querySelector(".carousel")).getPropertyValue("--col-count"));
const image_count = document.querySelectorAll(".photo").length; 
const max_index = Math.ceil(image_count / col_count);

const progressBar = document.querySelector(".progress_bar");

// // On cree les divs pour la barre de progression:
function handleProgressBar(active_index){
    progressBar.innerHTML = "";
    for(let i=0; i<max_index; i++){
        const item = document.createElement("div"); 
        item.classList.add("progress_bar_item");
        if(i === active_index){
            item.classList.add("active");
        }
        progressBar.appendChild(item);
    }
}

handleProgressBar(0);

document.addEventListener("click", e => {
    let handle;
    if (e.target.matches(".handle")){
        handle = e.target;
    } else {
        handle = e.target.closest(".handle");
    }
    if (handle !== null ) onHandleClick(handle);
})

// TODO: Changer la circularite de la linked list. Pour cela il faut aller chercher les images dans une base de donnee 
// et elles ne sont pas hardcoder dans le html. L'idee serait de manipuler le dom element depuis javascript et de
// travailler avec une linked list circulaire contenant tous les elements de la liste.
function onHandleClick(handle) {
    const slider = handle.closest(".container").querySelector(".slider");
    const sliderIndex = parseInt(getComputedStyle(slider).getPropertyValue("--slider-index"));
    let value;
    if(handle.classList.contains("left_handle")){
        value = sliderIndex === 0 ? max_index-1 : sliderIndex - 1;
    } else if(handle.classList.contains("right_handle")){
        value = sliderIndex === max_index - 1 ? 0 : sliderIndex + 1;
    }
    slider.style.setProperty("--slider-index", value);
    handleProgressBar(value);
}

