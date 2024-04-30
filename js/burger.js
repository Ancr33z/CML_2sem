window.addEventListener('DOMContentLoaded', () => {


    const burger = document.querySelector('.header__burger'),
        burgModal = document.querySelector('.burger__links'),
        burgerCloser = document.querySelector('.burger__close');


    burger.addEventListener('click', () => {


        burgModal.removeAttribute('id', 'hide');
        burgModal.setAttribute('id', 'show');

    });
    burgerCloser.addEventListener('click', () => {
        burgModal.removeAttribute('id', 'show');
        burgModal.setAttribute('id', 'hide');
    });

});