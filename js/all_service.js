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

// Модальные окна

document.addEventListener("DOMContentLoaded", function () {
    // Получить модальное окно
    var modal = document.getElementById("modal");

    // Получить кнопки по их id
    var all_service_header_link_call = document.getElementById("all_service_header_link_call");
    var taobaoButton = document.getElementById("taobao");
    var button1688 = document.getElementById("button1688");
    var fabrikButton = document.getElementById("fabrik_all_service");
    var searchButton = document.getElementById("search_all_service");
    var payButton = document.getElementById("pay_all_service");
    var auditButton = document.getElementById("audit_all_service");

    var factoryInspection = document.getElementById("factory_inspection");
    var chekInspection = document.getElementById("chek_inspection");
    var consultationDeliveryAllService = document.getElementById("consultation_delivery_all_service");
    var refundNds = document.getElementById("refund_nds");
    var costCalculationAllService = document.getElementById("cost_calculation_all_service");


    // Получить элемент <span>, который закрывает модальное окно
    var span = document.getElementsByClassName("close")[0];

    // Функция для открытия модального окна
    function openModal() {
        modal.style.display = "block";
    }

    // При нажатии на кнопки открыть модальное окно

    all_service_header_link_call.onclick = openModal;

    taobaoButton.onclick = openModal;
    button1688.onclick = openModal;
    fabrikButton.onclick = openModal;
    searchButton.onclick = openModal;
    payButton.onclick = openModal;
    auditButton.onclick = openModal;

    factoryInspection.onclick = openModal;
    chekInspection.onclick = openModal;
    consultationDeliveryAllService.onclick = openModal;
    refundNds.onclick = openModal;
    costCalculationAllService.onclick = openModal;

    // Когда пользователь нажимает на <span> (x), закрыть модальное окно
    span.onclick = function () {
        modal.style.display = "none";
    }

    // Когда пользователь нажимает в любом месте вне модального окна, закрыть его
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});