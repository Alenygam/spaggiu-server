import fetch from 'node-fetch';

interface MandatoryHeaders {
    'Content-Type': string
    'Z-Dev-ApiKey': string,
    'User-Agent': string,
};

const necessaryHeaders : MandatoryHeaders = {
    'Content-Type': 'application/json',
    'Z-Dev-ApiKey': '+zorro+',
    'User-Agent': 'zorro/1.0'
};

const apiBaseURL = 'https://web.spaggiari.eu/rest/v1';

interface ExtraHeaders {
    [index: string]: string
}

interface FetchArguments {
    body?: string,
    extraHeaders?: ExtraHeaders,
}

class Api {
    private baseUrl : string = apiBaseURL;
    private necessaryHeaders : MandatoryHeaders = necessaryHeaders;
    constructor(baseUrl?: string) {
        if (baseUrl) this.baseUrl = baseUrl;
    }

    async fetch(path: string, method: string, fetchArguments: FetchArguments): Promise<any[]> {
        if (path.charAt(0) === "/") return [500, "La path deve iniziare con uno /"];
        const body = fetchArguments.body;
        const extraHeaders= fetchArguments.extraHeaders;

        try {
            const res = await fetch(`${this.baseUrl}${path}`, {
                method: method,
                body: body,
                headers: {
                    ...necessaryHeaders,
                    ...extraHeaders
                },
            });

            return [res.status, await res.json()];
        } catch (err: any) {
            return [500, {"message": err.message}];
        }
    }
};

export default Api;