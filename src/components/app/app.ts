import AppController from '../controller/controller';
import { NewsResponse } from '../types/NewsResponse';
import { SourceResponse } from '../types/SourceResponse';
import { AppView } from '../view/appView';

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
                this.controller.getNews(e, (data: NewsResponse) => this.view.drawNews(data))
            );
            this.controller.getSources((data: SourceResponse) => this.view.drawSources(data));
        }
    }
}

export default App;
