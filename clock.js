let is24Hour = true;
let isDarkTheme = false;
let currentTimezone = 'local';
let isFullscreen = false;

const timeDisplay = document.getElementById('time');
const dateDisplay = document.getElementById('date');
const formatToggle = document.getElementById('format-toggle');
const themeToggle = document.getElementById('theme-toggle');
const timezoneToggle = document.getElementById('timezone-toggle');
const fullscreenToggle = document.getElementById('fullscreen-toggle');
const timezoneDisplay = document.getElementById('timezone-display');
const formatDisplay = document.getElementById('format-display');
const clockContainer = document.querySelector('.clock-container');

function updateTime() {
    const now = new Date();
    let hours, minutes, seconds;

    if (currentTimezone === 'utc') {
        hours = now.getUTCHours();
        minutes = now.getUTCMinutes();
        seconds = now.getUTCSeconds();
    } else {
        hours = now.getHours();
        minutes = now.getMinutes();
        seconds = now.getSeconds();
    }

    let timeString;
    if (is24Hour) {
        timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
        timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;
    }

    timeDisplay.textContent = timeString;

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateDisplay.textContent = now.toLocaleDateString(undefined, options);
}

function toggleFormat() {
    is24Hour = !is24Hour;
    formatToggle.textContent = is24Hour ? '12 Hour' : '24 Hour';
    formatDisplay.textContent = is24Hour ? '24 Hour' : '12 Hour';
    updateTime();
}

function toggleTheme() {
    isDarkTheme = !isDarkTheme;
    document.body.classList.toggle('dark-theme');
    themeToggle.textContent = isDarkTheme ? 'Light Theme' : 'Dark Theme';
}

function toggleTimezone() {
    currentTimezone = currentTimezone === 'local' ? 'utc' : 'local';
    timezoneToggle.textContent = currentTimezone === 'local' ? 'UTC' : 'Local';
    timezoneDisplay.textContent = currentTimezone === 'local' ? 'Local' : 'UTC';
    updateTime();
}

function toggleFullscreen() {
    if (!isFullscreen) {
        document.body.classList.add('fullscreen');
        isFullscreen = true;
        fullscreenToggle.textContent = 'Exit Fullscreen';
    } else {
        document.body.classList.remove('fullscreen');
        isFullscreen = false;
        fullscreenToggle.textContent = 'Fullscreen';
    }
}

// Event listeners
formatToggle.addEventListener('click', toggleFormat);
themeToggle.addEventListener('click', toggleTheme);
timezoneToggle.addEventListener('click', toggleTimezone);
fullscreenToggle.addEventListener('click', toggleFullscreen);

// Update time every second
setInterval(updateTime, 1000);

// Initial update
updateTime();

// Add some dynamic effects
let hue = 0;
setInterval(() => {
    hue = (hue + 1) % 360;
    if (!isDarkTheme) {
        document.body.style.filter = `hue-rotate(${hue}deg)`;
    }
}, 100);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'f':
            toggleFullscreen();
            break;
        case 't':
            toggleTheme();
            break;
        case 'h':
            toggleFormat();
            break;
        case 'z':
            toggleTimezone();
            break;
    }
});