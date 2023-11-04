const inputs = document.querySelectorAll(".field");
const form = document.getElementById("form")
const nom = document.getElementById("nom");
const email = document.getElementById("email");
const prenom = document.getElementById("prenom");
const message = document.getElementById("message");

const checkInput = (inputElement) => {
    const label = inputElement.parentElement; 
    const labelline = label.querySelector(".labelline");
    if (inputElement.value !== "") { labelline.setAttribute("data-focus", "true")
    } else {
        labelline.setAttribute("data-focus", "false")
    }
}

inputs.forEach((input) => {
    checkInput(input);
    // NOTE: Je peux appeler validate input, ici aussi !
    input.addEventListener("change", () => { 
        validateInputs();
        checkInput(input);
    })
})

const setError = (element, message) => {
    const label = element.parentElement;
    const errorDisplay = label.querySelector(".error");
    errorDisplay.innerText = message; 
    label.classList.add("fail");
    label.classList.remove("success");
}

const setSuccess = (element) => {
    const label = element.parentElement;
    const errorDisplay = label.querySelector(".error");
    errorDisplay.innerText = ""; 
    label.classList.add("success");
    label.classList.remove("fail");
}

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs= () => {
    const prenomValue = prenom.value.trim();
    const nomValue = nom.value.trim();
    const emailValue = email.value.trim();
    const messageValue = message.value.trim();

    let isNomValid = false; 
    let isPrenomValid = false;
    let isEmailValid = false; 
    let isMessageValid = false;
    
    if(prenomValue === "") {
        isPrenomValid = false;
        setError(prenom, "Le prenom est requis"); 
    } else { 
        isPrenomValid = true;
        setSuccess(prenom) 
    } 

    if (nomValue === "") {
        isNomValid = false;
        setError(nom, "Le nom est requis"); 
    } else { 
        isNomValid = true;
        setSuccess(nom) 
    }

    if(messageValue === ""){
        isMessageValid = false;
        setError(message, "Le message est requis"); 
    } else { 
        isMessageValid = true;
        setSuccess(message) 
    }

    if(emailValue === ""){
        isEmailValid = false;
        setError(email, "Le mail entre ne correspond pas...");
    }
    else if(!isValidEmail(emailValue)){
        isEmailValid = false;
        setError(email, "Le mail entre ne correspond pas...");
    } else {
        isEmailValid = true;
        setSuccess(email);
    }
    return isNomValid && isPrenomValid && isEmailValid && isMessageValid;
}

const resetInputs = () => {
    nom.value = "";
    email.value = "";
    prenom.value = "";
    message.value = "";
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (validateInputs()){
        let formData = {
            nom: nom.value,
            prenom: prenom.value,
            email: email.value,
            message: message.value,
        };
        resetInputs();
        const url = "https://transports-lescolibris.netlify.app/.netlify/functions/sendMail";
        await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        })

        const modal = document.querySelector(".modal_contact");
        modal.showModal();
        setTimeout(() => modal.close(), 2000);
    }
})
