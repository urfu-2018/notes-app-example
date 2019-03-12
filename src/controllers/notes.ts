import {Request, Response} from 'express';

import Note from 'models/note';
import {IPageData} from 'types';

// Каждый контроллер (controller) обычно экспортирует
// несколько функций-действий (actions)

export function list(_req: Request, res: Response) {
    const notes = Note.findAll();
    const {meta, staticBasePath, title} = res.locals;

    // Объединяем данные специфичные для контроллера с общими данными
    const data: IPageData = {
        meta,
        notes,
        staticBasePath,
        title
    };

    res.render('index', data);
}

export function item(req: Request, res: Response) {
    const {meta, staticBasePath, title} = res.locals;
    const {name} = req.params;

    const note = Note.find(name);

    const data: IPageData = {
        meta,
        note,
        staticBasePath,
        title
    };

    if (note) {
        res.render('note', data);
    } else {
        // Код «404 Not Found» отправляют в ответ на отсутствующий http-ресурс,
        // в нашем случае отсутствующую заметку
        res.sendStatus(404);
    }
}

export function create(req: Request, res: Response) {
    // Благодаря body-parser мидлваре у нас в поле `body`
    // разобранное тело POST запроса
    const {name, text} = req.body;

    const note = new Note({name, text});

    note.save();

    // Редирект с кодом «302 Moved Temporarily»
    // не позволяет отправлять форму дважды
    res.redirect(302, '/notes');
}
