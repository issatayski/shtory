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

    const stepEl = document.querySelector(`.quiz-step[data-step="${stepNum}"]`);
    stepEl.style.opacity = '0.6';

    setTimeout(() => {
        nextStep();
    }, 250);
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

    const loader = document.getElementById('quizLoader');
    loader.style.display = 'block';

    // формируем сообщение
    const message = `Здравствуйте! Я прошёл квиз:%0A%0A` +
                    `— Стиль: ${quizData[1]}%0A` +
                    `— Помещение: ${quizData[2]}%0A` +
                    `— Интерес: ${quizData[3]}%0A%0A` +
                    `Подберите, пожалуйста, варианты и пример стоимости.`;

    const whatsappUrl = `https://wa.me/77754046186?text=${message}`;

    // небольшая задержка для UX
    setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        loader.style.display = 'none';
    }, 900);
}

const previews = document.querySelectorAll('.video-preview');
const modal = document.getElementById('modal');
const video = document.getElementById('video');
const progressBar = document.getElementById('progressBar');
const loader = document.getElementById('loader');

previews.forEach(preview => {
  preview.addEventListener('click', () => {

    const src = preview.getAttribute('data-video');

    modal.classList.add('active');
    document.body.classList.add('modal-open');

    // показываем loader
    loader.style.display = 'block';
    video.classList.remove('show');

    // подставляем видео
    video.src = src;
    video.load();

    // включаем звук
    video.muted = false;
    video.volume = 1;

    video.play();
  });
});

// когда видео загрузилось
video.addEventListener('canplay', () => {
  loader.style.display = 'none';
  video.classList.add('show');
});

// прогресс
video.addEventListener('timeupdate', () => {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.width = percent + '%';
});

// конец видео
video.addEventListener('ended', closeModal);

// закрытие
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

function closeModal() {
  modal.classList.remove('active');
  document.body.classList.remove('modal-open');

  video.pause();
  video.src = ''; // очищаем
  progressBar.style.width = '0%';
}

// Логика мобильного меню
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

function toggleMenu() {
    menuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    
    // Блокируем скролл при открытом меню
    if (mobileMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

menuToggle.addEventListener('click', toggleMenu);

// Закрытие меню при клике на ссылку (уже добавлено в HTML через onclick)
