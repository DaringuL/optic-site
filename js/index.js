document.getElementById("contact-us").addEventListener("click", function (event) {

    var name = document.getElementById("name").value;
    var surname = document.getElementById("surname").value;
    var phone = document.getElementById("question").value;
    var question = document.getElementById("question").value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/contact", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    xhr.send(document.body);
    // xhr.setRequestHeader('Content-Type', 'application/json');
    // xhr.send(JSON.stringify({
    //     name: name,
    //     surname: surname,
    //     phone: phone,
    //     question: question
    // }));
    event.preventDefault();
    alert("Дякуємо за звернення. Зателефонуємо якнайшвидше");
    document.getElementById("contact-form").reset();


})

// {
//     name: name,
//         surname: surname,
//     phone: phone,
//     question: question
// }