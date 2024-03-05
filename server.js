const express = require('express');
const app = express();
const PORT = 3787;

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const performOperation = (num1, num2, operation) => {
  switch (operation) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '/':
      return num1 / num2;
    case '^2':
      return num1 ** 2;
    case 'sqrt':
      return Math.sqrt(num1);
    case '^3':
      return num1 ** 3;
    case 'cbrt':
      return Math.cbrt(num1);
    case 'log':
      return Math.log(num1);
    default:
      return num1 + num2;
  }
};

const generateMathQuestion = (mode) => {
  const getRandomOperation = () => {
    const operations = ['+', '-', '*', '/', '^2', 'sqrt', '^3', 'cbrt', 'log'];
    return operations[getRandomNumber(0, operations.length - 1)];
  };

  const generateOperationChain = (count) => {
    let operationChain = '';
    for (let i = 0; i < count; i++) {
      if (i > 0) {
        operationChain += ` ${getRandomOperation()}`;
      }
      operationChain += ` ${getRandomNumber(1, 10)}`;
    }
    return operationChain.trim();
  };

  let num1, num2, answer, operation;

  switch (mode) {
    case 'easy':
      num1 = getRandomNumber(1, 10);
      num2 = getRandomNumber(1, 10);
      operation = ['+', '-', '*'][getRandomNumber(0, 2)];
      answer = performOperation(num1, num2, operation);
      break;
    case 'normal':
      num1 = getRandomNumber(1, 20);
      num2 = getRandomNumber(1, 20);
      operation = ['+', '-', '*'][getRandomNumber(0, 2)];
      answer = performOperation(num1, num2, operation);
      break;
    case 'hard':
      operation = generateOperationChain(3);
      answer = eval(operation);
      break;
    case 'extreme':
      operation = generateOperationChain(5);
      answer = eval(operation);
      break;
    case 'impossible':
      operation = generateOperationChain(7);
      answer = eval(operation);
      break;
    case 'god':
      operation = generateOperationChain(10);
      answer = eval(operation);
      break;
    default:
      num1 = getRandomNumber(1, 10);
      num2 = getRandomNumber(1, 10);
      operation = '+';
      answer = num1 + num2;
  }

  return {
    question: `${operation}`,
    answer: answer,
    mode: mode,
    creator: 'cipher',
  };
};

app.get('/easy', (req, res) => {
  const questionData = generateMathQuestion('easy');
  res.json(questionData);
});

app.get('/normal', (req, res) => {
  const questionData = generateMathQuestion('normal');
  res.json(questionData);
});

app.get('/hard', (req, res) => {
  const questionData = generateMathQuestion('hard');
  res.json(questionData);
});

app.get('/extreme', (req, res) => {
  const questionData = generateMathQuestion('extreme');
  res.json(questionData);
});

app.get('/impossible', (req, res) => {
  const questionData = generateMathQuestion('impossible');
  res.json(questionData);
});

app.get('/god', (req, res) => {
  const questionData = generateMathQuestion('god');
  res.json(questionData);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
