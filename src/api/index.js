import axios from "axios";


class API {
  constructor() {
    this.v1 = "https://5ka.ru/api/public/v1/";
    this.v2 = "https://5ka.ru/api/v2/";
    this.v3 = "https://5ka.ru/api/v3/"
    this.v5 = "https://5ka.ru/api/v5/"
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
    const {center:{latitude,longitude}} = coords;
    let params = {lat:latitude,lon:longitude,radius:10000};
    return this.requestData("GET",  this.v3 + "stores/", params)
}

  getItems(storeId){
    const params = {records_per_page:1e2, page:1,store:storeId,ordering:'',price_promo_gte:"",price_promo_lte:'',categories:'',search:''};
    return this.requestData("get",this.v2 + "special_offers/",params);
  }

  getDiscountsCategories(){
    const params = {include_type:'compilation'};
    return this.requestData("GET",this.v5 + "categories/",params);
  }
}

export const api = new API();