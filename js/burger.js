window.addEventListener('DOMContentLoaded', () => {


    const burger = document.querySelector('.header__burger'),
        burgModal = document.querySelector('.burger__links'),
        burgerCloser = document.querySelector('.burger__close'),
        body = document.querySelector('body');


    burger.addEventListener('click', () => {

        body.classList.add('menu__opened');

        burgModal.removeAttribute('id', 'hide');
        burgModal.setAttribute('id', 'show');
    });
    burgerCloser.addEventListener('click', () => {
        burgModal.removeAttribute('id', 'show');
        burgModal.setAttribute('id', 'hide');
        body.classList.remove('menu__opened');

    });

});