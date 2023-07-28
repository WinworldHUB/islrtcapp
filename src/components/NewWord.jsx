import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import {
  ENGLISH_CATEGORY_EMPTY_ERROR,
  ENGLISH_VIDEO_URL_EMPTY_ERROR,
  ENGLISH_WORD_EMPTY_ERROR,
  HINDI_CATEGORY_EMPTY_ERROR,
  HINDI_VIDEO_URL_EMPTY_ERROR,
  HINDI_WORD_EMPTY_ERROR,
} from "../constants/index.d";
import { hideDialog, showDialog } from "../utils";

const NewWord = (props) => {
  const [word, setWord] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [newWordDialog, setNewWordDialog] = useState(null);

  useEffect(() => {
    if (props.isShow) {
      showDialog("dlgNewWord", setNewWordDialog);
    } else {
      hideDialog(newWordDialog);
    }
  }, [props.isShow]);

  useEffect(() => {
    if (props.defaultWord) setWord(props.defaultWord);
  }, [props.defaultWord]);

  const clearForm = () => {
    setWord(null);
    setErrorMsg(null);
  };

  const onCancelled = () => {
    clearForm();
    props.onCancelClicked();
  };

  const onDeleted = () => {
    clearForm();
    props.onDeleteClicked();
  };

  const onSubmitForm = async () => {
    /// Validate form
    const {
      category_english,
      category_hindi,
      word_english,
      word_hindi,
      video_url_english,
      video_url_hindi,
    } = word;

    if (isEmpty(category_english)) {
      setErrorMsg(ENGLISH_CATEGORY_EMPTY_ERROR);
      return;
    }

    if (isEmpty(category_hindi)) {
      setErrorMsg(HINDI_CATEGORY_EMPTY_ERROR);
      return;
    }

    if (isEmpty(word_english)) {
      setErrorMsg(ENGLISH_WORD_EMPTY_ERROR);
      return;
    }

    if (isEmpty(word_hindi)) {
      setErrorMsg(HINDI_WORD_EMPTY_ERROR);
      return;
    }

    if (isEmpty(video_url_english)) {
      setErrorMsg(ENGLISH_VIDEO_URL_EMPTY_ERROR);
      return;
    }

    if (isEmpty(video_url_hindi)) {
      setErrorMsg(HINDI_VIDEO_URL_EMPTY_ERROR);
      return;
    }

    props.onNewWord(word);
    clearForm();
  };

  return (
    <div
      className="modal fade"
      id="dlgNewWord"
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
              {props.isEditMode
                ? `Edit word - ${word?.word_english} / ${word?.word_hindi}`
                : "New word"}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onCancelled}
            ></button>
          </div>
          {word && (
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="txtCategoryEn" className="form-label">
                  Category - English
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="txtCategoryEn"
                  placeholder="Category name"
                  required="required"
                  value={word.category_english}
                  onChange={(el) =>
                    setWord({ ...word, category_english: el.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="txtCategoryHi" className="form-label">
                  Category - Hindi
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="txtCategoryHi"
                  placeholder="श्रेणी नाम"
                  required="required"
                  value={word.category_hindi}
                  onChange={(el) =>
                    setWord({ ...word, category_hindi: el.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="txtWordEn" className="form-label">
                  Word - English
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="txtWordEn"
                  placeholder="Word"
                  required="required"
                  value={word.word_english}
                  onChange={(el) =>
                    setWord({ ...word, word_english: el.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="txtWordHi" className="form-label">
                  Word - Hindi
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="txtWordHi"
                  placeholder="शब्द"
                  required="required"
                  value={word.word_hindi}
                  onChange={(el) =>
                    setWord({ ...word, word_hindi: el.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="txtVideoUrlEn" className="form-label">
                  Video Url - English
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="txtVideoUrlEn"
                  placeholder="Video Url"
                  required="required"
                  value={word.video_url_english}
                  onChange={(el) =>
                    setWord({ ...word, video_url_english: el.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="txtVideoUrlHi" className="form-label">
                  Video Url - Hindi
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="txtVideoUrlHi"
                  placeholder="वीडियो यूआरएल"
                  required="required"
                  value={word.video_url_hindi}
                  onChange={(el) =>
                    setWord({ ...word, video_url_hindi: el.target.value })
                  }
                />
              </div>
              {errorMsg && (
                <div className="text-center text-danger">{errorMsg}</div>
              )}
            </div>
          )}
          <div className="modal-footer justify-content-between">
            {props.isEditMode ? (
              <button
                type="button"
                className="btn btn-danger me-2"
                data-bs-dismiss="modal"
                onClick={onDeleted}
              >
                Delete
              </button>
            ) : (
              <span>&nbsp;</span>
            )}
            <div>
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
    </div>
  );
};

export default NewWord;
