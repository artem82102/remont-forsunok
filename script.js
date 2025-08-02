document.addEventListener('DOMContentLoaded', function() {
    
    // --- Логика для мобильного меню (бургера) ---
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');

    // Проверяем, что элементы существуют, чтобы не было ошибок на страницах без них
    if (burgerMenu && navLinks) {
        burgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Закрываем меню при клике на ссылку (для мобильной версии)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            });
        });
    }


    // --- Логика для аккордеона (FAQ) с плавной анимацией ---
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (question && answer) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Сначала закрываем все открытые элементы, чтобы не было нескольких открытых одновременно
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-answer').style.maxHeight = null;
                    }
                });

                // Открываем или закрываем текущий элемент
                if (!isActive) {
                    item.classList.add('active');
                    // Устанавливаем max-height равным реальной высоте контента для анимации
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                } else {
                    item.classList.remove('active');
                    answer.style.maxHeight = null;
                }
            });
        }
    });

});
