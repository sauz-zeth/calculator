function math_calc(expression) {
    function operate(operand1, operand2, operator) {
        switch (operator) {
            case '+':
                return operand1 + operand2;
            case '-':
                return operand1 - operand2;
            case '*':
                return operand1 * operand2;
            case '/':
                if (operand2 !== 0) {
                    return operand1 / operand2;
                } else {
                    throw new Error("Division by zero");
                }
            case '%':
                return operand1 % operand2;
            default:
                throw new Error("Unsupported operator: " + operator);
        }
    }

    function parse(expression) {
        expression = expression.replace(/\s+/g, '');

        let numbers = [];
        let operators = [];
        let num = '';

        for (let i = 0; i < expression.length; i++) {
            const char = expression[i];

            if (/\d|\./.test(char)) {
                num += char;
            } else {
                if (num) {
                    numbers.push(parseFloat(num));
                    num = '';
                }
                operators.push(char);
            }
        }

        if (num) {
            numbers.push(parseFloat(num));
        }

        return { numbers, operators };
    }

    function evaluate(numbers, operators) {
        for (let i = 0; i < operators.length; i++) {
            if (operators[i] === '*' || operators[i] === '/' || operators[i] === '%') {
                const result = operate(numbers[i], numbers[i + 1], operators[i]);
                numbers[i] = result;
                numbers.splice(i + 1, 1);
                operators.splice(i, 1);
                i--;
            }
        }

        let result = numbers[0];
        for (let i = 0; i < operators.length; i++) {
            result = operate(result, numbers[i + 1], operators[i]);
        }

        return result;
    }

    const { numbers, operators } = parse(expression);
    
    answer = evaluate(numbers, operators);
    console.log(answer);
    if (isNaN(answer)) {
        throw new Error();
    } 
    else {
        return answer;
    }
}