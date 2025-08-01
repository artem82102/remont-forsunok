// --- Мобильное меню (бургер) ---
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    // Toggle Nav
    navLinks.classList.toggle('active');

    // Burger Animation
    burger.classList.toggle('toggle');
});

// Закрытие меню при клике на ссылку
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            burger.classList.remove('toggle');
        }
    });
});

// --- Плавная прокрутка ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// --- Аккордеон для FAQ ---
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
        // Закрываем все остальные ответы
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
                otherItem.querySelector('.faq-answer').style.maxHeight = 0;
                 otherItem.querySelector('.faq-answer').style.padding = '0 20px';
            }
        });
        
        // Открываем или закрываем текущий
        item.classList.toggle('active');
        if (item.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + "px";
            answer.style.padding = '0 20px 15px';
        } else {
            answer.style.maxHeight = 0;
            answer.style.padding = '0 20px';
        }
    });
});