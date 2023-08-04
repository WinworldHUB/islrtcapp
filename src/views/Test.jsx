import { useState } from "react";
import LoadingIcon from "../components/LoadingIcon";
import useApi from "../hooks/useApi";

const Test = () => {
  const [bulkData, setBulkData] = useState(null);
  const { getData, isLoading } = useApi();

  console.log(isLoading);

  if (!bulkData && isLoading === false) {
    getData("", setBulkData);
  }

  if (isLoading === true) {
    return <LoadingIcon />;
  }

  return <button onClick={() => setBulkData(null)}>Clear data</button>;
};

export default Test;
