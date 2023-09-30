const col_count = parseInt(getComputedStyle(document.querySelector(".carousel")).getPropertyValue("--col-count"));
const image_count = document.querySelectorAll(".photo").length; 
const max_index = Math.ceil(image_count / col_count);

const progressBar = document.querySelector(".progress_bar");

const vehicle = document.querySelector(".vehicle");
vehicle.style.backgroundColor = "red";

// Une fonction pour savoir si je suis bien dans le handle progress.
const toggleBg = () => {
    if(vehicle.style.backgroundColor === "red"){
        vehicle.style.backgroundColor = "white"; 
    } else {
        vehicle.style.backgroundColor = "red"; 
    }
}

function handleProgressBar(active_index){
    toggleBg();
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

function onHandleClick(handle) {
    const slider = handle.closest(".container").querySelector(".slider");
    const sliderIndex = parseInt(getComputedStyle(slider).getPropertyValue("--slider-index"));
    let value;
    if(handle.classList.contains("left_handle")){
        value = sliderIndex === 0 ? max_index - 1 : sliderIndex - 1;
        if (value === max_index -1){
            vehicle.style.backgroundColor = "blue";
        }
    } else if(handle.classList.contains("right_handle")){
        value = sliderIndex === max_index - 1 ? 0 : sliderIndex + 1;
    }
    slider.style.setProperty("--slider-index", value);
    handleProgressBar(value);
}

