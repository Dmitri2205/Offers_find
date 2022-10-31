import axios from "axios";


class API {
  constructor() {
    this.v2 = "https://5ka.ru/api/v2/";
    this.v1 = "https://5ka.ru/api/public/v1/";
    this.v3 = "https://5ka.ru/api/v3/"
  }

  requestData = (method, url, params, funcName ) => {
    const headers = { 
      "Accept": "*/*",
      "Accept-Encoding": "gzip, deflate, br",
      "Connection": "keep-alive"
    };
    return axios({
      method,
      url,
      headers,
      params
    }).then((response)=>{
      console.log(response)
        return response;
    }).catch((error)=>{
      console.log(error?.message);
    });
  };


  getStoresInLocation(coords){

    const {center} = coords;
    let params = {lat:center[0],lon:center[1],radius:1000};

    return this.requestData("GET",  this.v3 + "stores/", params)
}

  getItems(){
    const params = {records_per_page:1e10, page:1,store:'35K3'}
    return this.requestData("get",``);
  }
}

export const api = new API();