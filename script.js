// Получаем элементы отображения для верхнего дисплея "выражения" и нижнего дисплея "ответа"
const u_display = document.getElementById("equation");
const d_display = document.getElementById("answer");

const operators = "+-×÷%";
const display_size = 10;

// Объект для работы с элементами отображения
const display = {
    equationElement: document.getElementById("equation"),
    answerElement:  document.getElementById("answer")
};

// Загружаем сохраненные значения из localStorage при загрузке страницы
window.addEventListener("load", () => {
    const displaySaved = {
        equation: localStorage.getItem("equation"),
        answer: localStorage.getItem("answer"),
    };

    // Восстанавливаем значение дисплея выражения, если оно сохранено
    if (displaySaved.equation) {
        display.equationElement.value = displaySaved.equation;
    }

    // Восстанавливаем значение дисплея ответа, если оно сохранено
    if (displaySaved.answer) {
        display.answerElement.value = displaySaved.answer;
    }
});

// Сохраняем текущие значения в калькуляторе в localStorage
function saveToLocalStorage() {
    localStorage.setItem("equation", display.equationElement.value);
    localStorage.setItem("answer", display.answerElement.value);
}

// Добавляем обработчики ввода, чтобы автоматически сохранять изменения при вводе с клавиатуры
display.equationElement.addEventListener("input", saveToLocalStorage);
display.answerElement.addEventListener("input", saveToLocalStorage);

// Добавляет введенный символ в отображение или заменяет последний оператор, если два оператора идут подряд
function appendToDisplay(input) {
    if (operators.includes(d_display.value.at(-1)) && operators.includes(input)) {
        // Заменяем последний оператор, если введен другой оператор
        d_display.value = d_display.value.slice(0, -1) + input;
    } else {
        // Добавляем символ к текущему отображению
        d_display.value += input;
    }

    // Автоматическая прокрутка текста при превышении видимого пространства
    d_display.scrollLeft = d_display.scrollWidth - d_display.clientWidth;
    saveToLocalStorage();
}

// Очищает оба дисплея
function clearDisplay() {
    u_display.value = "";
    d_display.value = "";
    saveToLocalStorage();
}

// Удаляет последний символ в дисплее "ответа"
function deleteSymbol() {
    d_display.value = d_display.value.slice(0, -1);
    saveToLocalStorage();
}

// Форматирует число для отображения, ограничивая его длину
function formatNumber(num) {
    let s = String(num);
    
    // Если число умещается в заданный размер, возвращаем его как есть
    if (s.length <= display_size) {
        return s;
    }

    // Уменьшаем точность числа, пока оно не уместится в заданный размер
    for (let i = display_size; i >= 1; i--) {
        str = num.toPrecision(i);
        if (str.length <= display_size) {
            return str;
        }
    }

    // Возвращаем исходное число, если форматирование не удалось
    return s;
}

// Преобразует отображаемое выражение в пригодное для вычисления значение
function stringify(display_value) {
    let s = String(display_value);
    s = s.replace('÷', '/');
    s = s.replace('×', '*');
    s = s.replace(':', '/');
    s = s.replace(',', '.');
    return s;
}

// Выполняет расчет текущего выражения и отображает результат
function calculate() {
    s = stringify(d_display.value);
    dvalue = d_display.value;
    try {
        // Вычисляем значение выражения с использованием math_calc
        console.log(math_calc(s));
        d_display.value = formatNumber(math_calc(s));  // Форматируем результат перед отображением
        u_display.value = dvalue;  // Сохраняем выражение в дисплей выражения
    } catch (error) {
        // Обрабатываем ошибку вычислений
        u_display.value = 'error'; 
        console.log(error);
    }
    saveToLocalStorage();
}

// Обработчик нажатия клавиши Enter для автоматического запуска вычисления
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        calculate();
    }
});
