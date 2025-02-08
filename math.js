function math_calc(expression) {
    // Удаляем все пробелы
    expression = expression.replace(/\s+/g, '');

    // Массивы для чисел и операторов
    let numbers = [];
    let operators = [];
    let currentNumber = '';

    // Разбор строки
    for (let i = 0; i < expression.length; i++) {
        const char = expression[i];

        // Проверяем унарный минус (или плюс): если символ стоит в начале
        // или после оператора (+ - * / %), но не после e/E
        if (
            (char === '-' || char === '+') &&
            (i === 0 || /[+\-*/%]/.test(expression[i - 1])) &&
            !/[eE]/.test(expression[i - 1])
        ) {
            currentNumber = char; 
        }
        // Если это цифра, точка или e/E – добавляем к текущему числу
        else if (/\d|\.|e|E/.test(char)) {
            currentNumber += char;
        }
        // Если это + или - сразу после e/E – тоже часть числа (знак степени)
        else if (
            (char === '+' || char === '-') &&
            i > 0 && /[eE]/.test(expression[i - 1])
        ) {
            currentNumber += char;
        }
        // Иначе (встретили «настоящий» оператор) – сохраняем текущее число и оператор
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
