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

// Функция для управления отображением поля "Склад отправления"
function showWarehouse() {
    const packageType = document.getElementById('package').value;
    const warehouseContainer = document.getElementById('warehouse-container');

    // Если выбрана категория, которая требует выбора склада, отображаем его
    if (packageType) {
        warehouseContainer.style.display = 'block';  // Показываем выбор склада
    } else {
        warehouseContainer.style.display = 'none';  // Скрываем выбор склада
    }
}

// Инициализируем отображение склада в зависимости от изначального состояния
document.addEventListener('DOMContentLoaded', function() {
    showWarehouse();  // Обновляем отображение склада при загрузке страницы
});


// Функция для калькулятора
function calculateCost() {
    var packageType = document.getElementById('package').value;
    var warehouse = document.getElementById('warehouse').value; // Поле склада отправления
    var length = parseFloat(document.getElementById('length').value);
    var width = parseFloat(document.getElementById('width').value);
    var height = parseFloat(document.getElementById('height').value);
    var weight = parseFloat(document.getElementById('weight').value);

    // Проверка на заполнение всех обязательных полей
    if (!packageType || !length || !width || !height || !weight) {
        alert("Пожалуйста, заполните все параметры: категория груза, длина, ширина, высота, вес, склад отправления");
        return;
    }

    // Проверка выбора склада отправления
    if (!warehouse) {
        alert("Пожалуйста, выберите склад отправления.");
        return;
    }

    // Коэффициенты для категорий грузов
    var coefficients = {
        jewelry: 2.4,
        toys: 1.4,
        plastic_products: 1.7,
        furniture: 4.5,
        footwear: 2.7,
        clothes: 2.2,
        lighting_equipment: 1.8,
        machines_equipment: 1.5,
        fabrics: 1.7,
        household_goods_fabrics: 1.3,
        electronics: 4.3
    };

    // Проверка, если выбранный груз существует в коэффициентах
    if (!coefficients[packageType]) {
        alert("Расчет стоимости доступен для выбранных категорий груза.");
        return;
    }

    // Расчет объема груза (м³)
    var volume = ((length / 100) + (width / 100)  + (height / 100));

    // Стоимость груза с учетом коэффициента категории
    var cargoCost = volume * weight;

    // Коэффициент доставки = стоимость груза * вес
    var deliveryCoefficient = cargoCost * coefficients[packageType];

    // Стоимость доставки для разных типов транспорта (в рублях по текущему курсу)
    var autoCost = deliveryCoefficient * 2;    // Авто: 2$ за 1 кг
    var aviaCost = deliveryCoefficient * 6.7;  // Авиа: 6.7$ за 1 кг
    var railwayCost = deliveryCoefficient * 2.4; // ЖД: 2.4$ за 1 кг
    var expressCost = deliveryCoefficient * 10;  // Экспресс: 10$ за 1 кг

    // Сроки доставки
    var deliveryDays = {
        auto: "15 - 25",
        avia: "5 - 10",
        railway: "12 - 15",
        express: "4 - 7"
    };

    // Обновление UI с расчетными значениями
    document.getElementById('auto-cost').textContent = autoCost.toFixed(2) + '$ - ' + deliveryDays.auto + ' дн. минимальный объем должен быть от 10 кг';
    document.getElementById('avia-cost').textContent = aviaCost.toFixed(2) + '$ - ' + deliveryDays.avia + ' дн. минимальный объем должен быть от 10 кг';
    document.getElementById('railway-cost').textContent = railwayCost.toFixed(2) + '$ - ' + deliveryDays.railway + ' дн. минимальный объем должен быть от 30 кг';
    document.getElementById('express-cost').textContent = expressCost.toFixed(2) + '$ - ' + deliveryDays.express + ' дн. минимальный объем должен быть от 10 кг';

    // Активируем радиокнопки для выбора типа доставки
    var deliveryOptions = document.querySelectorAll('input[name="delivery"]');
    deliveryOptions.forEach(function(option) {
        option.disabled = false;
    });

    // Обновление изображений коробок в зависимости от веса
    var packageSizeElement = document.querySelector('.package_size .img_size');
    var packageSizeNameElement = document.querySelector('.package_size .name_size');
    var packageSizeTextElement = document.querySelector('.package_size .txt_package_size');

    if (weight <= 3) {
        packageSizeElement.src = "../../img/s_korob.png";
        packageSizeNameElement.textContent = "Короб S";
        packageSizeTextElement.textContent = "20x15x25 см, до 3 кг";
    } else if (weight <= 9) {
        packageSizeElement.src = "../../img/m_korob.png";
        packageSizeNameElement.textContent = "Короб M";
        packageSizeTextElement.textContent = "25x20x30 см, до 9 кг";
    } else if (weight <= 12) {
        packageSizeElement.src = "../../img/l_korob.png";
        packageSizeNameElement.textContent = "Короб L";
        packageSizeTextElement.textContent = "31x25x38 см, до 12 кг";
    } else if (weight <= 20) {
        packageSizeElement.src = "../../img/xl_korob.png";
        packageSizeNameElement.textContent = "Короб XL";
        packageSizeTextElement.textContent = "31x25x38 см, до 20 кг";
    } else {
        packageSizeElement.src = "../../img/xxl_korob.png";
        packageSizeNameElement.textContent = "Короб XXL";
        packageSizeTextElement.textContent = "40x35x50 см, свыше 20 кг";
    }
}

function highlightSelected(deliveryType) {
    var deliveryOptions = document.querySelectorAll('.result-item');
    deliveryOptions.forEach(function(item) {
        item.classList.remove('selected');
    });

    // Подсветка выбранного способа доставки
    document.getElementById(deliveryType).parentElement.classList.add('selected');
}

document.getElementById('calculate-button').addEventListener('click', calculateCost);


// Моадльные окна


document.addEventListener('DOMContentLoaded', (event) => {
    var modals = {
        header: document.getElementById("modal-header"),
        banner: document.getElementById("modal-content-purchase-lots"),
        calculate: document.getElementById("modal-calculate")
    };

    var spans = {
        header: document.getElementById("close-header"),
        banner: document.getElementById("close-content-purchase-lots"),
        calculate: document.getElementById("close-calculate")
    };

    var index_header_link_call = document.getElementById("avia_delivery_header_link_call");
    var index_banner_union_right = document.getElementById("avia_delivery_banner_link_call");
    var index_calculate = document.getElementById("calculate-button-order");

    index_header_link_call.onclick = function(event) {
        event.preventDefault();
        modals.header.style.display = "block";
    }

    index_banner_union_right.onclick = function(event) {
        event.preventDefault();
        modals.banner.style.display = "block";
    }

    index_calculate.onclick = function(event) {
        event.preventDefault();
        modals.calculate.style.display = "block";
    }

    spans.header.onclick = function() {
        modals.header.style.display = "none";
    }

    spans.banner.onclick = function() {
        modals.banner.style.display = "none";
    }

    spans.calculate.onclick = function() {
        modals.calculate.style.display = "none";
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
document.getElementById('auto_delivery_header_button').addEventListener('click', function() {
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
        body: JSON.stringify({ name, phone, email, source: 'Страница: Авиа доставка' }),  // Добавляем источник
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

// Для контента
document.getElementById('auto_delivery_banner_button').addEventListener('click', function() {
    const name = document.getElementById('name-content-purchase-lots').value;
    const phone = document.getElementById('phone-content-purchase-lots').value;
    const email = document.getElementById('email-content-purchase-lots').value;

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
        body: JSON.stringify({ name, phone, email, source: 'Страница: Авиа доставка' }),  // Добавляем источник
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Ошибка сети');
        }
        return response.text();
    })
    .then(data => {
        console.log(data);
        document.getElementById('form-content-purchase-lots').style.display = 'none'; // Скрываем форму
        document.getElementById('success-message-content-purchase-lots').style.display = 'block'; // Показываем сообщение об успешной отправке
        document.getElementById('close-success-message-content-purchase-lots').style.display = 'block'; // Показываем кнопку "Ок"
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });
});

// Обработчик для кнопки "Ок - Контент"
document.getElementById('close-success-message-content-purchase-lots').addEventListener('click', function() {
    document.getElementById('success-message-content-purchase-lots').style.display = 'none'; // Скрываем сообщение
    document.getElementById('close-success-message-content-purchase-lots').style.display = 'none'; // Скрываем кнопку "Ок"
    document.getElementById('modal-content-purchase-lots').style.display = 'none'; // Закрываем модальное окно

    // Сброс формы для повторного использования
    document.getElementById('name-content-purchase-lots').value = ''; // Очищаем поле "Имя"
    document.getElementById('phone-content-purchase-lots').value = ''; // Очищаем поле "Телефон"
    document.getElementById('email-content-purchase-lots').value = ''; // Очищаем поле "E-mail"
    
    // Возвращаем форму в исходное состояние
    document.getElementById('form-content-purchase-lots').style.display = 'block'; // Показываем форму заново
});

// Для калькулятора
document.getElementById('calculate_button').addEventListener('click', function() {
    // Собираем данные из формы калькулятора
    const name = document.getElementById('name-calculate').value;
    const phone = document.getElementById('phone-calculate').value;
    const email = document.getElementById('email-calculate').value;

    const packageCategory = document.getElementById('package').value; // Категория груза
    const warehouse = document.getElementById('warehouse').value;     // Склад отправления
    const length = document.getElementById('length').value;           // Длина
    const width = document.getElementById('width').value;             // Ширина
    const height = document.getElementById('height').value;           // Высота
    const weight = document.getElementById('weight').value;           // Вес
    const deliveryMethod = document.querySelector('input[name="delivery"]:checked').value; // Способ доставки

    // Проверка на обязательные поля
    if (!phone || !email) {
        alert('Пожалуйста, заполните обязательные поля (Телефон и E-mail)');
        return;
    }

    // Отправка данных на сервер через fetch
    fetch('/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name, phone, email, 
            packageCategory,   // Категория груза
            warehouse,         // Склад отправления
            dimensions: {
                length,
                width,
                height
            },
            weight,            // Вес
            deliveryMethod,    // Способ доставки
            source: 'Страница: Авиа доставка. Калькулятор расчета стоимости'
        }),
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        document.getElementById('form-calculate').style.display = 'none'; // Скрываем форму
        document.getElementById('success-message-calculate').style.display = 'block'; // Показываем сообщение об успешной отправке
        document.getElementById('close-success-message-calculate').style.display = 'block'; // Показываем кнопку "Ок"
    })
    .catch(error => {
        console.error('Ошибка:', error);
    });
});



// Обработчик для кнопки "Ок - Калькулятор"
document.getElementById('close-success-message-calculate').addEventListener('click', function() {
    document.getElementById('success-message-calculate').style.display = 'none'; // Скрываем сообщение
    document.getElementById('close-success-message-calculate').style.display = 'none'; // Скрываем кнопку "Ок"
    document.getElementById('modal-calculate').style.display = 'none'; // Закрываем модальное окно

    // Сброс формы для повторного использования
    document.getElementById('name-calculate').value = ''; // Очищаем поле "Имя"
    document.getElementById('phone-calculate').value = ''; // Очищаем поле "Телефон"
    document.getElementById('email-calculate').value = ''; // Очищаем поле "E-mail"
    
    // Возвращаем форму в исходное состояние
    document.getElementById('form-calculate').style.display = 'block'; // Показываем форму заново
});