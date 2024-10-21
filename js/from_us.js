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


// Скрытие футреа 
document.getElementById('toggleButton').addEventListener('click', function() {
    const contentFooter = document.querySelector('.content_footer');
    const button = document.getElementById('toggleButton');
    
    contentFooter.classList.toggle('hidden');
    button.classList.toggle('rotated');
});

// Моадльные окна


document.addEventListener('DOMContentLoaded', (event) => {
    var modals = {
        header: document.getElementById("modal-header"),
    };

    var spans = {
        header: document.getElementById("close-header"),
    };

    var index_header_link_call = document.getElementById("payment_header_link_call");

    index_header_link_call.onclick = function(event) {
        event.preventDefault();
        modals.header.style.display = "block";
    }

    spans.header.onclick = function() {
        modals.header.style.display = "none";
    }

   
    window.onclick = function(event) {
        if (event.target == modals.header) {
            modals.header.style.display = "none";
        }
        if (event.target == modals.banner) {
            modals.banner.style.display = "none";
        }
    }

    // Форматирование ввода телефона (можно оставить один обработчик, если нужно)
    var phoneInputs = [
        document.getElementById("phone-header"),
        document.getElementById("phone-content-purchase-lots"),
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
document.getElementById('from_us_header_button').addEventListener('click', function() {
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
        body: JSON.stringify({ name, phone, email, source: 'Страница: О нас' }),  // Добавляем источник
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



