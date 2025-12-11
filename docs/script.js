const messages = [
    "I hope today is soft for you. ❤️",
    "You're doing amazing, even if you don't feel it.",
    "Proud ako sa’yo always.",
    "Please drink water, love.",
    "Your smile makes things lighter.",
    "You're a blessing more than you know.",
    "You're worth loving, always.",
    "I appreciate you. Kindly and deeply.",
    "Ang ganda mo kahit stressed ka. Promise.",
    "You're stronger than you think."
];

const heart = document.getElementById("heart");
const msg = document.getElementById("message");
const musicBtn = document.getElementById("musicBtn");
const bgMusic = document.getElementById("bgMusic");

// Timeout handle so repeated clicks clear previous hide timer
let messageTimeout = null;
// Cooldown to prevent message spamming (milliseconds)
const MESSAGE_COOLDOWN = 2000; // 2 seconds
let isCooldown = false;

// random message + sparkles
heart.addEventListener("click", (e) => {
    const random = Math.floor(Math.random() * messages.length);
    const chosen = messages[random];

    // If cooldown active, ignore the click
    if (isCooldown) {
        return;
    }

    // Activate cooldown
    isCooldown = true;
    setTimeout(() => { isCooldown = false; }, MESSAGE_COOLDOWN);

    // Clear previous hide timer so rapid clicks behave correctly
    if (messageTimeout) {
        clearTimeout(messageTimeout);
        messageTimeout = null;
    }

    if (msg) {
        // Immediately update text and show
        msg.textContent = chosen;
        // remove then re-add class to restart any CSS transition if necessary
        msg.classList.remove("show");
        // small forced reflow to ensure class re-add is recognized
        // eslint-disable-next-line no-unused-expressions
        msg.offsetHeight;
        msg.classList.add("show");

        // Fallback inline styles to force visibility if CSS is overridden
        msg.style.transition = msg.style.transition || 'opacity 0.45s ease';
        msg.style.opacity = '1';
    }

    // Shorter display time so messages disappear quicker (spam-friendly)
    messageTimeout = setTimeout(() => {
        if (msg) {
            msg.classList.remove("show");
            msg.style.opacity = '0';
        }
        messageTimeout = null;
    }, 800); // 800ms display

    createSparkles(e.pageX, e.pageY);
});

// sparkle effect
function createSparkles(x, y) {
    for (let i = 0; i < 10; i++) {
        const sparkle = document.createElement("div");
        sparkle.classList.add("sparkle");
        document.body.appendChild(sparkle);

        const offsetX = (Math.random() - 0.5) * 100;
        const offsetY = (Math.random() - 0.5) * 100;

        sparkle.style.left = x + offsetX + "px";
        sparkle.style.top = y + offsetY + "px";

        setTimeout(() => sparkle.remove(), 1000);
    }
}

// MUSIC TOGGLE (ICON ONLY)
let playing = false;
let autoplayTriggered = false;

// Accessibility attributes
if (musicBtn) {
    musicBtn.setAttribute('aria-label', 'Toggle background music');
    musicBtn.setAttribute('aria-pressed', 'false');
    musicBtn.textContent = "🎵"; // Start with play icon
}

// Ensure audio is paused on page load
if (bgMusic) {
    bgMusic.pause();
    bgMusic.currentTime = 0;
    bgMusic.addEventListener('error', (e) => {
        console.warn('bgMusic failed to load:', e);
    });
}

// Autoplay music on first user interaction
document.addEventListener('click', () => {
    if (!autoplayTriggered && bgMusic && !playing) {
        autoplayTriggered = true;
        bgMusic.play()
            .then(() => {
                musicBtn.textContent = "🔇";
                musicBtn.setAttribute('aria-pressed', 'true');
                playing = true;
            })
            .catch((err) => {
                console.warn('Autoplay prevented:', err);
            });
    }
}, { once: false });

musicBtn.addEventListener("click", () => {
    if (!bgMusic) {
        console.warn('bgMusic element not found');
        return;
    }

    // Check actual playback state instead of our variable
    // (handles cases where user plays via browser controls)
    if (bgMusic.paused) {
        // Audio is paused, so play it
        const playPromise = bgMusic.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                musicBtn.textContent = "🔇";
                musicBtn.setAttribute('aria-pressed', 'true');
                playing = true;
            }).catch((err) => {
                console.warn('Audio play prevented:', err);
            });
        } else {
            // Older browsers may not return a promise
            musicBtn.textContent = "🔇";
            musicBtn.setAttribute('aria-pressed', 'true');
            playing = true;
        }
    } else {
        // Audio is playing, so pause it
        bgMusic.pause();
        musicBtn.textContent = "🎵";
        musicBtn.setAttribute('aria-pressed', 'false');
        playing = false;
    }
});

// SNOWFALL EFFECT
const canvas = document.getElementById("snow");
const ctx = canvas.getContext("2d");
let flakes = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

function createFlakes() {
    for (let i = 0; i < 150; i++) {
        flakes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 3 + 1,
            d: Math.random() + 1
        });
    }
}

function drawFlakes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.beginPath();
    flakes.forEach(f => {
        ctx.moveTo(f.x, f.y);
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
    });
    ctx.fill();
    moveFlakes();
}

let angle = 0;

function moveFlakes() {
    angle += 0.01;
    flakes.forEach(f => {
        f.y += Math.pow(f.d, 2) + 1;
        f.x += Math.sin(angle) * 1;

        if (f.y > canvas.height) {
            f.y = -10;
            f.x = Math.random() * canvas.width;
        }
    });
}

function snowfall() {
    drawFlakes();
    requestAnimationFrame(snowfall);
}


createFlakes();
snowfall();
