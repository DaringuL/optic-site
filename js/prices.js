document.getElementById("contact-form-button").addEventListener("click", function (){
    window.location.href="contact-us.html#contact";
});
let year = new Date().getUTCFullYear().toString();
document.querySelector(".year").innerHTML = year;