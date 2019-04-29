import Link from 'next/link';
import React from 'react';

import {INoteData} from 'types';

interface INotesProps {
    notes: INoteData[];
}

export default function Notes({notes}: INotesProps) {
    return (
        <ul>
            {notes.map(note => {
                const linkAs = `/notes/${note.name}`;
                const linkHref = {pathname: '/item', query: {name: note.name}};

                // Для реализации клиентского роутинга (без полной перезагрузки страницы) используем <Link />
                return (
                    <li key={note.name}>
                        <Link as={linkAs} href={linkHref}>
                            <a>{note.name}</a>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}
