var currentImage = 1;
                    var lastButtonPressed = false;
                
                    function changeImage(imageNumber) {
                        var imgElement = document.getElementById('banner');
                        imgElement.src = 'img/banner_' + imageNumber + '.png';
                        currentImage = imageNumber;
                        lastButtonPressed = true; // Фиксируем, что кнопка была нажата
                
                        toggleLinkBannerAboutUs(imageNumber);
                        updateButtonStyles(imageNumber);
                    }
                
                    function autoChangeImage() {
                        if (!lastButtonPressed) { // Если кнопка не была нажата
                            currentImage = (currentImage % 5) + 1; // Циклически меняем изображения от 1 до 5
                            var imgElement = document.getElementById('banner');
                            imgElement.src = 'img/banner_' + currentImage + '.png';
                
                            toggleLinkBannerAboutUs(currentImage);
                            updateButtonStyles(currentImage);
                        }
                        lastButtonPressed = false; // Сбрасываем флаг нажатия кнопки
                    }
                
                    function toggleLinkBannerAboutUs(imageNumber) {
                        var linkBannerElement = document.getElementById('link_banner_about_us');
                        if (imageNumber === 1) {
                            linkBannerElement.style.display = 'block';
                        } else {
                            linkBannerElement.style.display = 'none';
                        }
                    }
                
                    function updateButtonStyles(activeButtonNumber) {
                        for (let i = 1; i <= 5; i++) {
                            let button = document.getElementById('btn_switch_' + i);
                            if (i === activeButtonNumber) {
                                button.classList.remove('inactive-button');
                                button.classList.add('active-button');
                            } else {
                                button.classList.remove('active-button');
                                button.classList.add('inactive-button');
                            }
                        }
                    }
                
                    // Устанавливаем интервал для автоматической смены изображений каждые 5 секунд
                    setInterval(autoChangeImage, 5000);