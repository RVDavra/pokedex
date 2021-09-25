export interface PokeApiResponseData {
    name: string;
    url: string;
}

export interface PokeApiResponse {
    count: number;
    next?: string;
    previous?: any;
    results: PokeApiResponseData[];
}
