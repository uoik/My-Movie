export interface ISearchResult<T> {
    total: number;
    datas: T[];
    error: string[];
}
