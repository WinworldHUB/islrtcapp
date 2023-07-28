/* eslint-disable no-undef */
import WordsTable from "../components/WordsTable";
import DefaultLayout from "../layout/DefaultLayout";
import NewWord from "../components/NewWord";
import {
  DEFAULT_BULK_UPLOAD,
  DEFAULT_WORD,
  SAMPLE_DATA,
} from "../constants/index.d";
import { useState } from "react";
import { hideDialog, showDialog } from "../utils";
import useLoading from "../hooks/useLoading";
import BulkUpload from "../components/BulkUpload";

const Home = () => {
  const [word, setWord] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const [isShowProgress, setIsShowProgress] = useState(false);
  const [isShowNewWord, setIsShowNewWord] = useState(false);
  const [isShowBulkUpload, setIsShowBulkUpload] = useState(false);

  const { OverviewLoading } = useLoading(
    isShowProgress,
    "Please wait",
    "We are working on your request..."
  );

  const showNewWordDialog = () => {
    setIsShowNewWord(true);
  };

  const addWord = () => {
    setWord(DEFAULT_WORD);
    setIsEditMode(false);
    showNewWordDialog();
  };

  const editWord = (id) => {
    const selectedWord = SAMPLE_DATA.filter((word) => word.id === id);

    if (selectedWord.length > 0) {
      setWord({ ...selectedWord[0] });
      setIsEditMode(true);
      showNewWordDialog();
    } else {
      alert("Oops! Something went wrong. Try again.");
    }
  };

  return (
    <DefaultLayout>
      <WordsTable
        data={SAMPLE_DATA}
        onEditClicked={editWord}
        onNewClicked={addWord}
        onUploadClicked={() => setIsShowBulkUpload(true)}
      />
      <NewWord
        onCancelClicked={() => {
          setWord(DEFAULT_WORD);
          setIsShowNewWord(false);
        }}
        defaultWord={word}
        onNewWord={(newWordValue) => {
          hideDialog(newWordDialog);
          setWord(newWordValue);
        }}
        isEditMode={isEditMode}
        isShow={isShowNewWord}
      />
      {OverviewLoading}
      <BulkUpload
        isShow={isShowBulkUpload}
        onCancelClicked={() => setIsShowBulkUpload(false)}
        data={DEFAULT_BULK_UPLOAD}
      />
    </DefaultLayout>
  );
};
export default Home;
