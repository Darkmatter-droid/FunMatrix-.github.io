// Add click animation to options
document.querySelectorAll('.options').forEach(option => {
    option.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

// Add floating animation to title
const title = document.querySelector('.title');
let titleFloat = 0;
setInterval(() => {
    titleFloat += 0.02;
    title.style.transform = `translateY(${Math.sin(titleFloat) * 5}px)`;
}, 50);

// Add subtle pulse to options
document.querySelectorAll('.options').forEach((option, index) => {
    setTimeout(() => {
        option.style.animation = 'optionSlideIn 0.8s ease-out forwards, pulse 2s infinite';
    }, index * 100);
});
