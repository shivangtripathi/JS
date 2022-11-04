let seconds = document.getElementsByClassName('seconds')[0];
let milliseconds = document.getElementsByClassName('milliseconds')[0];

let startbtn = document.getElementsByClassName('start-btn')[0];
let resetbtn = document.getElementsByClassName('reset-btn')[0];

let milli_counter = 99;
let seconds_counter = 0;
let interval;


startbtn.addEventListener('click', () => {
    if (startbtn.innerHTML === 'Start') {
        startbtn.innerHTML = 'Stop'
        interval = setInterval(startStopWatch, 10);
    } else {
        clearInterval(interval);
        startbtn.innerHTML = 'Start'
    }
    
})

resetbtn.addEventListener('click', () => {
    clearInterval(interval);
    startbtn.innerHTML = 'Start'
    seconds_counter = "00";
    milli_counter = "00";
    seconds.innerHTML = seconds_counter;
    milliseconds.innerHTML = milli_counter;
})

function startStopWatch() {
    milli_counter++;
    if (milli_counter <= 9) {
        milli_counter = ('0' + milli_counter);
    } 
    if (milli_counter > 99) {
        seconds_counter++;
        milli_counter = 0;
        if (seconds_counter < 9) {
        seconds.innerHTML = '0' + seconds_counter;
        } else {
         seconds.innerHTML = seconds_counter;
        }
    }
    
    milliseconds.innerHTML = milli_counter;
}