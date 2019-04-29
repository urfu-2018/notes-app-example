// Переопределяем компонент App, чтобы импортировать общие для всех страниц стили
// _app.tsx - зарезервированный в Next.js файл
// Подробнее: https://github.com/zeit/next.js/#custom-app

import App, {Container, NextAppContext} from 'next/app';
import React from 'react';

import './app.css';

export default class MyApp extends App {
    static async getInitialProps({Component, ctx}: NextAppContext) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        return {pageProps};
    }

    render() {
        const {Component, pageProps} = this.props;

        return (
            <Container>
                <Component {...pageProps}/>
            </Container>
        );
    }
}
