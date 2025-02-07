const u_display = document.getElementById("equation")
const d_display = document.getElementById("answer")

function stringify(display_value) {
    let s = String(display_value);
    s = s.replace('÷', '/');
    s = s.replace('×', '*');
    return s
}

function last_element_index(s) {
    const symbols = "+-/%";
    for (const c of s) {
        if(symbols.includes(c)) {
            return s.indexOf(c);
        }
    }
    return 0;
}

function appendToDisplay(input) {
    d_display.value += input;
}

function clearDisplay() {
    u_display.value = "";
    d_display.value = "";
}

function changeSign() {
    s = stringify(d_display.value);
    a = last_element_index(s);
    console.log(a);

}

function calculate() {
    s = stringify(d_display.value)

    u_display.value = d_display.value;
    d_display.value = eval(s);
}