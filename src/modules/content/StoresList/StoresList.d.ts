export declare type storesList = {
    storesReducer: any;
    address: string;
    name: string;
    city_name: string;
    sap_code: string;
    work_end_time: string;
    work_start_time: string;
    state: string;
    store_sublease: Array<subleaseProps>;
};
declare type subleaseProps = {
    type_icon: string;
    type_name: string;
};
declare const StoresList: () => JSX.Element;
export default StoresList;
