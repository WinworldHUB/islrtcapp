import { useEffect, useState } from "react";
import Loading from "../components/Loading";

const useLoading = (isLoading, title, message) => {
  return {
    OverviewLoading: (
      <Loading isShow={isLoading} title={title} message={message} />
    ),
  };
};

export default useLoading;
