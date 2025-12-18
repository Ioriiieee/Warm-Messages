const messages = [
    "I hope today is soft for you. ❤️",
    "You're doing amazing, even if you don't feel it.",
    "Proud ako sa’yo always.",
    "Please drink water and take breaks. You deserve it.",
    "Your smile makes things lighter.",
    "You're a blessing more than you know.",
    "I appreciate you. Kindly and deeply.",
    "Ang ganda mo kahit stressed ka. Promise.",
    "You're stronger than you think.",
    "Study well and Goodluck diyan! You got this!",
    "Sending you positive vibes and virtual hugs! 🤗",
    "Remember to take deep breaths and relax. You deserve peace.",
    "You are loved more than you know. ❤️",
    "Keep shining, even on the tough days. Your light is beautiful.",
    "Take a moment to appreciate how far you've come. You're doing great!",
    "Believe in yourself; you have the strength to overcome any challenge.",
    "Your kindness and compassion make the world a better place.",
    "Don't forget to smile today! Your smile is contagious.",
    "You are capable of amazing things. Keep pushing forward!",
    "Take care of yourself, both mind and body. You deserve it.",
    "Wishing you a day filled with joy and positivity! 🌟",
    "Remember, it's okay to ask for help when you need it. You're not alone.",
    "You have a unique and beautiful soul. Embrace it!",
    "I miss you na! Can't wait to see you again soon. 💕",
    "Sending you all my love and warm hugs! 🤗❤️",
    "Thinking of you always and hoping you're doing well. 🌸",
    "You are my sunshine on a cloudy day. ☀️🌧️",
    "I hope you have a wonderful day filled with happiness and laughter! 😊",
    "Just wanted to remind you how special you are to me. 💖",
    "Take care of yourself, my dear. You deserve all the love and care in the world. 🌷",
    "i love you",
    "You are the most amazing person I know. ❤️",   
    "Goodluck future RN! You've got this!",
    "Believe in yourself as much as I believe in you. 🌟",
    "Alam kong pagod ka today, pero proud ako sa’yo sobra.",
    "You’re doing great, kahit feeling mo hindi.",
    "One day at a time lang, okay? You got this.",
    "Nakikita ko yung effort mo, kahit di mo napapansin.",
    "Okay lang mapagod. Hindi ibig sabihin mahina ka.",
    "Future RN ka for a reason.",
    "Kahit slow days, progress pa rin ’yan.",
    "Naniniwala ako sa’yo, kahit ikaw minsan nagdududa.",
    "You don’t have to have it all figured out today.",
    "Proud ako sa kung paano mo hinahandle lahat.",
    "Ang tapang mo, kahit tahimik ka lang lumalaban.",
    "Rest when you need to. Deserve mo ’yon.",
    "You’re learning, growing, and becoming a great nurse.",
    "Hindi nasusukat sa grades yung worth mo.",
    "Andito lang ako, always cheering for you.",
    "Hindi ka nag-iisa sa journey na ’to.",
    "Your dream is valid, and you’re getting closer.",
    "Kahit anong mangyari, proud pa rin ako sa’yo.",
    "You’re doing more than enough.",
    "Take it easy today ha? Be gentle with yourself.",
    "Future RN, konting tiis na lang.",
    "You inspire me more than you know.",
    "Hindi sayang lahat ng pagod mo.",
    "You deserve good things, lalo na ngayon.",
    "I believe in you. Always.",
    "Alam kong pagod ka today, pero proud ako sa’yo sobra.",
    "You’re doing great, kahit feeling mo hindi.",
    "One day at a time lang, okay? You got this.",
    "Nakikita ko yung effort mo, kahit di mo napapansin.",
    "Okay lang mapagod. Hindi ibig sabihin mahina ka.",
    "Future RN ka for a reason.",
    "Kahit slow days, progress pa rin ’yan.",
    "Naniniwala ako sa’yo, kahit ikaw minsan nagdududa.",
    "You don’t have to have it all figured out today.",
    "Proud ako sa kung paano mo hinahandle lahat.",
    "Ang tapang mo, kahit tahimik ka lang lumalaban.",
    "Rest when you need to. Deserve mo ’yon.",
    "You’re learning, growing, and becoming a great nurse.",
    "Hindi nasusukat sa grades yung worth mo.",
    "Andito lang ako, always cheering for you.",
    "Hindi ka nag-iisa sa journey na ’to.",
    "Your dream is valid, and you’re getting closer.",
    "Kahit anong mangyari, proud pa rin ako sa’yo.",
    "You’re doing more than enough.",
    "Take it easy today ha? Be gentle with yourself.",
    "Future RN, konting tiis na lang.",
    "You inspire me more than you know.",
    "Hindi sayang lahat ng pagod mo.",
    "You deserve good things, lalo na ngayon.",
    "I believe in you. Always.",
];

// Message queue to avoid repeats until all messages have been shown
function shuffleArray(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

let messageQueue = shuffleArray(messages);

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
    // Pop next message from the shuffled queue; refill when empty
    if (messageQueue.length === 0) messageQueue = shuffleArray(messages);
    const chosen = messageQueue.shift();

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

    // Display time (milliseconds)
    // Show messages long enough to read
    const DISPLAY_TIME = 5000; // 5 seconds
    messageTimeout = setTimeout(() => {
        if (msg) {
            msg.classList.remove("show");
            msg.style.opacity = '0';
        }
        messageTimeout = null;
    }, DISPLAY_TIME);

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
