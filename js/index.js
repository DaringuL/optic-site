document.getElementById("contact-form-button").addEventListener("click", function (){
    window.location.href="html/contact-us.html#contact";
});

document.getElementById("prices-button").addEventListener("click", function (){
    window.location.href="html/prices.html";
})
let year = new Date().getUTCFullYear().toString();
document.querySelector(".year").innerHTML = year;