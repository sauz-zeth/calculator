const u_display = document.getElementById("equation")
const d_display = document.getElementById("answer")
const operators = "+-×÷%";
const display_size = 10;

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
    d_display.scrollLeft = d_display.scrollWidth - d_display.clientWidth;
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
    const l = String(num).length;
    if(String(num).length > display_size) {
        if(num >= 10 ** display_size) {
            return num.toExponential(display_size - 4 - String(l).length);
        }
        else {
            return num.toPrecision(display_size - 3);
        }
    }
    return num;
}

function stringify(display_value) {
    let s = String(display_value);
    s = s.replace('÷', '/');
    s = s.replace('×', '*');
    s = s.replace(':', '/');
    s = s.replace(',', '.');
    return s
}

function calculate() {
    s = stringify(d_display.value)

    dvalue = d_display.value;
    try {
        d_display.value = formatNumber(math_calc(s));
        u_display.value = dvalue;
    } catch (error) {
       u_display.value = 'error'; 
       console.log(error);
    }
    saveToLocalStorage();
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        calculate()
    }
});