let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;

const hoursDisplay = document.getElementById('hours');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');

const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');

function updateDisplay() {
    const totalMilliseconds = elapsedTime;
    const hours = Math.floor(totalMilliseconds / 3600000);
    const minutes = Math.floor((totalMilliseconds % 3600000) / 60000);
    const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
    const milliseconds = Math.floor((totalMilliseconds % 1000) / 10);

    hoursDisplay.textContent = hours.toString().padStart(2, '0');
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    millisecondsDisplay.textContent = milliseconds.toString().padStart(2, '0');
}

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timer = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
        startBtn.textContent = 'Pause';
        startBtn.classList.add('paused');
    } else {
        isRunning = false;
        clearInterval(timer);
        startBtn.textContent = 'Resume';
        startBtn.classList.remove('paused');
    }
}

function stopStopwatch() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timer);
        startBtn.textContent = 'Start';
        startBtn.classList.remove('paused');
    }
}

function resetStopwatch() {
    isRunning = false;
    clearInterval(timer);
    elapsedTime = 0;
    updateDisplay();
    startBtn.textContent = 'Start';
    startBtn.classList.remove('paused');
}

startBtn.addEventListener('click', startStopwatch);
stopBtn.addEventListener('click', stopStopwatch);
resetBtn.addEventListener('click', resetStopwatch);

// Initialize display
updateDisplay();