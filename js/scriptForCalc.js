window.addEventListener('DOMContentLoaded', () => {

    // Modal


    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'icons/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    }

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalCloser = document.querySelector('[data-close]');

    function openModal() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal)
    });

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    };

    modalCloser.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.style.display == 'block')
            closeModal();
    });


    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;

            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const object = {};
            formData.forEach(function (value, key) {
                object[key] = value;
            });

            const request = new XMLHttpRequest();
            request.open('POST', 'index.xml');

            fetch('js/index.xml',
                {
                    headers: {
                        'Content-type': 'application/xml'
                    },
                }
            ).then(data => data.text())
                .then(data => {
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                });
        });
    };

    const modalTimerId = setTimeout(openModal, 50000);

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.remove('show');
        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll)

    // Класс для создания карточек

    fetch('js/index.xml')
        .then(function (response) {
            return response.text();
        })
        .then(function (xmlDocText) {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlDocText, "text/xml");
            const MenuCards = xmlDoc.querySelectorAll('elementBlocks');
            const tableBody = document.querySelector(".menu__container");
            MenuCards.forEach(function (student) {
                const scr = student.querySelector("imagine").textContent;
                const alt = student.querySelector("imgAlt").textContent;
                const title = student.querySelector("headTitle3").textContent;
                const text = student.querySelector("textBlock").textContent;
                const price = student.querySelector("priceBlock").textContent;
                tableBody.innerHTML += `
                <div class="menu__item">
                    <img src=${scr} alt=${alt}>
                    <h3 class="menu__item-subtitle">${title}</h3>
                    <div class="menu__item-descr">${text}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${price * 3}</span> руб/день</div>
                    </div>
                </div>`;
            });
        })
        .catch(function (error) {
            console.error('Error fetching or parsing XML:', error);
        });


    //Калькулятор 


    const result = document.querySelector('.calculating__result span');
    let sex = 'female',
        height, weight, age,
        ratio = 1.375;

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInformation(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                } else {
                    sex = e.target.getAttribute('id');
                }


                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });

                e.target.classList.add(activeClass);
                calcTotal();
            });
        })

    };

    getStaticInformation('#gender', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();

        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
});