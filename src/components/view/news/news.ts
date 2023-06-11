import { NewsItem } from '../../types/NewsItem';
import './news.css';

enum NewsChildElements {
    Item = '.news__item',
    Photo = '.news__meta-photo',
    Author = '.news__meta-author',
    Date = '.news__meta-date',
    Title = '.news__description-title',
    Source = '.news__description-source',
    Content = '.news__description-content',
    ReadMore = '.news__read-more a',
}

class News {
    public setTextContent(parent: HTMLElement, selector: string, value: string): void {
        const element: HTMLElement | null = parent.querySelector(selector);

        if (element) {
            element.textContent = value;
        }
    }

    setBackgroundImage(parent: HTMLElement, selector: string, value: string): void {
        const element: HTMLElement | null = parent.querySelector(selector);

        if (element) {
            element.style.backgroundImage = value;
        }
    }

    public setAttribute(parent: HTMLElement, selector: string, value: string): void {
        const element: HTMLElement | null = parent.querySelector(selector);
        if (element) {
            element.setAttribute('href', value);
        }
    }

    draw(data: NewsItem[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp');

        news.forEach((item, idx) => {
            if (newsItemTemp && newsItemTemp instanceof HTMLTemplateElement) {
                const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;

                if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

                this.setBackgroundImage(
                    newsClone,
                    NewsChildElements.Photo,
                    `url(${item.urlToImage || 'img/news_placeholder.jpg'})`
                );

                this.setTextContent(newsClone, NewsChildElements.Author, item.author || item.source.name);
                this.setTextContent(
                    newsClone,
                    NewsChildElements.Date,
                    item.publishedAt.slice(0, 10).split('-').reverse().join('-')
                );
                this.setTextContent(newsClone, NewsChildElements.Title, item.title);
                this.setTextContent(newsClone, NewsChildElements.Source, item.source.name);
                this.setTextContent(newsClone, NewsChildElements.Content, item.description);
                this.setAttribute(newsClone, NewsChildElements.ReadMore, item.url);

                fragment.append(newsClone);
            }
        });
        const newsElement = document.querySelector('.news');
        if (newsElement !== null) {
            newsElement.innerHTML = '';
            newsElement.appendChild(fragment);
        }
    }
}

export default News;
