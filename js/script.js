window.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items'),
        offers = document.querySelectorAll('.offer__slide'),
        offerSwitchPrev = document.querySelector('.offer__slider-prev'),
        offerSwitchNext = document.querySelector('.offer__slider-next'),
        currentValueOffer = document.querySelector('#current');

    let current = +currentValueOffer.textContent - 1;


    function hideTabContent(tab, tabItem) {
        tab.forEach(item => {
            item.style.display = 'none';
        });
        tabItem.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }
    function hideofferTabContent(tab) {
        tab.forEach(item => {
            item.style.display = 'none';
        });
        tab.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }
    function showTabContent(i = 0) {
        tabsContent[i].style.display = 'block';

        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent(tabsContent, tabs);
    showTabContent();
    hideofferTabContent(offers);
    showOffer();



    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent(tabsContent, tabs);
                    showTabContent(i);
                };

            });
        }
    });


    //Timer

    const deadLine = '2024-05-20';

    function getTimeRemaining(endTime) {
        let days, hours, minutes, seconds;
        const t = Date.parse(endTime) - Date.parse(new Date);
        if (t < 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        }
        else {
            days = Math.floor(t / (1000 * 60 * 60 * 24));
            hours = Math.floor((t / (1000 * 60 * 60) % 24));
            minutes = Math.floor((t / 1000 / 60) % 60);
            seconds = Math.floor((t / 1000) % 60);
        }

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num < 10 && num >= 0)
            return `0${num}`;
        else
            return num;
    }

    function setClock(selector, endTime) {

        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);
        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endTime);
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadLine);


    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalCloser = document.querySelector('[data-close]');

    function openModal() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal)
    });

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    };



    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.style.display == 'block')
            closeModal();
    });

    const modalTimerId = setTimeout(openModal, 50000);

    function showModalByScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }




    function showOffer() {
        offers[current].style.display = 'block';
        currentValueOffer.textContent = '0' + (current + 1);
    }



    offerSwitchNext.addEventListener('click', event => {
        if (current < 3) {
            current++;
            hideofferTabContent(offers);
            showOffer();
        }
        else {
            current -= 3;
            hideofferTabContent(offers);
            showOffer();
        }
    });

    offerSwitchPrev.addEventListener('click', event => {
        if (current > 0) {
            current--;
            hideofferTabContent(offers);
            showOffer();
        }
        else {
            current += 3;
            hideofferTabContent(offers);
            showOffer();
        }
    });
    window.addEventListener('scroll', showModalByScroll)

    // Класс для создания карточек

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 3;
            this.changeToBLR();
        }

        changeToBLR() {
            this.price = this.price * this.transfer;
        }
        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }


            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    // const xmlhttp = new XMLHttpRequest();
    // xmlhttp.open("GET", "cd_catalog.xml", false);



    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов.Продукт активных и здоровых людей.Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container',
        'menu__item',
        'big'
    ).render();
    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню "Премиум"',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода  в ресторан!',
        14,
        '.menu .container',
        'menu__item'
    ).render();
    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        21,
        '.menu .container',
        'menu__item'
    ).render();

    fetch('students.xml')
        .then(function (response) {
            return response.text();
        })
        .then(function (xmlDocText) {
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(xmlDocText, "text/xml");
            var students = xmlDoc.querySelectorAll("student");
            var tableBody = document.querySelector("#students-table tbody");
            students.forEach(function (student) {
                var name = student.querySelector("name").textContent;
                var age = student.querySelector("age").textContent;
                var grade = student.querySelector("grade").textContent;
                var row = "<tr><td>" + name + "</td><td>" + age + "</td><td>" + grade + "</td></tr>";
                tableBody.innerHTML += row;
            });
        })
        .catch(function (error) {
            console.error('Error fetching or parsing XML:', error);
        });

    //forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'icons/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    }

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            form.reset();
            showThanksModal(message.success);
            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            form.insertAdjacentElement('afterend', statusMessage);
            statusMessage.remove();
            // statusMessage.textContent = message.loading;


            // const request = new XMLHttpRequest();
            // request.open('POST', 'server.php');

            // const formData = new FormData(form);

            // request.send(formData);

            // request.addEventListener('load', () => {
            //     if (request.status === 200) {
            //         console.log(request.response);
            //     } else {
            //         statusMessage.textContent = message.failure;
            //     }
            // });

        });
    };

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.remove('show');
        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
                <div class="modal__content">
                    <div class="modal__close" data-close>&times;</div>
                    <div class="modal__title">${message}</div >
                </div >
            `;
        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }



}); 