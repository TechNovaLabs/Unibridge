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
setInterval(autoChangeImage, 10000);

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
    var modals = {
        header: document.getElementById("modal-header"),
        banner: document.getElementById("modal-banner"),
        content: document.getElementById("modal-content")
    };

    var spans = {
        header: document.getElementById("close-header"),
        banner: document.getElementById("close-banner"),
        content: document.getElementById("close-content")
    };

    var index_header_link_call = document.getElementById("index_header_link_call");
    var index_banner_union_right = document.getElementById("index_banner_union_right");
    var index_content_link_call = document.getElementById("index_content_link_call");

    index_header_link_call.onclick = function(event) {
        event.preventDefault();
        modals.header.style.display = "block";
    }

    index_banner_union_right.onclick = function(event) {
        event.preventDefault();
        modals.banner.style.display = "block";
    }

    index_content_link_call.onclick = function(event) {
        event.preventDefault();
        modals.content.style.display = "block";
    }

    spans.header.onclick = function() {
        modals.header.style.display = "none";
    }

    spans.banner.onclick = function() {
        modals.banner.style.display = "none";
    }

    spans.content.onclick = function() {
        modals.content.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modals.header) {
            modals.header.style.display = "none";
        }
        if (event.target == modals.banner) {
            modals.banner.style.display = "none";
        }
        if (event.target == modals.content) {
            modals.content.style.display = "none";
        }
    }

    // Форматирование ввода телефона (можно оставить один обработчик, если нужно)
    var phoneInputs = [
        document.getElementById("phone-header"),
        document.getElementById("phone-banner"),
        document.getElementById("phone-content")
    ];

    phoneInputs.forEach(function(phoneInput) {
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
});

// Для хедера
document.getElementById('index_header_button').addEventListener('click', function() {
    const name = document.getElementById('name-header').value;  
    const phone = document.getElementById('phone-header').value;  
    const email = document.getElementById('email-header').value;  

    // Проверка на заполненность полей
    let errorMessage = '';
    if (!phone && !email) {
        errorMessage = 'Заполните обязательные поля: Телефон и E-mail';
    } else if (!phone) {
        errorMessage = 'Заполните обязательное поле: Телефон';
    } else if (!email) {
        errorMessage = 'Заполните обязательное поле: E-mail';
    }

    if (errorMessage) {
        alert(errorMessage); // Выводим сообщение об ошибке
        return; // Прерываем выполнение, если есть ошибки
    }

    // Если все поля заполнены, отправляем форму
    fetch('/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phone, email, source: 'Главная страница' }),  // Добавляем источник
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Ошибка сети');
        }
        return response.text();
    })
    .then(data => {
        console.log(data);
        document.getElementById('form-header').style.display = 'none'; // Скрываем форму
        document.getElementById('success-message-header').style.display = 'block'; // Показываем сообщение об успешной отправке
        document.getElementById('close-success-message-header').style.display = 'block'; // Показываем кнопку "Ок"
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });
});

// Обработчик для кнопки "Ок - Хедер"
document.getElementById('close-success-message-header').addEventListener('click', function() {
    document.getElementById('success-message-header').style.display = 'none'; // Скрываем сообщение
    document.getElementById('close-success-message-header').style.display = 'none'; // Скрываем кнопку "Ок"
    document.getElementById('modal-header').style.display = 'none'; // Закрываем модальное окно

    // Сброс формы для повторного использования
    document.getElementById('name-header').value = ''; // Очищаем поле "Имя"
    document.getElementById('phone-header').value = ''; // Очищаем поле "Телефон"
    document.getElementById('email-header').value = ''; // Очищаем поле "E-mail"
    
    // Возвращаем форму в исходное состояние
    document.getElementById('form-header').style.display = 'block'; // Показываем форму заново
});


// Для банера
document.getElementById('index_banner_button').addEventListener('click', function() {
    const name = document.getElementById('name-banner').value;
    const phone = document.getElementById('phone-banner').value;
    const email = document.getElementById('email-banner').value;

    // Проверка на заполненность полей
    let errorMessage = '';
    if (!phone && !email) {
        errorMessage = 'Заполните обязательные поля: Телефон и E-mail';
    } else if (!phone) {
        errorMessage = 'Заполните обязательное поле: Телефон';
    } else if (!email) {
        errorMessage = 'Заполните обязательное поле: E-mail';
    }

    if (errorMessage) {
        alert(errorMessage); // Выводим сообщение об ошибке
        return; // Прерываем выполнение, если есть ошибки
    }

    // Если все поля заполнены, отправляем форму
    fetch('/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phone, email, source: 'Главная страница' }),  // Добавляем источник
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Ошибка сети');
        }
        return response.text();
    })
    .then(data => {
        console.log(data);
        document.getElementById('form-banner').style.display = 'none'; // Скрываем форму
        document.getElementById('success-message-banner').style.display = 'block'; // Показываем сообщение об успешной отправке
        document.getElementById('close-success-message-banner').style.display = 'block'; // Показываем кнопку "Ок"
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });
});

// Обработчик для кнопки "Ок - Баннер"
document.getElementById('close-success-message-banner').addEventListener('click', function() {
    document.getElementById('success-message-banner').style.display = 'none'; // Скрываем сообщение
    document.getElementById('close-success-message-banner').style.display = 'none'; // Скрываем кнопку "Ок"
    document.getElementById('modal-banner').style.display = 'none'; // Закрываем модальное окно

    // Сброс формы для повторного использования
    document.getElementById('name-banner').value = ''; // Очищаем поле "Имя"
    document.getElementById('phone-banner').value = ''; // Очищаем поле "Телефон"
    document.getElementById('email-banner').value = ''; // Очищаем поле "E-mail"
    
    // Возвращаем форму в исходное состояние
    document.getElementById('form-banner').style.display = 'block'; // Показываем форму заново
});

// Для контента
document.getElementById('index_content_button').addEventListener('click', function() {
    const name = document.getElementById('name-content').value;
    const phone = document.getElementById('phone-content').value;
    const email = document.getElementById('email-content').value;

    // Проверка на заполненность полей
    let errorMessage = '';
    if (!phone && !email) {
        errorMessage = 'Заполните обязательные поля: Телефон и E-mail';
    } else if (!phone) {
        errorMessage = 'Заполните обязательное поле: Телефон';
    } else if (!email) {
        errorMessage = 'Заполните обязательное поле: E-mail';
    }

    if (errorMessage) {
        alert(errorMessage); // Выводим сообщение об ошибке
        return; // Прерываем выполнение, если есть ошибки
    }

    // Если все поля заполнены, отправляем форму
    fetch('/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, phone, email, source: 'Главная страница' }),  // Добавляем источник
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Ошибка сети');
        }
        return response.text();
    })
    .then(data => {
        console.log(data);
        document.getElementById('form-content').style.display = 'none'; // Скрываем форму
        document.getElementById('success-message-content').style.display = 'block'; // Показываем сообщение об успешной отправке
        document.getElementById('close-success-message-content').style.display = 'block'; // Показываем кнопку "Ок"
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });
});

// Обработчик для кнопки "Ок - Баннер"
document.getElementById('close-success-message-content').addEventListener('click', function() {
    document.getElementById('success-message-content').style.display = 'none'; // Скрываем сообщение
    document.getElementById('close-success-message-content').style.display = 'none'; // Скрываем кнопку "Ок"
    document.getElementById('modal-content').style.display = 'none'; // Закрываем модальное окно

    // Сброс формы для повторного использования
    document.getElementById('name-content').value = ''; // Очищаем поле "Имя"
    document.getElementById('phone-content').value = ''; // Очищаем поле "Телефон"
    document.getElementById('email-content').value = ''; // Очищаем поле "E-mail"
    
    // Возвращаем форму в исходное состояние
    document.getElementById('form-content').style.display = 'block'; // Показываем форму заново
});
