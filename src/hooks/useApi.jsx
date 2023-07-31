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

  const getData = (url, onSuccess) => {
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
          })
      )
      .catch((errorValue) => {
        setError(errorValue);
        setIsLoading(false);
      });
  };

  const postData = (url, body, onSuccess) => {
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
          })
      )
      .catch((errorValue) => {
        setError(errorValue);
        setIsLoading(false);
      });
  };

  const deleteData = (url, body, onSuccess) => {
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
          })
      )
      .catch((errorValue) => {
        setError(errorValue);
        setIsLoading(false);
      });
  };

  const putData = (url, body, onSuccess) => {
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
          })
      )
      .catch((errorValue) => {
        setError(errorValue);
        setIsLoading(false);
      });
  };

  return { isLoading, error, deleteData, getData, postData, putData };
};

export default useApi;
