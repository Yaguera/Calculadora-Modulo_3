
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
        //check se texto no display esta vazio e se a operação não é a "C"
        if (displayText.innerText === "" && operation !== "C") {
            // se sim, e o texto da expressão não estiver vazio, irá executar a troca de sinal caso seja solicitado
            if (expressionText.innerText !== "") {
                this.changeOperation(operation)
            }
            return
        }

        let operationValue;
        const previusNumber = +this.expressionText.innerText.split(" ")[0]; //separando a expressão pelo espaço e pegando o índice 0, que é apenas o numero.
        const currentNumber = +this.displayText.innerText;

        switch (operation) {
            case "+":
                operationValue = previusNumber + currentNumber
                this.updateScreen(operationValue, operation, currentNumber, previusNumber)
                break;
            case "-":
                operationValue = previusNumber - currentNumber;
                this.updateScreen(operationValue, operation, currentNumber, previusNumber);
                break;
            case "*":
                operationValue = previusNumber * currentNumber;
                this.updateScreen(operationValue, operation, currentNumber, previusNumber);
                break;
            case "/":
                operationValue = previusNumber / currentNumber;
                this.updateScreen(operationValue, operation, currentNumber, previusNumber);
                break;
            case "DEL":
                this.processDel()
                break;
            case "CE":
                this.processClearCurrentOperation()
                break;
            case "C":
                this.processClearAll()
                break;
            case "=":
                this.processEqual()
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

    changeOperation(operation) {
        const mathOperations = ["+", "-", "*", "/"]
        //  check se o valor solicitado é algum desses símbolos matematicos
        if (!mathOperations.includes(operation)) {
            return
        }
        this.expressionText.innerText = this.expressionText.innerText.slice(0, -1) + operation; // se sim, irá remover o ultimo caractere da string (no caso a operação) e adicionar a nova operação solicitada.
    }

    processDel() {
        this.displayText.innerText = this.displayText.innerText.slice(0, -1)
    }

    processClearCurrentOperation() {
        this.displayText.innerText = ""
    }

    processClearAll() {
        this.displayText.innerText = "";
        this.expressionText.innerText = "";
    }

    processEqual() {
        let operation = this.expressionText.innerText.split(" ")[1]
        this.processOperation(operation)
    }

}

const calc = new Calculadora(displayText, expressionText)

document.addEventListener("keydown", function (e) {
    const key = e.key;
    if (/\d/.test(key) || key === ".") {
        calc.addDigit(key);
    } else if (["+", "-", "*", "/", "="].includes(key)) {
        calc.processOperation(key);
    }
});