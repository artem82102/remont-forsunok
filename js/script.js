document.addEventListener('DOMContentLoaded', function() {
    
    // --- Логика для мобильного меню (бургера) ---
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');
    if (burgerMenu && navLinks) {
        burgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // --- Логика для аккордеона (FAQ) ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        if (question && answer) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-answer').style.maxHeight = null;
                    }
                });
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

    // --- Логика для калькулятора на странице 'Цены' ---
    const pricingCalcForm = document.getElementById('calc-form');
    if (pricingCalcForm) {
        const resultDiv = document.getElementById('calc-result');
        const injectorSelect = document.getElementById('injector-type');
        const quantityInput = document.getElementById('quantity');
        const repairSelect = document.getElementById('repair-type');

        const prices = {
            common_rail: { min: 4000, max: 14000 },
            pde_uis:     { min: 4000, max: 20000 },
            pld_ups:     { min: 4000, max: 35000 }
        };

        const calculateAndShowPrice = () => {
            const injectorKey = injectorSelect.value;
            const quantity = parseInt(quantityInput.value, 10);
            const repairType = repairSelect.value;

            if (isNaN(quantity) || quantity < 1) {
                resultDiv.innerHTML = `<p class="result-placeholder">Укажите корректное количество.</p>`;
                return;
            }

            const priceData = prices[injectorKey];
            let total, resultHtml;

            if (repairType === 'standard') {
                total = priceData.min * quantity;
                resultHtml = `<h3>Предварительная стоимость</h3>
                              <div class="price-range">${total.toLocaleString('ru-RU')} ₽</div>
                              <p class="price-details">За ${quantity} шт. (стандартный ремонт)</p>`;
            } else { // complex
                const avgPrice = (priceData.min + priceData.max) / 2;
                total = avgPrice * quantity;
                resultHtml = `<h3>Предварительная стоимость</h3>
                              <div class="price-range">~ ${total.toLocaleString('ru-RU')} ₽</div>
                              <p class="price-details">За ${quantity} шт. (комплексный ремонт)</p>`;
            }
            resultDiv.innerHTML = resultHtml;
        };

        // Обновляем при любом изменении
        injectorSelect.addEventListener('change', calculateAndShowPrice);
        quantityInput.addEventListener('input', calculateAndShowPrice);
        repairSelect.addEventListener('change', calculateAndShowPrice);

        // Первоначальный расчет при загрузке
        calculateAndShowPrice();
    }

    // --- Логика для плавной анимации при скролле ---
    const animatedElements = document.querySelectorAll('section, .card, .info-block, .table-container, .calculator-wrapper, .feature-card, .step, .review-card, .faq-section-card, .contact-grid, .testimonial-card');
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(element => {
            element.classList.add('fade-in-element');
            observer.observe(element);
        });
    }

    // --- Logo Scroller --- //
    const scrollers = document.querySelectorAll(".scroller");

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        addAnimation();
    }

    function addAnimation() {
        scrollers.forEach((scroller) => {
            scroller.setAttribute("data-animated", true);

            const scrollerInner = scroller.querySelector(".scroller__inner");
            const scrollerContent = Array.from(scrollerInner.children);

            scrollerContent.forEach(item => {
                const duplicatedItem = item.cloneNode(true);
                duplicatedItem.setAttribute("aria-hidden", true);
                scrollerInner.appendChild(duplicatedItem);
            });
        });
    }

}); // <-- Здесь ЕДИНСТВЕННЫЙ раз закрывается DOMContentLoaded