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