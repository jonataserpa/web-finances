import { AxiosRequestConfig } from "axios";

/**
 * Intercept all request submissions to add bearer token
 * @param request
 * @returns
 */
export function authInterceptor(
  request: AxiosRequestConfig
): AxiosRequestConfig {
  // const { authenticationResult } = store.getState().auth;
  // if (!authenticationResult) {
  //   return request;
  // }

  // request.headers.Authorization = `Bearer ${authenticationResult.idToken}`;
  return request;
}

export function loadingBefore(request: AxiosRequestConfig): AxiosRequestConfig {
  // store.dispatch(allActions.loadingActions.setLoading(true));
  return request;
}

export function loadingAfter(response: AxiosRequestConfig): AxiosRequestConfig {
  // store.dispatch(allActions.loadingActions.setLoading(false));
  return response;
}
