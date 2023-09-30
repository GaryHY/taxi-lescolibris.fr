const col_count = parseInt(getComputedStyle(document.querySelector(".carousel")).getPropertyValue("--col-count"));
const image_count = document.querySelectorAll(".photo").length; 
const max_index = Math.ceil(image_count / col_count);

const progressBar = document.querySelector(".progress_bar");

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

// NOTE: ici je vais essayer de voir si la progress bar est presente.
progressBar.style.backgroundColor = "red";
progressBar.style.fontSize = "12rem";

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
    } else if(handle.classList.contains("right_handle")){
        value = sliderIndex === max_index - 1 ? 0 : sliderIndex + 1;
    }
    slider.style.setProperty("--slider-index", value);
    handleProgressBar(value);
}

