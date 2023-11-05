
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
    }



    processOperation(operation) {
        let operationValue;
        const previusNumber = +this.expressionText.innerText.split(" ")[0];
        const currentNumber = +this.displayText.innerText;

        switch (operation) {
            case "+":
                operationValue = previusNumber + currentNumber
                this.updateScreen(operationValue, operation, currentNumber, previusNumber)
                console.log("Previus: " + previusNumber)
                console.log("Current: " + currentNumber)
                break;
            default:
                return;
        }

    }


    updateScreen(
        operationValue = null,
        operation = null,
        currentNumber = null,
        previusNumber = null
    ) {
        console.log(operationValue, operation, currentNumber, previusNumber)
        if (operationValue === null) {
            this.displayText.innerText += this.digitPressed;
        } else {
            if (previusNumber === 0) {
                operationValue = currentNumber
            }
            this.expressionText.innerText = `${operationValue} ${operation}`
            this.displayText.innerText = ""
        }
    }

}

const calc = new Calculadora(displayText, expressionText)
