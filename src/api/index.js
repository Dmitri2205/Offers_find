import axios from "axios";


class API {
  constructor() {
    this.prefix = "https://media.5ka.ru/api/v2/";
  }

  requestData = (method, url, params, funcName ) => {
    const URI = this.prefix + url;
    const headers = { "Accept": "application/json",  "Content-type": "application/json" };
    return axios({
      method,
      URI,
      headers
    }).then((response)=>{
      console.log(response)
        return response;
    }).catch((error)=>{
      console.log(error?.message);
    });
  };


  getStores(bbox){
    const params = {bbox};
    return this.requestData("get","stores/", params);
  }

  getItems(){
    const params = {records_per_page:1e10, page:1,store:'35K3'}
    return this.requestData("get",``);
  }
}

export const api = new API();