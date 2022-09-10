// import axios from "axios";

// import { responseInterceptor, errorInterceptor } from "./interceptors";
// import { Environment } from "../../environment";

// const Api = axios.create({
//   baseURL: Environment.URL_BASE,
// });

// Api.interceptors.response.use(
//   (response) => responseInterceptor(response),
//   (error) => errorInterceptor(error)
// );

// export { Api };
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { Environment } from "../../environment";
import {
  authInterceptor,
  loadingAfter,
  loadingBefore,
} from "./interceptors/auth.interceptor";
import { errorInterceptor } from "./interceptors/error.interceptor";

class AxiosService {
  axiosInstance: AxiosInstance;

  multiPartFormDataConfig: AxiosRequestConfig = {
    baseURL: Environment.URL_BASE,
    headers: {
      "content-type": "multipart/form-data",
    },
  };

  constructor() {
    const axiosConfig: AxiosRequestConfig = {
      baseURL: Environment.URL_BASE,
    };

    this.axiosInstance = axios.create(axiosConfig);
    this.axiosInstance.interceptors.request.use(loadingBefore);
    this.axiosInstance.interceptors.response.use(loadingAfter);
  }

  /**
   * Use auth interceptor
   */
  addAuthInterceptor(): void {
    this.axiosInstance.interceptors.request.use(authInterceptor);
  }

  /**
   * Use error interceptor
   * @param dispatch
   */
  addErrorInterceptor(): void {
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => errorInterceptor(error)
    );
  }

  /**
   * Apply the use of all interceptors in the application
   * @param dispatch
   */
  useInterceptors(): void {
    this.addAuthInterceptor();
    this.addErrorInterceptor();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async get(url: string, params?: any): Promise<any> {
    return this.axiosInstance.get(url, params);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async post(url: string, params?: any): Promise<any> {
    return this.axiosInstance.post(url, params);
  }

  async postT<Body, Result>(
    url: string,
    params?: Body,
    customConfig?: AxiosRequestConfig
  ): Promise<Result> {
    const response = await this.axiosInstance.post(url, params, customConfig);
    return response.data;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async put(url: string, params: any): Promise<any> {
    return this.axiosInstance.put(url, params);
  }

  async putT<Body, Result>(url: string, params: Body): Promise<Result> {
    const response = await this.axiosInstance.put(url, params);
    return response.data;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async delete(url: string, params: any): Promise<any> {
    return this.axiosInstance.delete(url, params);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async patch(url: string, params: any): Promise<any> {
    return this.axiosInstance.patch(url, params);
  }

  /**
   * uploads a single file.
   * @param {string} url - api url
   * @param {FormData | any} data - data to send.
   * @param {AxiosRequestConfig} customConfig - optional axios request configurations
   * @returns {Promise<AxiosResponse<any>>} - response data.
   */
  async uploadFile(
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: FormData | any,
    customConfig?: AxiosRequestConfig
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<AxiosResponse<any>> {
    const customAxiosRequestConfig =
      customConfig || this.multiPartFormDataConfig;
    return this.axiosInstance.post(url, data, customAxiosRequestConfig);
  }
}

const ApiService: AxiosService = new AxiosService();

export { ApiService };
