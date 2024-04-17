window.addEventListener('DOMContentLoaded', () => {







    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');




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
    // hideofferTabContent(offers);
    // showOffer();



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

    const slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        slidesField = document.querySelector('.offer__slider-inner'),
        offers = document.querySelectorAll('.offer__slide'),
        offerSwitchPrev = document.querySelector('.offer__slider-prev'),
        offerSwitchNext = document.querySelector('.offer__slider-next'),
        currentValueOffer = document.querySelector('#current'),
        width = window.getComputedStyle(slidesWrapper).width;

    let current = 1,
        offset = 0;



    slidesField.style.width = 100 * offers.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    offers.forEach(slide => {
        slide.style.width = width;
    });

    offerSwitchNext.addEventListener('click', () => {
        if (offset == +width.slice(0, width.length - 2) * (offers.length - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
        }


        slidesField.style.transform = `translateX(-${offset}px)`
        if (current == offers.length) {
            current = 1;
        } else {
            current++;
        }
        currentValueOffer.textContent = `0${current}`;
    });

    offerSwitchPrev.addEventListener('click', () => {

        if (offset == 0) {
            offset = +width.slice(0, width.length - 2) * (offers.length - 1)
        } else {
            offset -= +width.slice(0, width.length - 2);
        }


        slidesField.style.transform = `translateX(-${offset}px)`;
        if (current == 1) {
            current = offers.length;
        } else {
            current--;
        }
        currentValueOffer.textContent = `0${current}`;
    });




    // function showOffer() {
    //     offers[current].style.display = 'block';
    //     currentValueOffer.textContent = '0' + (current + 1);
    // }

    // offerSwitchNext.addEventListener('click', event => {
    //     if (current < 3) {
    //         current++;
    //         hideofferTabContent(offers);
    //         showOffer();
    //     }
    //     else {
    //         current -= 3;
    //         hideofferTabContent(offers);
    //         showOffer();
    //     }
    // });

    // offerSwitchPrev.addEventListener('click', event => {
    //     if (current > 0) {
    //         current--;
    //         hideofferTabContent(offers);
    //         showOffer();
    //     }
    //     else {
    //         current += 3;
    //         hideofferTabContent(offers);
    //         showOffer();
    //     }
    // });



    window.addEventListener('scroll', showModalByScroll)

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
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                });
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
                <div class="modal__close" data-close>×</div>
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


}); 