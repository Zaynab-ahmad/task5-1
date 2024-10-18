//  DOM elements
const numberButtons = document.querySelectorAll('[data-num]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous]');
const currentOperandTextElement = document.querySelector('[data-current]');

// Variables 
let currentNum = '';
let previousNum = '';
let operation = undefined;
let equalsClicked = false;

// appendNum function
function appendNum(buttonValue) {
  if (equalsClicked) {     
    // If the equals button was clicked, reset the current number   
    currentNum = '';         
    equalsClicked = false;
  }
    // If no operation is selected, continue appending to the current number
  if (operation === undefined) 
    {currentNum += buttonValue;  
  } else {
    // If an operation is selected and previousNum is empty, assign currentNum to previousNum
    if (previousNum === '') {
      previousNum = currentNum; 
    }
    currentNum += buttonValue;
    }
} 

//opertaion function
function chooseOperation(operationValue) {
  if (currentNum === '') return;  
  // If there is already a previous number, perform the calculation
  if (previousNum !== '') {
    compute();  
  }
  operation = operationValue;  
  previousNum = currentNum;  
  currentNum = '';
}

// updateDisplay function 
function updateDisplay() {
  currentOperandTextElement.innerText = currentNum;  
    // If an operation is selected, display the previous number and the operation
  if (operation != null) {
    previousOperandTextElement.innerText = `${previousNum} ${operation}`;  // 
  } else {
    // If no operation is selected, just display the previous number
    previousOperandTextElement.innerText = previousNum; 
    }
}

// compute function 
function compute() {

   // Parse the previous and current numbers as floating-point numbers
  const prev = parseFloat(previousNum); 
  const current = parseFloat(currentNum);
   
  switch(operation) {
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
      break
    case'*': 
    currentNum = (prev * current).toString();
    break;   
    default: return; 
    }
  
  operation = undefined; 
  previousNum = '';
  // Set equalsClicked to true to indicate that the equals button has been clicked
  equalsClicked = true;
}

// allclear function 
function clear() {
  operation = undefined; 
  previousNum = '';
  currentNum  ='';
}

// Delete function 
function deletefun() {
  // Remove the last character from the currentNum string
  // '0' is the starting index, and '-1' indicates the end, excluding the last character, 
  // since negative index counts back from the end of the array.
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
