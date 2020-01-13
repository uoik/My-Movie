export interface IResponseError {
    error: string;
    data: null;
}

export interface IResponseData<T> {
    error: null;
    data: T;
}

export interface IResponsePageData<T> {
    total: number;
    data: T[];
    error: null;
}

export interface ICondition {
    page?: number;
    limit?: number;
    key?: string;
}