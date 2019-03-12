import Note from 'models/note';

export interface INoteData {
    name: string;
    text: string;
}

export interface IPageMeta {
    charset: string;
    description: string;
}

export interface IPageData {
    meta?: IPageMeta;
    notes?: Note[];
    note?: Note;
    title?: string;
    staticBasePath?: string;
}
