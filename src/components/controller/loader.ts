import { CallbackFunction } from '../types/CallbackFunction';

interface LoaderOptions {
    apiKey: string;
}

interface RequestOptions {
    sources?: string;
}

interface RequestParams {
    endpoint: string;
    options?: RequestOptions;
}

interface ILoader {
    baseLink: string;
    options: LoaderOptions;
    getResp: <T extends object>(params: RequestParams, callback?: CallbackFunction<T>) => void;
    errorHandler: (res: Response) => Response;
    makeUrl: (options: RequestOptions, endpoint: string) => void;
    load: (method: string, endpoint: string, callback: (data: unknown) => void, options: RequestOptions) => void;
}

class Loader implements ILoader {
    baseLink: string;
    options: LoaderOptions;

    constructor(baseLink: string, options: LoaderOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp<T extends object>(
        { endpoint, options = {} }: RequestParams,
        callback: CallbackFunction<T> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response): never | Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: RequestOptions, endpoint: string): string {
        const urlOptions: Record<string, string> = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load<T extends object>(
        method: string,
        endpoint: string,
        callback: CallbackFunction<T>,
        options: RequestOptions = {}
    ) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
