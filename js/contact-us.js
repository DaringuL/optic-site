let checkbox = document.querySelector(".checkbox");
let button = document.getElementById("contact-us-button");
let checked = false;
let alertSpan = document.getElementById("alert");
let nameSpan = document.getElementById("name-span");
let phoneSpan = document.getElementById("phone-span");
let formContainer = document.getElementById("form-container");
let thankYouContainer = document.getElementById("thank-you-container");
let errorContainer = document.getElementById("error-container");
let phoneWrong = document.getElementById("phone-wrong");

document.getElementById("question").addEventListener("input", function (event) {
    event.target.setAttribute("rows", "3");
});


checkbox.addEventListener("click", function (event) {
    if (!checked) {
        checked = true;
        event.target.classList.add("checked");
    } else {
        checked = false;
        event.target.classList.remove("checked");
    }
});


button.addEventListener("click", function () {

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const question = document.getElementById("question").value;
    let formattedPhone = phoneValidation(phone);
    if (name === "" || !checked || formattedPhone === false) {
        if (name === "") {
            nameSpan.removeAttribute("hidden")
        } else {
            nameSpan.setAttribute("hidden", "")
        }
        if (phone === "") {
            phoneSpan.removeAttribute("hidden");
        } else {
            phoneSpan.setAttribute("hidden", "");
            if (formattedPhone === false) {
                phoneWrong.removeAttribute("hidden");
            } else {
                phoneWrong.setAttribute("hidden", "")
            }
        }
        if (!checked) {
            alertSpan.removeAttribute("hidden");
        } else {
            alertSpan.setAttribute("hidden", "");
        }
    } else {
        showLoadingSpinner();
        const http = new XMLHttpRequest();
        http.open("POST", "https://optic-server.herokuapp.com/contact", true);
        http.setRequestHeader("Content-Type", "application/json");
        http.send(JSON.stringify({
            name: name,
            email: email,
            phone: formattedPhone,
            question: question
        }))
        http.onload = function () {
            // alert(http.responseText);
            formContainer.setAttribute("hidden", "");
            thankYouContainer.removeAttribute("hidden");
            resetForm();
        }
        http.onerror = function () {
            formContainer.setAttribute("hidden", "");
            errorContainer.removeAttribute("hidden");
        }
    }

})

function resetForm() {
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
    document.getElementById("question").value = "";
    nameSpan.setAttribute("hidden", "");
    phoneSpan.setAttribute("hidden", "");
    alertSpan.setAttribute("hidden", "");
    checkbox.classList.remove("checked");
    button.classList.add("blocked");
    button.setAttribute("disabled", "");
}

let year = new Date().getUTCFullYear().toString();
document.querySelector(".year").innerHTML = year;

function showLoadingSpinner() {
    let spinner = document.querySelector(".spinner-border");
    let loading = document.querySelector(".sr-only");
    loading.removeAttribute("hidden");
    spinner.removeAttribute("hidden");
    let send = document.querySelector(".send");
    send.setAttribute("hidden", "");
    button.setAttribute("disabled", "");
}

function phoneValidation(phone) {
    let numbers = [...phone];
    let allowedChars = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    function filterNumbers(num) {
        if (allowedChars.includes(num)) return num
    }

    let filteredNumbers = numbers.filter(filterNumbers);
    if (filteredNumbers.length === 10) return filteredNumbers.join("");
    if (filteredNumbers.length === 12) {
        if (filteredNumbers[0] === "3" && filteredNumbers[1] === "8" && filteredNumbers[2] === "0") {
            return filteredNumbers.splice(2).join("")
        }
    }
    return false
}