document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(function(dropdown) {
        const dropdownButton = dropdown.querySelector('.plug');
        const dropdownIcon = dropdownButton.querySelector('.img_plug');

        dropdownButton.addEventListener('click', function(event) {
            event.preventDefault(); // Предотвратить стандартное действие ссылки
            dropdown.classList.toggle('show');
            dropdownIcon.classList.toggle('rotate-180'); // Поворот иконки
        });

        // Закрыть выпадающий список, если кликнули вне его
        document.addEventListener('click', function(event) {
            if (!dropdown.contains(event.target) && !dropdownButton.contains(event.target)) {
                dropdown.classList.remove('show');
                dropdownIcon.classList.remove('rotate-180'); // Вернуть иконку в исходное состояние
            }
        });
    });
});