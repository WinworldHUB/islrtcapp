import { useEffect, useMemo, useState } from "react";
import { hideDialog, showDialog } from "../utils";

const Loading = (props) => {
  const [dlgHandle, setDlgHandle] = useState(null);

  useEffect(() => {
    if (props.isShow && !dlgHandle) {
      console.log("Show called");
      showDialog("dlgLoading", (handle) => setDlgHandle(handle));
    } else {
      console.log("hide called ", dlgHandle);
      hideDialog(dlgHandle);
      setDlgHandle(null);
    }
  }, [props.isShow]);

  return (
    <div
      className="modal fade"
      id="dlgLoading"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              {props.title}
            </h1>
          </div>
          <div className="modal-body" onClick={props.onCancel}>
            We are working on your request ...
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
