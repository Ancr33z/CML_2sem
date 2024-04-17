window.addEventListener('DOMContentLoaded', () => {

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

    // const modalTimerId = setTimeout(openModal, 10000);

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
});