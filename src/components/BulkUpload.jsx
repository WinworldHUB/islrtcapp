import React, { useEffect, useState } from "react";
import { hideDialog, showDialog } from "../utils";
import useBulkUpload from "../hooks/useBulkUpload";

const BulkUpload = (props) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [data, setData] = useState(null);
  const [bulkUploadDialog, setBulkUploadDialog] = useState(null);
  const { totalRecords, uploadData } = useBulkUpload();
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (props.isShow) {
      showDialog("dlgBulkUpload", setBulkUploadDialog);
    } else {
      hideDialog(bulkUploadDialog);
    }
  }, [props.isShow]);

  useEffect(() => {
    if (totalRecords > -1) {
      setSelectedFile(null);
    }
  }, [totalRecords]);

  useEffect(() => {
    if (selectedFile) {
      uploadData(selectedFile);
    }
  }, [selectedFile]);

  useEffect(() => {
    if (props.data) setData(props.data);
  }, [props.data]);

  const clearForm = () => {
    setData(null);
    setErrorMsg(null);
  };

  const onCancelled = () => {
    clearForm();
    props.onCancelClicked();
  };

  const onSubmitForm = () => {};

  return (
    <div
      className="modal fade"
      id="dlgBulkUpload"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              Bulk upload
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onCancelled}
            ></button>
          </div>
          {data && (
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Language:</label>
                <div className="form-check form-check-inline ms-2">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    value="option1"
                  />
                  <label className="form-check-label" htmlFor="inlineRadio1">
                    English
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio2"
                    value="option2"
                  />
                  <label className="form-check-label" htmlFor="inlineRadio2">
                    Hindi
                  </label>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="txtCategory" className="form-label">
                  Category
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="txtCategory"
                  placeholder="Category name"
                  required="required"
                  value={data.category}
                  onChange={(el) =>
                    setData({ ...data, category: el.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="txtCategory" className="form-label">
                  File{" "}
                  <small className="fst-italic">
                    (Json file containing words data)
                  </small>
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="txtWords"
                  placeholder="Json file containing words data"
                  required="required"
                  disabled={!!selectedFile}
                  accept="application/JSON"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
              </div>
              {selectedFile && totalRecords === -1 ? (
                <div
                  class="progress"
                  role="progressbar"
                  aria-label="Animated striped example"
                  aria-valuenow="75"
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  <div
                    class="progress-bar progress-bar-striped progress-bar-animated bg-success"
                    style={{ width: "100%" }}
                  ></div>
                </div>
              ) : (
                totalRecords > -1 && `Total records found: ${totalRecords}`
              )}
              {errorMsg && (
                <div className="text-center text-danger">{errorMsg}</div>
              )}
            </div>
          )}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary me-2"
              data-bs-dismiss="modal"
              onClick={onCancelled}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onSubmitForm}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkUpload;
