const packageJson = require('../package.json');

export default {
    // Выключаем отладочный режим приложения
    debug: false,

    // Порт приложения принимаем из переменной окружения
    // Heroku может подставить в неё любое удобное ему значение
    port: process.env.PORT,

    // Статичное содержимое забираем из Surge
    staticBasePath: `//${packageJson.name}.surge.sh/`
};
