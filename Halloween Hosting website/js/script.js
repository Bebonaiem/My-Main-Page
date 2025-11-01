// js/script.js

document.addEventListener('DOMContentLoaded', function() {
    
    // --- Contact Form Logic ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            if (name === '' || email === '' || subject === '' || message === '') {
                displayMessage('Please fill in all the haunted fields!', 'error');
                return;
            }
            displayMessage('Your message has been sent to the underworld! We will reply soon.', 'success');
            contactForm.reset();
        });
    }

    function displayMessage(message, type) {
        const formMessage = document.getElementById('form-message');
        if (formMessage) {
            formMessage.textContent = message;
            formMessage.className = type;
            formMessage.style.display = 'block';
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }
    
    // --- Enhanced Halloween Theme Elements ---
    
    // Moderate number of floating ghosts for visual appeal
    let ghostCount = 0;
    const maxGhosts = 4; // Balanced number
    
    function createFloatingGhost() {
        // Only create ghosts if we haven't reached the limit
        if (ghostCount >= maxGhosts) return;
        
        ghostCount++;
        const ghost = document.createElement('div');
        ghost.innerHTML = Math.random() > 0.5 ? '👻' : '🦇';
        ghost.style.position = 'fixed';
        ghost.style.fontSize = (Math.random() * 20 + 15) + 'px';
        ghost.style.zIndex = '9999';
        ghost.style.pointerEvents = 'none';
        ghost.style.left = Math.random() * 100 + 'vw';
        ghost.style.top = '-50px';
        ghost.style.opacity = Math.random() * 0.4 + 0.3;
        ghost.style.animation = `floatGhost${Math.floor(Math.random() * 3)} ${Math.random() * 8 + 12}s linear forwards`;
        ghost.style.willChange = 'transform, opacity';
        
        document.body.appendChild(ghost);
        
        // Remove ghost after animation completes and decrement counter
        setTimeout(() => {
            if (ghost.parentNode) {
                ghost.parentNode.removeChild(ghost);
                ghostCount--;
            }
        }, 15000);
    }
    
    // Add CSS for ghost animations
    const ghostStyles = document.createElement('style');
    ghostStyles.textContent = `
        @keyframes floatGhost0 {
            0% { transform: translateY(0) translateX(0) rotate(0deg); }
            100% { transform: translateY(100vh) translateX(20vw) rotate(360deg); }
        }
        @keyframes floatGhost1 {
            0% { transform: translateY(0) translateX(0) rotate(0deg); }
            100% { transform: translateY(100vh) translateX(-20vw) rotate(-360deg); }
        }
        @keyframes floatGhost2 {
            0% { transform: translateY(0) translateX(0) rotate(0deg); }
            100% { transform: translateY(100vh) translateX(40vw) rotate(180deg); }
        }
    `;
    document.head.appendChild(ghostStyles);
    
    // Create ghosts at a moderate frequency
    setInterval(createFloatingGhost, 6000);
    
    // Add occasional floating pumpkins
    let pumpkinCount = 0;
    const maxPumpkins = 2;
    
    function createFloatingPumpkin() {
        if (pumpkinCount >= maxPumpkins) return;
        
        pumpkinCount++;
        const pumpkin = document.createElement('div');
        pumpkin.innerHTML = '🎃';
        pumpkin.style.position = 'fixed';
        pumpkin.style.fontSize = (Math.random() * 25 + 20) + 'px';
        pumpkin.style.zIndex = '9998';
        pumpkin.style.pointerEvents = 'none';
        pumpkin.style.left = Math.random() * 100 + 'vw';
        pumpkin.style.top = '-50px';
        pumpkin.style.opacity = Math.random() * 0.5 + 0.3;
        pumpkin.style.animation = `floatPumpkin${Math.floor(Math.random() * 2)} ${Math.random() * 10 + 15}s linear forwards`;
        pumpkin.style.willChange = 'transform, opacity';
        
        document.body.appendChild(pumpkin);
        
        setTimeout(() => {
            if (pumpkin.parentNode) {
                pumpkin.parentNode.removeChild(pumpkin);
                pumpkinCount--;
            }
        }, 18000);
    }
    
    // Add CSS for pumpkin animations
    const pumpkinStyles = document.createElement('style');
    pumpkinStyles.textContent = `
        @keyframes floatPumpkin0 {
            0% { transform: translateY(0) translateX(0); }
            100% { transform: translateY(100vh) translateX(30vw); }
        }
        @keyframes floatPumpkin1 {
            0% { transform: translateY(0) translateX(0); }
            100% { transform: translateY(100vh) translateX(-30vw); }
        }
    `;
    document.head.appendChild(pumpkinStyles);
    
    // Create pumpkins occasionally
    setInterval(createFloatingPumpkin, 12000);
    
    // Simplified but effective mouse effect
    const cursorEffect = document.createElement('div');
    cursorEffect.style.position = 'fixed';
    cursorEffect.style.width = '20px';
    cursorEffect.style.height = '20px';
    cursorEffect.style.border = '1px solid #e67300';
    cursorEffect.style.borderRadius = '50%';
    cursorEffect.style.pointerEvents = 'none';
    cursorEffect.style.zIndex = '9999';
    cursorEffect.style.transform = 'translate(-50%, -50%)';
    cursorEffect.style.transition = 'all 0.1s ease';
    cursorEffect.style.display = 'none';
    cursorEffect.style.willChange = 'transform';
    document.body.appendChild(cursorEffect);
    
    document.addEventListener('mousemove', function(e) {
        cursorEffect.style.display = 'block';
        cursorEffect.style.left = e.clientX + 'px';
        cursorEffect.style.top = e.clientY + 'px';
    });
    
    document.addEventListener('mousedown', function() {
        cursorEffect.style.transform = 'translate(-50%, -50%) scale(0.7)';
        cursorEffect.style.borderColor = '#cc0000';
    });
    
    document.addEventListener('mouseup', function() {
        cursorEffect.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorEffect.style.borderColor = '#e67300';
    });
});