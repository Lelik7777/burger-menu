'use strict';
// это позволяет узнать на каком устройстве открыто приложение - в данном случае нас интересует,что открыто мобильном приложении
const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows()
        );
    }
}
if (isMobile.any()) {
    document.body.classList.add('_touch');
    //получаем массив всех элементов с классом .menu__arrow
    const arrArrows = Array.from(document.querySelectorAll('.menu__arrow'));
    //при нажатии на стрелку у родителя(<li>)появляется класс _active или исчезает,если он был!!!
    arrArrows.forEach(el => el.addEventListener('click', function () {
        el.parentElement.classList.toggle('_active');
    }));

} else {
    document.body.classList.add('_pc');
}