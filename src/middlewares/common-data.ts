import config from 'config';
import {NextFunction as Next, Request, Response} from 'express';

import {IPageMeta} from 'types';

export default (_req: Request, res: Response, next: Next) => {
    const meta: IPageMeta = {
        charset: 'utf-8',
        description: 'Awesome notes'
    };

    // Хранение в res.locals – рекомендованный способ
    // Не перезаписываем, а дополняем объект
    res.locals.meta = meta;
    res.locals.title = 'Awesome notes';
    res.locals.staticBasePath = config.get('staticBasePath');

    next();
};
