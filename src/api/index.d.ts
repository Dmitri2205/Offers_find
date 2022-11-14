export const api: API;
declare class API {
    v1: string;
    v2: string;
    v3: string;
    v5: string;
    requestData: (method: any, url: any, params: any, funcName: any) => Promise<void | import("axios").AxiosResponse<any, any>>;
    getStoresInLocation(coords: any): Promise<void | import("axios").AxiosResponse<any, any>>;
    getItems(storeId: any): Promise<void | import("axios").AxiosResponse<any, any>>;
    getDiscountsCategories(): Promise<void | import("axios").AxiosResponse<any, any>>;
    getStoresAround(bounds: any): Promise<void | import("axios").AxiosResponse<any, any>>;
}
export {};
