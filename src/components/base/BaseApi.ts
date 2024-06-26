export type ApiListResponse<Type> = {
    total: number,
    items: Type[]
};

export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';

export class Api {
    readonly baseUrl: string;
    protected options: RequestInit;

    constructor(baseUrl: string, options: RequestInit = {}) {
        this.baseUrl = baseUrl;
        this.options = {
            headers: {
                'Content-Type': 'application/json',
                ...(options.headers as object ?? {})
            }
        };
    }

    protected handleResponse(response: Response): Promise<object> {
        if (response.ok) return response.json();
        else return response.json()
            .then(data => Promise.reject(data.error ?? response.statusText));
    }

    _request(url: string, options: RequestInit = {}) {
        return fetch(this.baseUrl + url, options).then(this.handleResponse)
    }

    get(uri: string) {
        this.options = {
            ...this.options,
            method: 'GET'
        }
        return this._request(uri, this.options)
    }

    post(uri: string, data: object) {
        this.options = {
            ...this.options,
            method: 'POST',
            body: JSON.stringify(data)
        }
        return this._request(uri, this.options)
    }
}
