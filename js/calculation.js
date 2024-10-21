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
