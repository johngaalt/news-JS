import Utils from '../../utils';
import { SourceItem } from '../../types/SourceItem';
import './sources.css';

enum SelectorNames {
    ItemName = '.source__item-name',
    Item = '.source__item',
}
class Sources {
    draw(data: SourceItem[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        data.forEach((item) => {
            const sourceClone = sourceItemTemp?.content.cloneNode(true) as HTMLElement;
            if (sourceClone) {
                Utils.setTextContent(sourceClone, SelectorNames.ItemName, item.name);
                Utils.setAttribute(sourceClone, SelectorNames.Item, 'data-source-id', item.id);

                fragment.append(sourceClone);
            }
        });
        const sourceElement = document.querySelector('.sources');
        if (sourceElement !== null) {
            sourceElement.append(fragment);
        }
    }
}

export default Sources;
