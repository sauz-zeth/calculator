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

        // Проверяем унарный минус: если '-' стоит в начале выражения 
        // или после другого оператора ( + - * / % ), то считаем его "унарным"
        if (char === '-' && (i === 0 || /[+\-*/%]/.test(expression[i - 1]))) {
            currentNumber = '-';
        } 
        // Если это цифра или точка - дописываем к текущему числу
        else if (/\d|\./.test(char)) {
            currentNumber += char;
        } 
        // Иначе (если символ - оператор), сохраняем число в массив, оператор - в другой
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
