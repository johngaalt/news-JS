import './sources.css';

interface SourceData {
    id: number;
    name: string;
}
class Sources {
    draw(data: SourceData[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector<HTMLTemplateElement>('#sourceItemTemp');

        data.forEach((item) => {
            const sourceClone = sourceItemTemp?.content.cloneNode(true);

            sourceClone.querySelector('.source__item-name').textContent = item.name;
            sourceClone.querySelector('.source__item').setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });
        const sourceElement = document.querySelector('.sources');
        if (sourceElement !== null) {
            sourceElement.append(fragment);
        }
    }
}

export default Sources;
