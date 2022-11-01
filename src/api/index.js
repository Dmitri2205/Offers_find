import axios from "axios";


class API {
  constructor() {
    this.v1 = "https://5ka.ru/api/public/v1/";
    this.v2 = "https://5ka.ru/api/v2/";
    this.v3 = "https://5ka.ru/api/v3/"
  }

  requestData = (method, url, params, funcName ) => {
    const headers = { 
      "Accept": "*/*",
    };
    return axios({
      method,
      url,
      headers,
      params
    }).then((response)=>{
        return response;
    }).catch((error)=>{
      console.log(error?.message);
    });
  };


  getStoresInLocation(coords){
    const {center} = coords;
    let params = {lat:center[0],lon:center[1],radius:10000};
    return this.requestData("GET",  this.v3 + "stores/", params)
}

  getItems(storeId){
    const params = {records_per_page:1e2, page:1,store:storeId,ordering:'',price_promo_gte:"",price_promo_lte:'',categories:'',search:''};
    return this.requestData("get",this.v2 + "special_offers/",params);
  }
}

export const api = new API();