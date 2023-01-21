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
    //механизм анимации стрелки
    //получаем массив всех элементов с классом .menu__arrow
    const arrArrows = Array.from(document.querySelectorAll('.menu__arrow'));
    //при нажатии на стрелку у родителя(<li>)появляется класс _active или исчезает,если он был!!!
    if (arrArrows.length > 0) {
        arrArrows.forEach(el => el.addEventListener('click', function () {
            el.parentElement.classList.toggle('_active');
        }));
    }
} else {
    document.body.classList.add('_pc');
}

// механизм smooth scrolling to sections
//массив всех элементов, у которых есть атрибут data-goto
const dataGo = Array.from(document.querySelectorAll('.menu__link[data-goto]'));
if (dataGo.length > 0) {
    dataGo.forEach(el => {
        el.addEventListener('click', clickMenuLink);
    });

    function clickMenuLink(e) {
        //обязательно,чтобы отключить перезагрузку страницы,которую совершает по умолчанию элемент ссылка
        e.preventDefault();
        //элемент на который мы совершили клик
        const menuLink = e.target;
        //получаем значение из data attribute
        const classEl = menuLink.dataset.goto;
        //get element by class name
        const gotoBlock = document.querySelector(classEl);
        console.log(gotoBlock);
        if (classEl && gotoBlock) {
            //pageYOffset - это прокрутка документа,величина текущего скролла
            const heightHeader = document.querySelector('.header').offsetHeight;
            //
            const valueGotoBlock = gotoBlock.getBoundingClientRect().top + pageYOffset - heightHeader;
            console.log('height', valueGotoBlock);
            //это код,который позволяет скролить к нужному элементу
            window.scrollTo({
                top: valueGotoBlock,
                behavior: "smooth",
            });
            // valueGotoBlock=0;
        }
    }
}