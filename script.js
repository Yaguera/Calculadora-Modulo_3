const displayText = document.getElementById('display-text');
const buttons = document.querySelectorAll('button');
console.log(buttons)

class Calculadora {
    constructor(displayText) {
        this.displayText = displayText;
        this.currentDisplayText = "";
    }

    adicionarDigito(digito) {
        this.currentDisplayText = digito
        this.updateScreen()
    }
    updateScreen() {
        this.displayText.innerText += this.currentDisplayText;
    }
}

const calc = new Calculadora(displayText)

buttons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
        const value = e.target.innerText;
        if (parseFloat(value) >= 0 || value == ",") {
            calc.adicionarDigito(value)
        } else {
            console.log("OP: " + value)
        }
    })
})