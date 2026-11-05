const terminalInput = document.getElementById('terminalInput');
const terminalOutput = document.getElementById('terminalOutput');

const commands = {
    help: "Available commands:\n- about: Learn about Arun\n- skills: View tech superpowers\n- projects: View featured work\n- contact: Get professional links\n- clear: Clear terminal screen",
    about: "Arun Kumar V is an Integrated MCA student at Amrita Vishwa Vidyapeetham with a strong background in cloud tools and software development.",
    skills: "Core Stack: C, C++, Java, Python, JavaScript, AWS Amplify, EC2, Git, VS Code.",
    projects: "Featured: 1. Cloud-Hosted Resume/Portfolio on AWS. 2. Digital Media Production & Regional Cinema Hub.",
    contact: "GitHub: github.com/Swisss07 | Hosting: AWS Amplify Global Edge"
};

terminalInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        const userInput = terminalInput.value.trim().toLowerCase();
        let response = "";

        if (userInput === 'clear') {
            terminalOutput.innerHTML = "Terminal cleared. Type <span class='highlight-cmd'>help</span> for commands.";
            terminalInput.value = "";
            return;
        } else if (commands[userInput]) {
            response = commands[userInput];
        } else if (userInput === "") {
            response = "";
        } else {
            response = `command not found: ${userInput}. Type 'help' for available commands.`;
        }

        // Append text to terminal
        terminalOutput.innerHTML += `\n$ ${terminalInput.value}\n${response}`;
        terminalInput.value = "";
        
        // Auto scroll to bottom
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
});