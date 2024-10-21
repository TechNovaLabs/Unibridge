const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();
const PORT = 3000;

// Парсер для данных формы
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Настройка для раздачи статических файлов (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '../')));

// Настройка маршрута для отправки формы
app.post('/send', (req, res) => {
    const { name, phone, email, packageCategory, warehouse, dimensions, weight, deliveryMethod, source } = req.body;

    // Проверяем, есть ли объект dimensions и деструктурируем его, если он существует
    let length, width, height;
    if (dimensions) {
        ({ length, width, height } = dimensions);
    }
    

    // Настройка Nodemailer
    const transporter = nodemailer.createTransport({
        host: 'smtp.yandex.ru',
        port: 587,
        secure: false,
        auth: {
            user: 'wladislawcozloff@yandex.ru',
            pass: 'geghmozjpbvegghd'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // Словари для перевода значений на русский
    const packageCategoryMap = {
        jewelry: 'Бижутерия',
        toys: 'Игрушки',
        plastic_products: 'Изделия из пластмассы',
        furniture: 'Мебель',
        footwear: 'Обувь',
        clothes: 'Одежда',
        lighting_equipment: 'Осветительное оборудование',
        machines_equipment: 'Станки / оборудование',
        fabrics: 'Ткани',
        household_goods_fabrics: 'Хоз. товары',
        electronics: 'Электроника'
    };

    const warehouseMap = {
        guangzhou: 'Гуанчжоу',
        yiwu: 'Иу',
        shenchen: 'Шэньчжэнь',
        pekin: 'Пекин'
    };

    const deliveryMethodMap = {
        express: 'Экспресс',
        railway: 'ЖД',
        auto: 'Авто',
        avia: 'Авиа'
    };

    // Переводим значения на русский язык
    const packageCategoryRus = packageCategoryMap[packageCategory] || packageCategory;
    const warehouseRus = warehouseMap[warehouse] || warehouse;
    const deliveryMethodRus = deliveryMethodMap[deliveryMethod] || deliveryMethod;

    // Настройка письма
    const mailOptions = {
        from: 'wladislawcozloff@yandex.ru',
        to: 'wladislawcozloff@yandex.ru',
        subject: 'UNIBRIDGE - Новая заявка',
        html: `
        <html>
            <head>
                <style>
                    body { font-family: Arial, sans-serif; color: #333; }
                    h1 { color: #007BFF; }
                    p { font-size: 16px; }
                </style>
            </head>
            <body>
                <h1>Новая заявка</h1>
                <p>Имя клиента: <strong>${name}</strong></p>
                <p>Телефон клиента: <strong>${phone}</strong></p>
                <p>Email: <strong>${email}</strong></p>
                ${packageCategory ? `<p>Категория груза: <strong>${packageCategoryRus}</strong></p>` : ''}
                ${warehouse ? `<p>Склад отправления: <strong>${warehouseRus}</strong></p>` : ''}
                ${dimensions ? `<p>Размеры (ДxШxВ): <strong>${length} x ${width} x ${height} см</strong></p>` : ''}
                ${weight ? `<p>Вес: <strong>${weight} кг</strong></p>` : ''}
                ${deliveryMethod ? `<p>Способ доставки: <strong>${deliveryMethodRus}</strong></p>` : ''}
                <p>Источник: <strong>${source}</strong></p>
            </body>
        </html>
        `
    };

    // Отправка письма
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Ошибка отправки:', error);
            return res.status(500).send('Ошибка при отправке сообщения');
        }
        console.log('Email отправлен:', info.response);
        res.status(200).send('Заявка успешно отправлена');
    });
});
// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
