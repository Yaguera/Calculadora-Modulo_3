const display = document.getElementById('display')
const buttons = document.querySelectorAll('button')
console.log(buttons)

class Calculadora {

}

buttons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
        const value = e.target.innerText;
        if (parseFloat(value) >= 0 || value == ",") {
            console.log(value)
        } else {
            console.log("OP: " + value)
        }
    })
})