import { NewsItem } from '../../types/NewsItem';
import Utils from '../../utils';
import './news.scss';

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
    draw(data: NewsItem[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp');

        news.forEach((item, idx) => {
            if (newsItemTemp && newsItemTemp instanceof HTMLTemplateElement) {
                const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;

                if (idx % 2) newsClone.querySelector(NewsChildElements.Item)?.classList.add('alt');

                Utils.setBackgroundImage(
                    newsClone,
                    NewsChildElements.Photo,
                    `url(${item.urlToImage || 'img/news_placeholder.jpg'})`
                );

                Utils.setTextContent(newsClone, NewsChildElements.Author, item.author || item.source.name);
                Utils.setTextContent(
                    newsClone,
                    NewsChildElements.Date,
                    item.publishedAt.slice(0, 10).split('-').reverse().join('-')
                );
                Utils.setTextContent(newsClone, NewsChildElements.Title, item.title);
                Utils.setTextContent(newsClone, NewsChildElements.Source, item.source.name);
                Utils.setTextContent(newsClone, NewsChildElements.Content, item.description);
                Utils.setAttribute(newsClone, NewsChildElements.ReadMore, 'href', item.url);

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
