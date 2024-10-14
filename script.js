const add =  (a, b) => a + b;
const sub = (a, b) => a - b;
const multi = (a, b) => a * b;
const divide = (a, b) => a / b;

let firstNumber = null;
let operator = "";
let secondNumber = null;

function operate(firstNumber, secondNumber, operator) {
    let answer = 0
    firstNumber = parseFloat(firstNumber);
    secondNumber = parseFloat(secondNumber);
    switch (operator) {
        case "+":
            answer = add((firstNumber),(secondNumber));
            break;
        case "-":
            answer = sub(firstNumber, secondNumber);
            break;
        case "*":
            answer = multi(firstNumber, secondNumber);
            break;
        case "/":
            if (secondNumber === 0) {
                return "ERROR";
            }
            answer = divide(firstNumber, secondNumber);
            break;
        default:
            answer = firstNumber;
            break;
    }
    return answer;
}

const calculator = document.querySelector("#calculator");
const display = document.querySelector("#display");
const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operators");
const special = document.querySelectorAll(".special");
display.textContent = "0"

numbers.forEach((num) => {
    num.addEventListener("click",  () => {
        if (display.textContent === "0") {
            display.textContent = num.textContent
        } else {
            display.textContent += num.textContent;
        }
    })})

operators.forEach((op) => {
    op.addEventListener("click", () => {
        if (op.id === "equal") {
            if (firstNumber !== null) {
                secondNumber = parseFloat(display.textContent);
                display.textContent = operate(firstNumber, secondNumber, operator);
                firstNumber = null;
                operator = "";
                secondNumber = null;
            }
        } else {
            if (firstNumber === null) {
                firstNumber = parseFloat(display.textContent);
                operator = op.id;
                display.textContent = "";
            } else {
                secondNumber = parseFloat(display.textContent);
                display.textContent = operate(firstNumber, secondNumber, operator);
                firstNumber = parseFloat(display.textContent);
            }
            operator = op.id;
            display.textContent = "";
        }
    })
})

special.forEach((spec) => {
    spec.addEventListener("click", () => {
        switch (spec.textContent) {
            case "C":
                display.textContent = "";
                firstNumber = null;
                operator = "";
                secondNumber = null;
                break;
            case "del": 
                display.textContent = display.textContent.length > 1 
                ? display.textContent.slice(0, -1)
                : "0";
            case "%":
                display.textContent = parseFloat(display.textContent) / 100;
            case "+/-":
                display.textContent *= -1;

            case ".":
                if (display.textContent.includes(".")) {
                    break;
                }
                display.textContent += ".";
            default:
                break;
        }
    })
})