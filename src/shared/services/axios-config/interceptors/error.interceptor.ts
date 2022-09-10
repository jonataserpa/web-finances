/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { toast } from "react-toastify";

let isAlreadyFetchingAccessToken = false;
let subscribers: any[] = [];

function onAccessTokenFetched(accessToken: any): void {
  subscribers = subscribers.filter((callback) => callback(accessToken));
}

function addSubscriber(callback: any): void {
  subscribers.push(callback);
}

/**
 * Intercepts all responses to requests that return in error
 * @param error
 * @param dispatch
 * @returns
 */
export function errorInterceptor(error: any): Promise<any> {
  const {
    config,
    response: { status },
  } = error;
  const originalRequest = config;

  /**
   * If error 401, redirect the user to the login page
   */
  if (status === 401) {
    if (!isAlreadyFetchingAccessToken) {
      isAlreadyFetchingAccessToken = true;

      // refreshToken().then((idToken) => {
      //   isAlreadyFetchingAccessToken = false;
      //   onAccessTokenFetched(idToken);
      // });
    }

    return new Promise((resolve) => {
      addSubscriber((idToken: string) => {
        originalRequest.headers.Authorization = `Bearer ${idToken}`;
        resolve(axios(originalRequest));
      });
    });
  }

  if (status === 400) {
    if (
      error.response.data.message.includes("Refresh Token has expired") ||
      error.response.data.message.includes("Invalid Refresh Token") ||
      error.response.data.message.includes("Refresh Token has been revoked")
    ) {
      // store.dispatch(allActions.authActions.clearAuthenticationResult());
      // toast.error(translateText('error.unauthorized'), {
      //   toastId: 'error.unauthorized',
      // });
    }
  }

  // store.dispatch(allActions.loadingActions.setLoading(false));

  return Promise.reject(error);
}
