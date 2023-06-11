import AppLoader from './appLoader';

class AppController extends AppLoader {
    getSources(callback: (...args: any[]) => void): void {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    // TODO: fix any type
    getNews(e: Event, callback: (...args: any[]) => void): void {
        let target = e.target;
        const newsContainer = e.currentTarget;

        while (target !== newsContainer) {
            if (target && newsContainer && target instanceof Element && newsContainer instanceof Element) {
                if (target.classList.contains('source__item')) {
                    const sourceId = target.getAttribute('data-source-id');
                    const newsSource = newsContainer.getAttribute('data-source');
                    if (sourceId && newsSource !== sourceId) {
                        newsContainer.setAttribute('data-source', sourceId);
                        super.getResp(
                            {
                                endpoint: 'everything',
                                options: {
                                    sources: sourceId,
                                },
                            },
                            callback
                        );
                    }
                    return;
                }
                target = target.parentNode;
            }
        }
    }
}

export default AppController;
