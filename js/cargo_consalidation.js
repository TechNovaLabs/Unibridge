// Всплывающее меню
document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(function(dropdown) {
        const dropdownButton = dropdown.querySelector('.plug');
        const dropdownIcon = dropdownButton.querySelector('.img_plug');
        const dropdownContent = dropdown.querySelector('.dropdown_content');

        dropdownButton.addEventListener('click', function(event) {
            event.preventDefault(); // Предотвратить стандартное действие ссылки
            
            if (dropdownContent.classList.contains('show')) {
                dropdownContent.classList.remove('show');
                dropdownContent.classList.add('hide');
                setTimeout(() => {
                    dropdownContent.classList.remove('hide');
                    dropdownContent.style.display = 'none';
                }, 500); // Устанавливаем задержку, равную длительности перехода
            } else {
                dropdownContent.style.display = 'block';
                setTimeout(() => {
                    dropdownContent.classList.add('show');
                }, 0); // Добавляем класс для анимации появления
            }

            dropdownIcon.classList.toggle('rotate-180'); // Поворот иконки
        });

        // Закрыть выпадающий список, если кликнули вне его
        document.addEventListener('click', function(event) {
            if (!dropdown.contains(event.target) && !dropdownButton.contains(event.target)) {
                if (dropdownContent.classList.contains('show')) {
                    dropdownContent.classList.remove('show');
                    dropdownContent.classList.add('hide');
                    setTimeout(() => {
                        dropdownContent.classList.remove('hide');
                        dropdownContent.style.display = 'none';
                    }, 500); // Устанавливаем задержку, равную длительности перехода
                    dropdownIcon.classList.remove('rotate-180'); // Вернуть иконку в исходное состояние
                }
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

// Модальные окна

document.addEventListener('DOMContentLoaded', (event) => {
    var modal = document.getElementById("modal");
    var span = document.getElementById("close");  // Изменено на ID

    var cargo_consalidation_header_link_call = document.getElementById("cargo_consalidation_header_link_call");
    var cargo_consalidation_banner_link_call = document.getElementById("cargo_consalidation_banner_link_call");
    var cargo_consalidation_content_link_call = document.getElementById("cargo_consalidation_content_link_call");
    

    cargo_consalidation_header_link_call.onclick = function(event) {
        event.preventDefault();
        modal.style.display = "block";
    }

    cargo_consalidation_banner_link_call.onclick = function(event) {
        event.preventDefault();
        modal.style.display = "block";
    }

    cargo_consalidation_content_link_call.onclick = function(event) {
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