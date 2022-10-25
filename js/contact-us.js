document.getElementById("contact-us").addEventListener("click", function (event) {

    var name = document.getElementById("name").value;
    var surname = document.getElementById("surname").value;
    var phone = document.getElementById("question").value;
    var question = document.getElementById("question").value;

    var http = new XMLHttpRequest();
    http.open("POST", "http://localhost:3000/contact", true);
    http.setRequestHeader("Content-Type", "application/json");
    http.send(JSON.stringify({
        name: name,
        surname: surname,
        phone: phone,
        question: question
    }))
    http.onload = function() {
        alert(http.responseText);
        alert("Дякуємо!")
    }
    http.onerror = function () {
        alert("На жаль, зараз цей сервіс недоступний. Будь-ласка зателефонуйте нам за номером: 093 162 81 44")
    }
    event.preventDefault();

    document.getElementById("contact-form").reset();


})