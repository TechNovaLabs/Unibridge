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
    var modal = document.getElementById("modal");
    var span = document.getElementById("close");  // Изменено на ID

    var order_the_packing_header_link_call = document.getElementById("order_the_packing_header_link_call");
    var order_the_packing_banner_link_call = document.getElementById("order_the_packing_banner_link_call");
    

    order_the_packing_header_link_call.onclick = function(event) {
        event.preventDefault();
        modal.style.display = "block";
    }

    order_the_packing_banner_link_call.onclick = function(event) {
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