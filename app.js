//  DOM elements
const numberButtons = document.querySelectorAll('[data-num]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous]');
const currentOperandTextElement = document.querySelector('[data-current]');

// Variables to hold operands and operation
let currentNum = '';
let previousNum = '';
let operation = undefined;
// appendNum function
function appendNum(buttonValue) {
  if (operation === undefined) 
    {currentNum += buttonValue;  
  } else {
    
    if (previousNum === '') {
      previousNum = currentNum; 
    }
    currentNum += buttonValue;
}
}

// updateDisplay function 
function updateDisplay() {
  currentOperandTextElement.innerText = currentNum;  
  if (operation != null) {
    previousOperandTextElement.innerText = `${previousNum} ${operation}`;  // 
  } else {
    previousOperandTextElement.innerText = previousNum; 
    }
}
//opertaion function
function chooseOperation(operationValue) {
  if (currentNum === '') return;  

  if (previousNum !== '') {
    compute();  
  }

  operation = operationValue;  
  previousNum = currentNum;  
  currentNum = '';
}
// comput function 
function compute(){
  const prev = parseFloat(previousNum); 
  const current = parseFloat(currentNum);
  switch(operation){
    case '+':
      currentNum = (prev + current).toString();
      break;
    case '-':
      currentNum = (prev - current).toString();
      break;
    case '÷':       
    if (current === 0) {
        currentNum = 'Error'; // Handle division by zero
      } else {
        currentNum = (prev / current).toString(); 
      }
      break;
    case'*': 
    currentNum = (prev * current).toString();
    break;
    default:
      return;
  }
  operation = undefined; 
  previousNum = '';
}
// allclear function 
function clear() {
  operation = undefined; 
  previousNum = '';
  currentNum  ='';
}
// Delete function 
function deletefun() {
  currentNum = currentNum.slice(0,-1)
}

// Event listeners with regular functions
numberButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    appendNum(button.innerText);
    updateDisplay();
  });
});

operationButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    chooseOperation(button.innerText);
    updateDisplay();
  });
});

equalsButton.addEventListener('click', function() {
  compute();
  updateDisplay();
});

deleteButton.addEventListener('click', function() {
  deletefun();
  updateDisplay();
});
allClearButton.addEventListener('click', function() {
  clear();
  updateDisplay();
});


