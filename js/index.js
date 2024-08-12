// Всплывающее меню
document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');
    const hamburgerIcon = document.querySelector('.hamburger_icon');
    const hamburgerContent = document.querySelector('.hamburger_content');

    // Функционал для стандартных выпадающих меню
    dropdowns.forEach(function(dropdown) {
        const dropdownButton = dropdown.querySelector('.plug');
        const dropdownContent = dropdown.querySelector('.dropdown_content');

        dropdownButton.addEventListener('click', function(event) {
            event.preventDefault(); // Предотвратить стандартное действие ссылки

            // Скрыть все подменю, кроме текущего
            dropdowns.forEach(function(d) {
                if (d !== dropdown) {
                    d.querySelector('.dropdown_content').classList.remove('show');
                }
            });

            // Переключить текущее подменю
            dropdownContent.classList.toggle('show');
        });
    });

    // Функционал для гамбургер-меню
    hamburgerIcon.addEventListener('click', function(event) {
        event.stopPropagation(); // Остановить всплытие события
        hamburgerContent.classList.toggle('show');
    });

    // Закрыть гамбургер-меню, если кликнули вне его
    document.addEventListener('click', function(event) {
        if (!hamburgerIcon.contains(event.target) && !hamburgerContent.contains(event.target)) {
            if (hamburgerContent.classList.contains('show')) {
                hamburgerContent.classList.remove('show');
            }
        }
    });
});

//  Смена банера

var currentImage = 1;
var lastButtonPressed = false;

function changeImage(imageNumber) {
    var imgElement = document.getElementById('banner');
    imgElement.src = 'img/banner_' + imageNumber + '.png';
    currentImage = imageNumber;
    lastButtonPressed = true; // Фиксируем, что кнопка была нажата

    toggleLinkBannerAboutUs(imageNumber);
    updateButtonStyles(imageNumber);
}

function autoChangeImage() {
    if (!lastButtonPressed) { // Если кнопка не была нажата
        currentImage = (currentImage % 5) + 1; // Циклически меняем изображения от 1 до 5
        var imgElement = document.getElementById('banner');
        imgElement.src = 'img/banner_' + currentImage + '.png';

        toggleLinkBannerAboutUs(currentImage);
        updateButtonStyles(currentImage);
    }
    lastButtonPressed = false; // Сбрасываем флаг нажатия кнопки
}

function toggleLinkBannerAboutUs(imageNumber) {
    var linkBannerElement = document.getElementById('link_banner_about_us');
    if (imageNumber === 1) {
        linkBannerElement.style.display = 'block';
    } else {
        linkBannerElement.style.display = 'none';
    }
}

function updateButtonStyles(activeButtonNumber) {
    for (let i = 1; i <= 5; i++) {
        let button = document.getElementById('btn_switch_' + i);
        if (i === activeButtonNumber) {
            button.classList.remove('inactive-button');
            button.classList.add('active-button');
        } else {
            button.classList.remove('active-button');
            button.classList.add('inactive-button');
        }
    }
}

// Устанавливаем интервал для автоматической смены изображений каждые 5 секунд
setInterval(autoChangeImage, 5000);

// Смена новостей

document.addEventListener("DOMContentLoaded", function() {
    const newsBlocks = Array.from(document.querySelectorAll(".block_news"));
    const btnRight = document.getElementById("btn_news_right");
    const btnLeft = document.getElementById("btn_news_left");

    let currentIndex = 0;
    const totalNews = newsBlocks.length;

    function updateNews() {
        newsBlocks.forEach((block, index) => {
            // Показать только три новости: текущую и две следующие
            if (index === (currentIndex) % totalNews ||
                index === (currentIndex + 1) % totalNews ||
                index === (currentIndex + 2) % totalNews) {
                block.style.display = "flex";
            } else {
                block.style.display = "none";
            }
        });
    }

    function goRight() {
        currentIndex = (currentIndex + 1) % totalNews;
        updateNews();
    }

    function goLeft() {
        currentIndex = (currentIndex - 1 + totalNews) % totalNews;
        updateNews();
    }

    btnRight.addEventListener("click", goRight);
    btnLeft.addEventListener("click", goLeft);

    // Инициализация отображения новостей
    updateNews();
});

// Скрытие футера

document.getElementById('toggleButton').addEventListener('click', function() {
    const contentFooter = document.querySelector('.content_footer');
    const button = document.getElementById('toggleButton');
    
    contentFooter.classList.toggle('hidden');
    button.classList.toggle('rotated');
});



// Модальные окна

document.addEventListener('DOMContentLoaded', (event) => {
    var modal = document.getElementById("modal");
    var span = document.getElementById("close");  // Изменено на ID

    var index_header_link_call = document.getElementById("index_header_link_call");
    var index_banner_union_right = document.getElementById("index_banner_union_right");
    var index_content_link_call = document.getElementById("index_content_link_call");

    index_header_link_call.onclick = function(event) {
        event.preventDefault();
        modal.style.display = "block";
    }

    index_banner_union_right.onclick = function(event) {
        event.preventDefault();
        modal.style.display = "block";
    }

    index_content_link_call.onclick = function(event) {
        event.preventDefault();
        modal.style.display = "block";
    }





    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Форматирование ввода телефона
    var phoneInput = document.getElementById("phone");

    phoneInput.addEventListener("input", function(e) {
        var input = phoneInput.value.replace(/\D/g, '').substring(0, 11);
        var formattedNumber = "";

        if (input.length > 0) {
            formattedNumber = "+7 (";
        }
        if (input.length > 1) {
            formattedNumber += input.substring(1, 4);
        }
        if (input.length >= 4) {
            formattedNumber += ") " + input.substring(4, 7);
        }
        if (input.length >= 7) {
            formattedNumber += " - " + input.substring(7, 9);
        }
        if (input.length >= 9) {
            formattedNumber += " - " + input.substring(9, 11);
        }

        phoneInput.value = formattedNumber;
    });

    phoneInput.addEventListener("keydown", function(e) {
        var value = phoneInput.value.replace(/\D/g, '');

        // Разрешаем удаление символов
        if (e.key === "Backspace" && value.length > 0) {
            if (value.length <= 1) {
                phoneInput.value = "+7 (";
            } else if (value.length <= 4) {
                phoneInput.value = "+7 (" + value.substring(1, value.length - 1);
            } else if (value.length <= 7) {
                phoneInput.value = "+7 (" + value.substring(1, 4) + ") " + value.substring(4, value.length - 1);
            } else if (value.length <= 9) {
                phoneInput.value = "+7 (" + value.substring(1, 4) + ") " + value.substring(4, 7) + " - " + value.substring(7, value.length - 1);
            } else {
                phoneInput.value = "+7 (" + value.substring(1, 4) + ") " + value.substring(4, 7) + " - " + value.substring(7, 9) + " - " + value.substring(9, value.length - 1);
            }
        }
    });
});
