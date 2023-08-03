import { useState } from "react";
import {
  API_DELETE_OPTIONS,
  API_FAILURE,
  API_GET_OPTIONS,
  API_POST_OPTIONS,
  API_PUT_OPTIONS,
  ISLRTC_BASE_URL,
} from "../constants/index.d";

const useApi = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getData = (url, onSuccess, onFailure) => {
    setIsLoading(true);
    fetch(`${ISLRTC_BASE_URL}${url}`, API_GET_OPTIONS)
      .then((data) =>
        data
          .json()
          .then((response) => {
            if (response.status === API_FAILURE) {
              setError(response.data);
              setIsLoading(false);
              return;
            }
            onSuccess(response.data);
            setIsLoading(false);
          })
          .catch((errorValue) => {
            setError(errorValue);
            setIsLoading(false);
            onFailure?.(errorValue);
          })
      )
      .catch((errorValue) => {
        setError(errorValue);
        setIsLoading(false);
        onFailure?.(errorValue);
      });
  };

  const postData = (url, body, onSuccess, onFailure) => {
    setIsLoading(true);
    fetch(`${ISLRTC_BASE_URL}${url}`, API_POST_OPTIONS(body))
      .then((data) =>
        data
          .json()
          .then((response) => {
            if (response.status === API_FAILURE) {
              setError(response.data);
              setIsLoading(false);
              return;
            }
            onSuccess(response.data);
            setIsLoading(false);
          })
          .catch((errorValue) => {
            setError(errorValue);
            setIsLoading(false);
            onFailure?.(errorValue);
          })
      )
      .catch((errorValue) => {
        setError(errorValue);
        setIsLoading(false);
        onFailure?.(errorValue);
      });
  };

  const deleteData = (url, body, onSuccess, onFailure) => {
    setIsLoading(true);
    fetch(`${ISLRTC_BASE_URL}${url}`, API_DELETE_OPTIONS(body))
      .then((data) =>
        data
          .json()
          .then((response) => {
            if (response.status === API_FAILURE) {
              setError(response.data);
              setIsLoading(false);
              return;
            }
            onSuccess(response.data);
            setIsLoading(false);
          })
          .catch((errorValue) => {
            setError(errorValue);
            setIsLoading(false);
            onFailure?.(errorValue);
          })
      )
      .catch((errorValue) => {
        setError(errorValue);
        setIsLoading(false);
        onFailure?.(errorValue);
      });
  };

  const putData = (url, body, onSuccess, onFailure) => {
    setIsLoading(true);
    fetch(`${ISLRTC_BASE_URL}${url}`, API_PUT_OPTIONS(body))
      .then((data) =>
        data
          .json()
          .then((response) => {
            if (response.status === API_FAILURE) {
              setError(response.data);
              setIsLoading(false);
              return;
            }
            onSuccess(response.data);
            setIsLoading(false);
          })
          .catch((errorValue) => {
            setError(errorValue);
            setIsLoading(false);
            onFailure?.(errorValue);
          })
      )
      .catch((errorValue) => {
        setError(errorValue);
        setIsLoading(false);
        onFailure?.(errorValue);
      });
  };

  return { isLoading, error, deleteData, getData, postData, putData };
};

export default useApi;
