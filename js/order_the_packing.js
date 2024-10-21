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

// Ограничения по слуге

document.addEventListener('DOMContentLoaded', function () {
    var toggles = document.querySelectorAll('.link_info_service_restriction');
    toggles.forEach(function (toggle) {
        toggle.addEventListener('click', function (event) {
            event.preventDefault(); // Предотвращаем переход по ссылке
            var targetId = toggle.getAttribute('data-target');
            var dropdown = document.getElementById(targetId);
            var icon = toggle.querySelector('.img_link_info_service_restriction');

            if (dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
                icon.classList.remove('rotated');
            } else {
                document.querySelectorAll('.dropdown_info_service_restriction').forEach(function (drop) {
                    drop.classList.remove('show');
                });
                document.querySelectorAll('.img_link_info_service_restriction').forEach(function (img) {
                    img.classList.remove('rotated');
                });
                dropdown.classList.add('show');
                icon.classList.add('rotated');
            }
        });
    });
});

// Скрытие футреа 
document.getElementById('toggleButton').addEventListener('click', function() {
    const contentFooter = document.querySelector('.content_footer');
    const button = document.getElementById('toggleButton');
    
    contentFooter.classList.toggle('hidden');
    button.classList.toggle('rotated');
});

// Слайдер для упаковки 

const blocks = [
    { id: 'block-1', image: '../../img/packing_1.png', info1: 'Обрешетка', info2: 'Каркас из деревянных решеток (досок, брусьев), который способствует хорошей фиксации груза и его защите от механических повреждений. Применяется для упаковки хрупкого и бьющегося товара.' },
    { id: 'block-2', image: '../../img/packing_2.png', info1: 'Стандартная упаковка', info2: 'Осуществляется при помощи картонной коробки, мешка и скотча.' },
    { id: 'block-3', image: '../../img/packing_3.png', info1: 'Паллетный борт', info2: 'Обычный поддон с деревянными бортами и фанерной крышкой. Применяется для крупногабаритных и тяжелых грузов. Погрузочно-разгрузочные работы товаров, упакованных таким образом, осуществляются при помощи вилочного погрузчика.' },
    { id: 'block-4', image: '../../img/packing_4.png', info1: 'Деревянная коробка', info2: 'Вид упаковки для особо хрупкого товара.' },
    { id: 'block-5', image: '../../img/packing_5.png', info1: 'Пенопласт', info2: 'Пленка с воздушными пузырями, многослойная плотная бумага, пленка, пенопласт. В пузырчатую пленку есть смысл обернуть технику, гаджеты, часы перед тем, как уложить в коробку, потому как она: •Хорошо амортизирует(смягчает удары) •Защищает от влаги •Не пропускает воздух •Прекрасно противостоит температурам и пыли.' },
    { id: 'block-6', image: '../../img/packing_6.png', info1: 'Пузырчатая плёнка', info2: 'Пленка с воздушными пузырями, многослойная плотная бумага, пленка, пенопласт. В пузырчатую пленку есть смысл обернуть технику, гаджеты, часы перед тем, как уложить в коробку, потому как она: •Хорошо амортизирует (смягчает удары); •Защищает от влаги; •Не пропускает воздух; •Прекрасно противостоит температурам и пыли.' },
    { id: 'block-7', image: '../../img/packing_7.png', info1: 'Упаковка согласно требованиям клиента', info2: '(индивидуальный вид упаковки)' }
];

let currentIndex = 0;

function renderBlocks() {
    const blockElements = document.querySelectorAll('.block');
    for (let i = 0; i < 3; i++) {
        const block = blocks[(currentIndex + i) % blocks.length];
        blockElements[i].style.backgroundImage = `url(${block.image})`;
        blockElements[i].style.opacity = (i === 1) ? '1' : '0.6';
        blockElements[i].querySelector('.info .info1').textContent = block.info1;
        blockElements[i].querySelector('.info .info2').textContent = block.info2;
    }
}

document.getElementById('left-button').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + blocks.length) % blocks.length;
    renderBlocks();
});

document.getElementById('right-button').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % blocks.length;
    renderBlocks();
});

// Open modal when 'Заказать' button is clicked
const orderButtons = document.querySelectorAll('.order-button');
const modal = document.getElementById('modal');
const closeModal = document.querySelector('.close');

orderButtons.forEach(button => {
    button.addEventListener('click', () => {
        modal.style.display = 'block';
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal when clicking outside of the modal content
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Initial render
renderBlocks();

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

    var index_header_link_call = document.getElementById("order_the_packing_header_link_call");
    var index_banner_union_right = document.getElementById("txt_order_the_packing_banner_link_call");
    var index_content_link_call = document.getElementById("order_the_packing_link_content_button");

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
document.getElementById('order_the_packing_header_button').addEventListener('click', function() {
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
        body: JSON.stringify({ name, phone, email, source: 'Страница: Упаковка' }),  // Добавляем источник
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
document.getElementById('order_the_packing_banner_button').addEventListener('click', function() {
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
        body: JSON.stringify({ name, phone, email, source: 'Страница: Упаковка' }),  // Добавляем источник
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
document.getElementById('order_the_packing_content_button').addEventListener('click', function() {
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
        body: JSON.stringify({ name, phone, email, source: 'Страница - Упаковка. Раздел: Выбрать упаковку' }),  // Добавляем источник
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
