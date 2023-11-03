
const displayText = document.getElementById('display-text');
const expressionText = document.getElementById('expression');
const buttons = document.querySelectorAll('button');


buttons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
        const value = e.target.innerText;
        if (+value >= 0 || value === ".") { //+ trasnforma o value de string para number
            calc.addDigit(value)
        } else {
            calc.processOperation(value)
        }
    })
})


class Calculadora {
    constructor(displayText, expressionText) {
        this.displayText = displayText;
        this.expressionText = expressionText;
        this.digitPressed = "";
        this.operation = "";
    }

    addDigit(digit) {
        if (digit === "." && this.displayText.innerText.includes(".")) {
            return
        }
        this.digitPressed = digit
        this.updateScreen()
        console.log(displayText.innerText)
        console.log(this.digitPressed)
    }



    processOperation(operation) {
        if (operation == "=" || operation == "DEL" || operation == "C" || operation == "CE") {
            return
        } else {
            let newExpression = this.displayText.innerText + " " + operation + " "
            this.displayText.innerText = ""
            console.log(newExpression)
            this.operation = newExpression
            this.expressionText.innerText += this.operation;
        }
    }

    updateScreen() {

        this.displayText.innerText += this.digitPressed;

    }

}

const calc = new Calculadora(displayText, expressionText)
