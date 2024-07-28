document.addEventListener("DOMContentLoaded", function() {
    const newsBlocks = Array.from(document.querySelectorAll(".block_news"));
    const btnRight = document.getElementById("btn_news_right");
    const btnLeft = document.getElementById("btn_news_left");

    let currentIndex = 0;
    const totalNews = newsBlocks.length;

    function updateNews() {
        newsBlocks.forEach((block, index) => {
            // Показать только три новости: текущую и две следующие
            if (index === (currentIndex) % totalNews ||
                index === (currentIndex + 1) % totalNews ||
                index === (currentIndex + 2) % totalNews) {
                block.style.display = "flex";
            } else {
                block.style.display = "none";
            }
        });
    }

    function goRight() {
        currentIndex = (currentIndex + 1) % totalNews;
        updateNews();
    }

    function goLeft() {
        currentIndex = (currentIndex - 1 + totalNews) % totalNews;
        updateNews();
    }

    btnRight.addEventListener("click", goRight);
    btnLeft.addEventListener("click", goLeft);

    // Инициализация отображения новостей
    updateNews();
});