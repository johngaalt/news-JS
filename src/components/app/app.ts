import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import News from '../view/news/news';
import Sources from '../view/sources/sources';

class App {
    controller: AppController;
    view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        const sourcesElement = document.querySelector('.sources');

        if (sourcesElement) {
            sourcesElement.addEventListener('click', (e: Event) =>
                this.controller.getNews(e, (data: News) => this.view.drawNews(data))
            );
            this.controller.getSources((data: Sources) => this.view.drawSources(data));
        }
    }
}

export default App;
