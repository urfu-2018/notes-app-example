import {Application} from 'express';

import {error404} from 'controllers/errors';
import {create, item, list} from 'controllers/notes';

export = (app: Application) => {
    app.get('/', list);

    // Можем объединить разные http методы с одинаковым маршрутом
    app
        .route('/notes')
        .get(list)
        .post(create);

    app.get('/notes/:name', item);

    // Если роутер не выбрал подходящий для запроса маршрут – используется этот
    app.all('*', error404);
};
