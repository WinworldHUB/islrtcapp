import { useState } from "react";

const useBulkUpload = () => {
  const [totalRecords, setTotalRecords] = useState(-1);

  const uploadData = (bulkUploadData) => {
    // API stuff to upload the file
    setTotalRecords(10);
  };

  return { totalRecords, uploadData };
};

export default useBulkUpload;
