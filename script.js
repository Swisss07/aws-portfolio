const themeToggleBtn = document.getElementById('themeToggleBtn');

themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('terminal-theme');
    
    if (document.body.classList.contains('terminal-theme')) {
        themeToggleBtn.textContent = "Switch Back to Normal Theme";
    } else {
        themeToggleBtn.textContent = "Toggle Retro Terminal Theme";
    }
});