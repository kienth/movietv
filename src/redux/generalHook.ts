// NOTE: This general hook handles all the notification of every API results from the Back-end

// The message and status that will used in notification must be from the API together with the return data

import Swal from "sweetalert2";
import { useEffect, useState } from "react";

import { useActionMutation, useFetchQuery } from "./generalAPI";

interface IUseGeneral {
  testing?: {
    status: "success" | "error";
    return?: any;
  };
  url?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  disableFetch?: boolean;
  hideAlert?: boolean;
  isExternal?: boolean;
}

export const useGeneral = (props: IUseGeneral) => {
  const [loadingReturn, setLoadingReturn] = useState(false);
  const {
    data: fetchData,
    isError: fetchIsError,
    isFetching: fetchIsLoading,
    isSuccess: fetchIsSuccess,
  } = useFetchQuery(
    { url: props.url, method: props.method, body: props.body },
    {
      skip:
        props.disableFetch ||
        props.testing !== undefined ||
        props.url === undefined,
    }
  );

  const [
    generalAction,
    {
      data: actionData,
      isError: actionIsError,
      isLoading: actionIsLoading,
      isSuccess: actionIsSuccess,
      error: actionError,
    },
  ] = useActionMutation({});

  useEffect(() => {
    if (!props.hideAlert) {
      if (actionIsSuccess) {
        if (props.testing) {
          Swal.fire(
            `Testing ${props.testing?.status}`,
            props.testing?.status === "success"
              ? "Testing successfully saved!"
              : "Something went wrong!",
            props.testing?.status
          );
        } else {
          Swal.fire(
            `${actionData.status || "Success"}!`,
            actionData.message || "Data successfully saved!",
            "success"
          );
        }
      } else if (actionIsError) {
        if (props.testing) {
          Swal.fire(
            `Testing ${props.testing?.status}`,
            props.testing?.status === "success"
              ? "Testing successfully saved!"
              : "Something went wrong!",
            props.testing?.status
          );
        } else {
          // ErrorHandling(actionError); // need to finalize this to back-end return error data
          Swal.fire(`Warning!`, "Something went wrong!", "error");
        }
      } else if (actionIsLoading) {
        Swal.fire(
          "Process Ongoing...",
          "Process is ongoing. Will notify you once process is successfully finish",
          "info"
        );
      }
    }
  }, [
    actionData,
    actionIsError,
    actionIsLoading,
    actionIsSuccess,
    actionError,
    props.hideAlert,
  ]);

  useEffect(() => {
    setLoadingReturn(true);
    setTimeout(() => {
      setLoadingReturn(false);
    }, 1500);
  }, [fetchIsLoading, fetchIsSuccess, fetchIsError]);

  return {
    data:
      props.testing && !props.disableFetch ? props.testing?.return : fetchData,
    isLoading:
      loadingReturn && props.testing && !props.disableFetch
        ? true
        : fetchIsLoading,
    isSuccess:
      !loadingReturn && props.testing && !props.disableFetch
        ? props.testing.status === "success"
          ? true
          : false
        : fetchIsSuccess,
    isError:
      !loadingReturn && props.testing && !props.disableFetch
        ? props.testing.status === "error"
          ? true
          : false
        : fetchIsError,
    generalAction,
    actionData,
    actionIsSuccess,
    actionIsError,
    actionIsLoading,
  };
};
