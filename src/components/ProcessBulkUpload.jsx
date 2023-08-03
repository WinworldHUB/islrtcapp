import { useEffect, useRef, useState } from "react";
import { hideDialog, showDialog } from "../utils";
import useBulkUpload from "../hooks/useBulkUpload";

const ProcessBulkUpload = (props) => {
  const [bulkUploadDialog, setBulkUploadDialog] = useState(null);
  const { currentIndex, isCompleted, message, totalRecords, uploadData } =
    useBulkUpload();
  const log = useRef([]);

  useEffect(() => {
    if (message) log.current.unshift(message);
  }, [message]);

  useEffect(() => {
    if (props.isShow) {
      showDialog("dlgProcessBulkUpload", setBulkUploadDialog);
    } else {
      hideDialog(bulkUploadDialog);
    }
  }, [props.isShow]);

  useEffect(() => {
    uploadData(props.data);
  }, [props.data]);

  useEffect(() => {
    if (isCompleted === true) {
      console.log("Completed called");
      hideDialog(bulkUploadDialog);
      props.onCompleted?.();
    }
  }, [isCompleted]);

  return (
    <div
      className="modal fade"
      id="dlgProcessBulkUpload"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              Processing {currentIndex} of {totalRecords}
            </h1>
            <div
              className="progress"
              role="progressbar"
              aria-label="Animated Success striped example"
              aria-valuenow="25"
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: "200px" }}
            >
              <div
                className="progress-bar progress-bar-striped bg-success"
                style={{
                  width: `${
                    (currentIndex * 100) /
                    (totalRecords > -1 ? totalRecords : 1)
                  }%`,
                }}
              ></div>
            </div>
          </div>
          <div className="modal-body">
            <div className="w-100">
              {log.current.map((entry) => (
                <p>{entry}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessBulkUpload;
