// Инициализация анимаций появления
AOS.init({
    duration: 800,
    once: true
});

// Логика Квиза
let quizData = {
    1: '', // Стиль
    2: '', // Помещение
    3: ''  // Тип изделия
};

let currentStep = 1;
const totalSteps = 4;

/**
 * Выбор ответа в квизе
 * @param {number} stepNum - Номер текущего шага
 * @param {string} value - Текст выбранного ответа
 */
function selectAnswer(stepNum, value) {
    quizData[stepNum] = value;
    nextStep();
}

/**
 * Переход к следующему шагу
 */
function nextStep() {
    const currentStepEl = document.querySelector(`.quiz-step[data-step="${currentStep}"]`);
    currentStepEl.classList.remove('active');

    currentStep++;

    const nextStepEl = document.querySelector(`.quiz-step[data-step="${currentStep}"]`);
    if (nextStepEl) {
        nextStepEl.classList.add('active');
    }
    
    updateProgressBar();
}

/**
 * Обновление полосы прогресса
 */
function updateProgressBar() {
    const percent = ((currentStep - 1) / (totalSteps - 1)) * 100;
    const bar = document.getElementById('quizBar');
    if (bar) {
        bar.style.width = percent + '%';
    }
}

/**
 * Сбор данных и отправка в WhatsApp
 */
function sendQuiz() {
    const phone = document.getElementById('phone').value;
    
    if (!phone) {
        alert('Пожалуйста, введите ваш номер телефона');
        return;
    }

    const message = `Новая заявка (Подбор дизайна):%0A` +
                    `— Стиль: ${quizData[1]}%0A` +
                    `— Помещение: ${quizData[2]}%0A` +
                    `— Изделие: ${quizData[3]}%0A` +
                    `— Телефон: ${phone}`;

    const whatsappUrl = `https://wa.me/77000000000?text=${message}`;
    
    window.open(whatsappUrl, '_blank');
}