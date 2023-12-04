import API, { HTTPHeaders, HTTPMethod, HTTPParams } from "./axios";

const apiHost = "";

class APIBuilder {
  private instance: API;

  constructor(method: HTTPMethod, url: string, data?: unknown) {
    this.instance = new API(method, url);
    this.instance.baseURL = apiHost;
    this.instance.data = data;
    this.instance.headers = {
      "Content-Type": "application/json; charset=utf-8",
      //   "x-lges-country": "KR",
      //   "x-lges-caller": "WEB",
      "X-Naver-Client-Id": "pfeeknw07ZEvDq9qncI5",
      "X-Naver-Client-Secret": "gezhKgHsQX",
    };
    this.instance.timeout = 5000;
    this.instance.withCredentials = false;
  }

  static get = (url: string) => new APIBuilder("GET", url);
  static put = (url: string, data: unknown) => new APIBuilder("PUT", url, data);
  static post = (url: string, data: unknown) =>
    new APIBuilder("POST", url, data);
  static delete = (url: string) => new APIBuilder("DELETE", url);

  baseURL(value: string): APIBuilder {
    this.instance.baseURL = value;
    return this;
  }

  headers(value: HTTPHeaders): APIBuilder {
    this.instance.headers = value;
    return this;
  }

  timeout(value: number): APIBuilder {
    this.instance.timeout = value;
    return this;
  }

  params(value: HTTPParams): APIBuilder {
    this.instance.params = value;
    return this;
  }

  data(value: unknown): APIBuilder {
    this.instance.data = value;
    return this;
  }

  withCredentials(value: boolean): APIBuilder {
    this.instance.withCredentials = value;
    return this;
  }

  build(): API {
    return this.instance;
  }
}

export default APIBuilder;
