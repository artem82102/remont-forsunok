document.addEventListener('DOMContentLoaded', function() {
    
    // --- Логика для мобильного меню (бургера) ---
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (burgerMenu && navLinks) {
        burgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

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
                
                // Сначала закрываем все другие открытые элементы
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-answer').style.maxHeight = null;
                    }
                });

                // Открываем или закрываем текущий элемент
                if (!isActive) {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                } else {
                    item.classList.remove('active');
                    answer.style.maxHeight = null;
                }
            });
        }
    });

    // --- Логика для калькулятора ---
    const calcForm = document.getElementById('calc-form');

    if (calcForm) {
        const costs = {
            common_rail: { standard: 5000, complex: 9000 },
            pde_uis: { standard: 6000, complex: 12000 },
            pld_ups: { standard: 7000, complex: 18000 }
        };

        calcForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const injectorType = document.getElementById('injector-type').value;
            const quantity = parseInt(document.getElementById('quantity').value, 10);
            const repairType = document.getElementById('repair-type').value;

            if (isNaN(quantity) || quantity <= 0) {
                alert('Пожалуйста, введите корректное количество форсунок.');
                return;
            }

            const basePrice = costs[injectorType][repairType];
            const totalPrice = basePrice * quantity;
            const formattedPrice = totalPrice.toLocaleString('ru-RU');
            const resultDiv = document.getElementById('calc-result');
            resultDiv.innerHTML = `<p style="margin:0; font-size: 1rem;">Предварительная стоимость:</p><p class="final-price">${formattedPrice} ₽</p>`;
        });
    }

});
