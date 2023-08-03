import React, { useEffect, useState } from "react";
import { hideDialog, showDialog } from "../utils";
import { isEmpty } from "lodash";
import {
  CATEGORY_EMPTY_ERROR,
  FILE_EMPTY_ERROR,
  LANGUAGE_NOT_SELECTED_ERROR,
} from "../constants/index.d";

const BulkUpload = (props) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [data, setData] = useState(null);
  const [bulkUploadDialog, setBulkUploadDialog] = useState(null);

  useEffect(() => {
    if (props.isShow) {
      showDialog("dlgBulkUpload", setBulkUploadDialog);
    } else {
      hideDialog(bulkUploadDialog);
    }
  }, [props.isShow]);

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

  const onFileSelected = (el) => {
    const fileReader = new FileReader();
    fileReader.readAsText(el.target.files[0]);
    fileReader.onload = (e) =>
      setData({ ...data, words: JSON.parse(e.target.result) });
  };

  const onSubmitForm = () => {
    if (isEmpty(data.language)) {
      setErrorMsg(LANGUAGE_NOT_SELECTED_ERROR);
      return;
    }

    if (isEmpty(data.category)) {
      setErrorMsg(CATEGORY_EMPTY_ERROR);
      return;
    }

    if (isEmpty(data.words)) {
      setErrorMsg(FILE_EMPTY_ERROR);
      return;
    }

    props.onSubmit(data);
  };

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
                    name="language"
                    id="languageEN"
                    value="english"
                    onChange={(e) =>
                      setData({ ...data, language: e.target.value })
                    }
                  />
                  <label className="form-check-label" htmlFor="languageEN">
                    English
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="language"
                    id="languageHI"
                    value="hindi"
                    onChange={(e) =>
                      setData({ ...data, language: e.target.value })
                    }
                  />
                  <label className="form-check-label" htmlFor="languageHI">
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
                  accept="application/JSON"
                  onChange={onFileSelected}
                />
              </div>
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
