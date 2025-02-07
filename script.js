const u_display = document.getElementById("equation")
const d_display = document.getElementById("answer")

window.addEventListener("load", () => {
    const u_display_saved = localStorage.getItem("u_display_value");
    const d_display_saved = localStorage.getItem("d_display_value");

    if (u_display_saved !== null) {
      u_display.value = u_display_saved;
    }
    if (d_display_saved !== null) {
      d_display.value = d_display_saved;
    }
  });

  function saveToLocalStorage() {
    localStorage.setItem("u_display_value", u_display.value);
    localStorage.setItem("d_display_value", d_display.value);
  }

  u_display.addEventListener("input", saveToLocalStorage);
  d_display.addEventListener("input", saveToLocalStorage);

function appendToDisplay(input) {
    d_display.value += input;
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
        return parseFloat(num.toPrecision(8)).toString();
    }
}

function stringify(display_value) {
    let s = String(display_value);
    s = s.replace('÷', '/');
    s = s.replace('×', '*');
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