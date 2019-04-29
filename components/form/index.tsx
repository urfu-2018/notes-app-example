import React, {ChangeEvent, Component} from 'react';

import {INoteData} from 'types';

import './index.css';

interface IFromProps {
    onSumbit(note: INoteData): void;
}

export default class Form extends Component<IFromProps, INoteData> {
    // В состоянии храним текущие значения полей ввода
    state: INoteData = {
        name: '',
        text: ''
    };

    // Для обработки изменения каждого из полей создаем свой обработчик
    // Используем стрелочные функции, чтобы избежать надобности явно привязывать контекст при передаче
    // обработчика в качестве аргумента
    handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({name: event.target.value});
    }

    handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({text: event.target.value});
    }

    handleSubmit = () => {
        this.props.onSumbit(this.state);

        // После отправки формы очищаем её
        this.setState({name: '', text: ''});
    }

    render() {
        const {name, text} = this.state;

        // Кнопка должна быть активна только тогда, когда оба поля заполненны
        const isButtonDisabled = !name || !text;

        return (
            <div className="form">
                <input placeholder="Заголовок" value={name} onChange={this.handleNameChange}/>
                <textarea placeholder="Текст" value={text} onChange={this.handleTextChange}/>
                <button disabled={isButtonDisabled} type="submit" onClick={this.handleSubmit}>
                    Добавить новую
                </button>
            </div>
        );
    }
}
