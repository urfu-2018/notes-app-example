import {parse} from 'url';

import {Application} from 'express';

import {create, item, list} from 'controllers/notes';

export = (app: Application) => {
    // Создаем маршруты для отрисовки страниц
    app.get('/', (_req, res) => res.renderPage('/list'));
    app.get('/notes', (_req, res) => res.renderPage('/list'));
    // Передаем параметр name, для того чтобы обработать его в компоненте страницы
    app.get('/notes/:name', (req, res) => res.renderPage('/item', {name: req.params.name}));

    // Создаем дополнительные маршруты для AJAX-запросов, которые будут отвечать в JSON формате
    app.get('/api/notes/:name', item);

    // Можем объединить разные http методы с одинаковым маршрутом
    app
        .route('/api/notes')
        .get(list)
        .post(create);

    // Если роутер не выбрал подходящий для запроса маршрут – используется этот
    app.all('*', (req, res) => {
        // Для обработки запроса используем стандартный для Next.js обработчик
        const handleRequest = req.nextApp.getRequestHandler();
        const parsedUrl = parse(req.url, true);

        return handleRequest(req, res, parsedUrl);
    });
};
