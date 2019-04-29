import {Request, Response} from 'express';

import Note from 'models/note';

// Каждый контроллер (controller) обычно экспортирует
// несколько функций-действий (actions)

export function list(_req: Request, res: Response) {
    const notes = Note.findAll();

    res.json(notes);
}

export function item(req: Request, res: Response) {
    const {name} = req.params;

    const note = Note.find(name);

    if (note) {
        res.json(note);
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

    res.sendStatus(201);
}
