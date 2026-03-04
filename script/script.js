document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.feedback__form');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');
    const privacyInput = document.getElementById('privacy');
    const privacyError = document.getElementById('privacy-error');
    const submitButton = form.querySelector('button');

    // ======================
    // Валидация телефона
    // ======================
    phoneInput.addEventListener('focus', () => {
        if (phoneInput.value === '') phoneInput.value = '+7';
    });

    phoneInput.addEventListener('input', () => {
        let value = phoneInput.value.replace(/[^\d+]/g, '');
        if (!value.startsWith('+7')) value = '+7';
        value = value.slice(0, 12);
        phoneInput.value = value;
        updateButtonState();
    });

    function isValidPhone(phone) {
        return /^\+7\d{10}$/.test(phone);
    }

    // ======================
    // Валидация email
    // ======================
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // ======================
    // Проверка всех условий для кнопки
    // ======================
    function updateButtonState() {
        const nameFilled = nameInput.value.trim() !== '';
        const phoneValid = isValidPhone(phoneInput.value.trim());
        const emailValid = isValidEmail(emailInput.value.trim());
        const privacyChecked = privacyInput.checked;

        if (nameFilled && phoneValid && emailValid && privacyChecked) {
            submitButton.style.background = '#FF0000';
            submitButton.style.color = '#FFFFFF';
            submitButton.disabled = false;
        } else {
            submitButton.style.background = '#FFFFFF';
            submitButton.style.color = '#BEBEBE';
            submitButton.disabled = true;
        }
    }

    nameInput.addEventListener('input', updateButtonState);
    phoneInput.addEventListener('input', updateButtonState);
    emailInput.addEventListener('input', updateButtonState);
    privacyInput.addEventListener('change', updateButtonState);

    updateButtonState();

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!privacyInput.checked) {
            privacyInput.classList.add('input-error');
            privacyError.textContent = 'Вы должны согласиться с политикой конфиденциальности!';
            privacyError.style.display = 'block';
            return;
        } else {
            privacyInput.classList.remove('input-error');
            privacyError.textContent = '';
            privacyError.style.display = 'none';
        }

        console.log('Форма валидна, отправляем данные');
    });
});

const items = document.querySelectorAll(
    '.security__item, .videoAnalytics__item, .gallery-grid__item'
);

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        } else {
            entry.target.classList.remove('active');
        }
    });
}, {
    threshold: 0.4
});

items.forEach(item => observer.observe(item));

items.forEach(item => observer.observe(item));

items.forEach(item => observer.observe(item));

// ======================
// ADVANTAGES ANIMATION
// ======================

const advantageItems = document.querySelectorAll('.advantages__item');

const advantagesObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 200); // каскадная анимация
        }
    });
}, {
    threshold: 0.3
});

advantageItems.forEach(item => {
    advantagesObserver.observe(item);
});

document.addEventListener("DOMContentLoaded", function () {

    const feedbackSection = document.getElementById("feedback");

    // Берем все кнопки с текстом "Отправить запрос"
    const buttons = document.querySelectorAll("button");

    buttons.forEach(button => {

        const isRequestButton =
            button.textContent.trim() === "Отправить запрос";

        const isInsideFeedback =
            button.closest(".feedback") !== null;

        if (isRequestButton && !isInsideFeedback) {

            button.addEventListener("click", function (e) {
                e.preventDefault();

                feedbackSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            });

        }
    });

});