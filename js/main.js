// Create a simple calculator that has two inputs and returns the result
// of +,-,/,* somewhere in the DOM
// maximum 16 characters input
// add chaos button to bottom

// screen element
const screen = document.querySelector('pre');
// set mathStatus to 'initial' beginning.
let mathStatus = 'initial'
let numVar1 = '';
let numVar2 = '';
let mathVar = '';
let newOperation = false;

// code listens for any button clicks. runs main function with mathStatus conditionals, using button type class and id as arguments
const buttons = document.querySelectorAll('.button');
buttons.forEach(element => element.addEventListener('click', mainFunction));

// (main function)
function mainFunction(click) {
    let buttonClass = click.target.classList;
    let buttonID = click.target.id;
    console.log(`Class: ${buttonClass}, ID: ${buttonID}`)
     // if clear clicked, clear content of numVar1 and numVar2 (set all equal to '') and set screen content equal to ''. reset mathStatus to 'initial';
    if (buttonID === 'clear') {
        console.log('clear clicked');
        numVar1 = '';
        numVar2 = '';
        mathStatus = 'initial';
        screen.innerText = '';
    } 
    // if mathStatus = initial (premath number click):
    if (mathStatus === 'initial') {
        // if number class clicked:
        if (buttonClass.contains('number')) {
            // concats button digit string (+=) to numVar1 and replace screen with numVar1 str. Also set mathStatus to 'pending'.
            console.log('Initial status, number class');
            numVar1 += buttonID;
            screen.innerText = numVar1;
            mathStatus = 'pending';
        }
    }
    // after first number click, before first math click
    else if (mathStatus === 'pending') {
        // if math class clicked:
        if (buttonClass.contains('math')) {
            // set mathVar equal to id based on condition, set mathStatus to 'mathing' 
            mathVar = buttonID;
            mathStatus = 'mathing';
        }
        // else if number class clicked again, concats button digit string (+=) to numVar1 and replace screen with numVar1 str
        else if (buttonClass.contains('number')) {
            if (newOperation === false) {
                numVar1 += buttonID;
                screen.innerText = numVar1;
            }
            else if (newOperation === true) {
                numVar1 = buttonID;
                screen.innerText = numVar1;
                newOperation = false;
            }
        }
    }
    // after first math click
    // else if mathStatus = 'mathing',
    else if (mathStatus === 'mathing') {
        // if math class clicked again:
        if (buttonClass.contains('math')) {
            // set mathvar equal to new id
            mathVar = buttonID;
            console.log(`new mathvar is ${mathVar}`)
        }
        // else if number class clicked:
        else if (buttonClass.contains('number')) {
            // set numVar2 to button digit string, set mathStatus to 'finishing'
            numVar2 += buttonID;
            screen.innerText = numVar2;
            mathStatus = 'finishing';
        }  
    }
    // after first num, first math, second number (enter or math means calculate)
    else if (mathStatus === 'finishing') {
        // if number class clicked, concat number id to numVar2
        if (buttonClass.contains('number')) {
            numVar2 += buttonID;
            screen.innerText = numVar2;
        }
        // if math class or enter clicked, calculate
        else if (buttonID === 'enter' ) {
            // CALCULATE
            // if button ID is addition... etc.
            if (mathVar === 'addition') {
                numVar2 = Number(numVar1) + Number(numVar2);
            }
            else if (mathVar === 'subtraction') {
                numVar2 = Number(numVar1) - Number(numVar2);
            }
            else if (mathVar === 'multiplication') {
                numVar2 = Number(numVar1) * Number(numVar2);
            }
            else if (mathVar === 'division') {
                numVar2 = Number(numVar1) / Number(numVar2);
            }
            screen.innerText = numVar2;
            numVar1 = numVar2;
            numVar2 = ''
            mathStatus = 'pending'
            newOperation = true;
            // I want that after clicking numbers, operator, numbers, enter: it assigns numvar2 to numvar1 (allowing additional math). If I click another operator, it records it as mathvar and acts like pending, but if I click another number it should replace the screen and num with it instead or concatingating
        }
        else if (buttonClass.contains('math')) {
            if (mathVar === 'addition') {
                numVar2 = Number(numVar1) + Number(numVar2);
            }
            else if (mathVar === 'subtraction') {
                numVar2 = Number(numVar1) - Number(numVar2);
            }
            else if (mathVar === 'multiplication') {
                numVar2 = Number(numVar1) * Number(numVar2);
            }
            else if (mathVar === 'division') {
                numVar2 = Number(numVar1) / Number(numVar2);
            }
            screen.innerText = numVar2;
            numVar1 = numVar2;
            numVar2 = ''
            mathVar = buttonID;
            mathStatus = 'mathing'
        }
    }
}
