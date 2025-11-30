console.log("SYSTEM INITIALIZED: Cyberpunk Portfolio v1.0");

const subtitleElement = document.querySelector('.subtitle');
const originalText = subtitleElement.innerText;
subtitleElement.innerText = '';

let i = 0;
const typeWriter = () => {
    if (i < originalText.length) {
        subtitleElement.innerText += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 50 + Math.random() * 100); // Random typing speed
    }
};

// Start typing after a small delay
setTimeout(typeWriter, 1000);
