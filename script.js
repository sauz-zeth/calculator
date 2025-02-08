const u_display = document.getElementById("equation")
const d_display = document.getElementById("answer")
const operators = "+-×÷%";

const display = {
    equationElement: document.getElementById("equation"),
    answerElement:  document.getElementById("answer")
}

window.addEventListener("load", () => {
    const displaySaved = {
        equation: localStorage.getItem("equation"),
        answer: localStorage.getItem("answer"),
    }

    if (displaySaved.equation) {
        display.equationElement.value = displaySaved.equation;
    }

    if (displaySaved.answer) {
        display.answerElement.value = displaySaved.answer;
    }

  });

  function saveToLocalStorage() {
    localStorage.setItem("equation", display.equationElement.value);
    localStorage.setItem("answer", display.answerElement.value);
  }

  display.equationElement.addEventListener("input", saveToLocalStorage);
  display.answerElement.addEventListener("input", saveToLocalStorage);

function appendToDisplay(input) {
    if(operators.includes(d_display.value.at(-1)) && operators.includes(input)) {
        d_display.value = d_display.value.slice(0, -1) + input;
    }
    else {
        d_display.value += input;
    }
    saveToLocalStorage();
}

function clearDisplay() {
    u_display.value = "";
    d_display.value = "";
    saveToLocalStorage();
}

function deleteSymbol() {
    d_display.value = d_display.value.slice(0, -1);
    saveToLocalStorage();
}

function formatNumber(num) {
    if (num == 0) {return num};
    if (Math.abs(num) < 1e-5 || Math.abs(num) >= 1e6) {
        return num.toExponential(5);
    } else {
        return parseFloat(num.toPrecision(7)).toString();
    }
}

function stringify(display_value) {
    let s = String(display_value);
    s = s.replace('÷', '/');
    s = s.replace('×', '*');
    s = s.replace(':', '/');
    return s
}

function calculate() {
    s = stringify(d_display.value)

    dvalue = d_display.value;
    try {
        d_display.value = formatNumber(eval(s));
        u_display.value = dvalue;
    } catch (error) {
       u_display.value = 'error'; 
    }
    saveToLocalStorage();
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        calculate()
    }
});

//TODO: функцию, чтобы можно было ввести только один знак
//TODO: добавить : в реплейс

//TDOD: написать в ридми что есть рукописный ввод,
// и что есть функция одного знака

//TODO: исправить код
// написать что процент выполняет функцию остатка от деления как в калькуляторе от apple

//TODO: сделать выполнение calculate на enter