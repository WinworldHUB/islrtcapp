import { useEffect, useState } from "react";
import Loading from "../components/Loading";

const useLoading = (isLoading, title, message) => {
  return {
    OverviewLoading: isLoading ? (
      <Loading isShow={isLoading} title={title} message={message} />
    ) : null,
  };
};

export default useLoading;
