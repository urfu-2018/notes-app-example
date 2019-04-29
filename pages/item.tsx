import Link from 'next/link';
import React, {Component, Fragment} from 'react';

import {INoteData} from 'types';

interface IItemPageProps {
  name: string;
}

interface IItemPageState {
  note?: INoteData;
}

export default class ItemPage extends Component<IItemPageProps, IItemPageState> {
    static getInitialProps({req, query}: any) {
        const name = req ?
            req.params.name :
            query.name;

        return {name};
    }

  state: IItemPageState = {
      note: undefined
  };

  componentDidMount() {
      // После того как страница будет отрисована, делаем запрос за заметкой по ее имени
      fetch(`/api/notes/${this.props.name}`)
          .then(response => response.json())
          .then(note => this.setState({note}));
  }

  render() {
      const {note} = this.state;

      // Если данные еще не получены, сообщаем об этом пользователю
      if (!note) {
          return <p>Loading...</p>;
      }

      return (
          <Fragment>
              <Link as="/notes" href="/list"><a>Назад</a></Link>
              <p>{note.text}</p>
          </Fragment>
      );
  }
}
