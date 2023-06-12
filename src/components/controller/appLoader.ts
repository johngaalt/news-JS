import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://rss-news-api.onrender.com/', {
            apiKey: 'da412dadd3024699bbd9f126281e9090', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
