let checkbox = document.querySelector(".checkbox");
let button = document.getElementById("contact-us-button");
let checked = false;
let alertSpan = document.getElementById("alert");
let nameSpan = document.getElementById("name-span");
let phoneSpan = document.getElementById("phone-span");
let formContainer = document.getElementById("form-container");
let thankYouContainer = document.getElementById("thank-you-container");
let errorContainer = document.getElementById("error-container");

document.getElementById("question").addEventListener("input", function (event) {
    event.target.setAttribute("rows", "3");
});


checkbox.addEventListener("click", function (event) {
    if (!checked) {
        checked = true;
        event.target.classList.add("checked");
        button.classList.remove("blocked");
        button.removeAttribute("disabled");
    } else {
        checked = false;
        event.target.classList.remove("checked");
        button.classList.add("blocked");
        button.setAttribute("disabled", "");
    }
});


button.addEventListener("click", function (event) {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const question = document.getElementById("question").value;
    if (window.matchMedia("(max-width: 767px)").matches)
        if (name === "" || phone === "") {
            if (name === "") {
                nameSpan.removeAttribute("hidden")
            } else if (name !== "") {
                nameSpan.setAttribute("hidden", "")
            }
            if (phone === "") {
                phoneSpan.removeAttribute("hidden")
            } else if (phone !== "") {
                phoneSpan.setAttribute("hidden", "")
            }
            if (!checked) {
                alertSpan.textContent = "Будь ласка, надайте згоду на обробку персональних даних"
            }
            alertSpan.removeAttribute("hidden");
        } else if (!checked) {
            alertSpan.textContent = "Будь ласка, надайте згоду на обробку персональних даних";
            alertSpan.removeAttribute("hidden");
        } else {
            const http = new XMLHttpRequest();
            http.open("POST", "https://optic-server.herokuapp.com/contact", true);
            http.setRequestHeader("Content-Type", "application/json");
            http.send(JSON.stringify({
                name: name,
                email: email,
                phone: phone,
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
