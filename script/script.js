const canvas = document.getElementById('sequenceCanvas');
const ctx = canvas.getContext('2d');

const frameCount = 249;
const images = [];
let currentFrame = 0;

/* === FPS SETTINGS === */
const fps = 24;
const frameInterval = 1000 / fps;
let lastFrameTime = 0;

/* === FRAME PATH === */
function getFramePath(index) {
    const paddedIndex = String(index).padStart(5, '0');
    return `images/sequence/Comp 1_${paddedIndex}.png`;
}

/* === PRELOAD === */
for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = getFramePath(i);
    images.push(img);
}

/* === RENDER === */
function renderFrame() {
    const img = images[currentFrame];
    if (!img || !img.complete) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

/* === ANIMATION LOOP (24 FPS) === */
function animate(time) {
    if (time - lastFrameTime >= frameInterval) {
        renderFrame();
        currentFrame = (currentFrame + 1) % frameCount;
        lastFrameTime = time;
    }

    requestAnimationFrame(animate);
}

/* === START === */
requestAnimationFrame(animate);


document.getElementById('toFeedback').addEventListener('click', function () {
    document.getElementById('feedback').scrollIntoView({ behavior: 'smooth' });
});

document.addEventListener('DOMContentLoaded', () => {

    const form = document.querySelector('.feedback__form');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');

    /* ======================
       PHONE INPUT (+7)
    ====================== */

    phoneInput.addEventListener('focus', () => {
        if (phoneInput.value === '') {
            phoneInput.value = '+7';
        }
    });

    phoneInput.addEventListener('input', () => {
        // разрешаем только + и цифры
        let value = phoneInput.value.replace(/[^\d+]/g, '');

        // всегда начинается с +7
        if (!value.startsWith('+7')) {
            value = '+7';
        }

        // максимум +7 + 10 цифр
        value = value.slice(0, 12);

        phoneInput.value = value;
    });

    function isValidPhone(phone) {
        return /^\+7\d{10}$/.test(phone);
    }

    /* ======================
       EMAIL
    ====================== */

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    /* ======================
       FORM SUBMIT
    ====================== */

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const phoneValue = phoneInput.value.trim();
        const emailValue = emailInput.value.trim();

        let isValid = true;

        if (!isValidPhone(phoneValue)) {
            phoneInput.classList.add('input-error');
            isValid = false;
        } else {
            phoneInput.classList.remove('input-error');
        }

        if (!isValidEmail(emailValue)) {
            emailInput.classList.add('input-error');
            isValid = false;
        } else {
            emailInput.classList.remove('input-error');
        }

        if (isValid) {
            console.log('Форма валидна, отправляем данные');

        }
    });

});