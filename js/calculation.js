function showWarehouse() {
    var packageSelect = document.getElementById('package');
    var warehouseContainer = document.getElementById('warehouse-container');
    if (packageSelect.value !== "") {
        warehouseContainer.style.display = 'flex';
    } else {
        warehouseContainer.style.display = 'none';
    }
}

function highlightSelected(deliveryType) {
    var resultItems = document.querySelectorAll('.result-item');
    resultItems.forEach(function (item) {
        item.classList.remove('selected');
    });
    document.getElementById(deliveryType).parentElement.classList.add('selected');
}

function calculateCost() {
    var packageType = document.getElementById('package').value;
    var warehouse = document.getElementById('warehouse').value;
    var length = parseFloat(document.getElementById('length').value);
    var width = parseFloat(document.getElementById('width').value);
    var height = parseFloat(document.getElementById('height').value);
    var weight = parseFloat(document.getElementById('weight').value);

    if (!length || !width || !height || !weight) {
        alert("Пожалуйста, заполните все параметры: длина, ширина, высота, вес.");
        return;
    }

    if ((packageType === 'toys' || packageType === 'electronics') && (warehouse === 'guangzhou' || warehouse === 'yiwu')) {
        var lengthCost = length * 0.5;
        var widthCost = width * 0.5;
        var heightCost = height * 0.5;
        var weightCost = (weight / 0.1) * 50;

        var totalCost = lengthCost + widthCost + heightCost + weightCost;

        // Увеличение стоимости для электроники
        if (packageType === 'electronics') {
            totalCost *= 1.2;
        }

        var baseDays = { express: 3, railway: 12, auto: 15, avia: 6 };
        var additionalDays = Math.ceil((weight - 5) / 5) * 3;

        var expressDays = baseDays.express + (weight > 5 ? additionalDays : 0);
        var railwayDays = baseDays.railway + (weight > 5 ? additionalDays : 0);
        var autoDays = baseDays.auto + (weight > 5 ? additionalDays : 0);
        var aviaDays = baseDays.avia + (weight > 5 ? additionalDays : 0);

        // Увеличение срока доставки для склада Иу
        if (warehouse === 'yiwu') {
            expressDays += 2;
            railwayDays += 2;
            autoDays += 2;
            aviaDays += 2;
        }

        document.getElementById('auto-cost').textContent = totalCost.toFixed(2) + 'р - ' + autoDays + ' дн.';
        document.getElementById('railway-cost').textContent = (totalCost * 1.2).toFixed(2) + 'р - ' + railwayDays + ' дн.';
        document.getElementById('avia-cost').textContent = (totalCost * 1.4).toFixed(2) + 'р - ' + aviaDays + ' дн.';
        document.getElementById('express-cost').textContent = (totalCost * 1.6).toFixed(2) + 'р - ' + expressDays + ' дн.';

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
        }
        else if (weight <= 20) {
            packageSizeElement.src = "../../img/xl_korob.png";
            packageSizeNameElement.textContent = "Короб XL";
            packageSizeTextElement.textContent = "31x25x38 см, до 20 кг";
        } 
        else {
            packageSizeElement.src = "../../img/xxl_korob.png";
            packageSizeNameElement.textContent = "Короб XXL";
            packageSizeTextElement.textContent = "40x35x50 см, свыше 12 кг";
        }
    } else {
        alert("Расчет стоимости доступен только для посылки: Игрушки и Электроника, и складов: Гуанчжоу и Иу.");
    }
}

document.getElementById('calculate-button').addEventListener('click', calculateCost);