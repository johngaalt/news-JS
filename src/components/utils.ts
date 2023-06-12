class Utils {
    static setTextContent(parent: HTMLElement, selector: string, value: string): void {
        const element: HTMLElement | null = parent.querySelector(selector);

        if (element) {
            element.textContent = value;
        }
    }

    static setBackgroundImage(parent: HTMLElement, selector: string, value: string): void {
        const element: HTMLElement | null = parent.querySelector(selector);

        if (element) {
            element.style.backgroundImage = value;
        }
    }

    static setAttribute(parent: HTMLElement, selector: string, attr: string, value: string): void {
        const element: HTMLElement | null = parent.querySelector(selector);
        if (element) {
            element.setAttribute(attr, value);
        }
    }
}
export default Utils;
