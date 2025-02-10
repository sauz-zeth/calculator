function math_calc(expression) {
    // Удаляем все пробелы


    // Массивы для чисел и операторов
    let numbers = [];
    let operators = [];
    let currentNumber = '';

    // Разбор строки
    for (let i = 0; i < expression.length; i++) {
        const char = expression[i];
        const prevChar = i > 0 ? expression[i - 1] : null;
    
        if (char === '+' || char === '-') {
            // Проверяем, не является ли это знаком в степени (после e/E):
            if (prevChar === 'e' || prevChar === 'E') {
                // Это часть числа (знак степени)
                currentNumber += char; 
            }
            // Если это первый символ строки или следует сразу за оператором,
            // считаем, что это унарный знак
            else if (
                i === 0 
                || /[+\-*/%]/.test(prevChar) // можно расширять (добавить (, ^ и т.п.)
            ) {
                // Начинаем новое (унарное) число
                currentNumber = char; 
            } 
            // Иначе — это обычный (бинарный) оператор
            else {
                if (currentNumber) {
                    numbers.push(parseFloat(currentNumber));
                    currentNumber = '';
                }
                operators.push(char);
            }
        }
        // Если цифра / точка / e / E — продолжаем «накапливать» число:
        else if (/\d|\.|e|E/.test(char)) {
            currentNumber += char;
        }
        // Иначе — какой-то оператор (* / % …)
        else {
            if (currentNumber) {
                numbers.push(parseFloat(currentNumber));
                currentNumber = '';
            }
            operators.push(char);
        }
    }
    

    // Добавляем последнее число, если оно накопилось
    if (currentNumber) {
        numbers.push(parseFloat(currentNumber));
    }

    // Сначала обрабатываем операции высшего приоритета: * / %
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === '*' || operators[i] === '/' || operators[i] === '%') {
            const result = operate(numbers[i], numbers[i + 1], operators[i]);
            numbers[i] = result;
            numbers.splice(i + 1, 1);
            operators.splice(i, 1);
            i--;
        }
    }

    // Затем обрабатываем + и -
    let result = numbers[0];
    for (let i = 0; i < operators.length; i++) {
        result = operate(result, numbers[i + 1], operators[i]);
    }

    // Проверяем результат
    if (isNaN(result)) {
        throw new Error("Результат не является числом");
    }
    return result;
    
    // Функция для арифметических операций
    function operate(a, b, op) {
        switch (op) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/':
                if (b === 0) {
                    throw new Error("Деление на ноль");
                }
                return a / b;
            case '%': return a % b;
            default:
                throw new Error("Неизвестный оператор: " + op);
        }
    }
}
