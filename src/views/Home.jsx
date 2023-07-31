/* eslint-disable no-undef */
import WordsTable from "../components/WordsTable";
import DefaultLayout from "../layout/DefaultLayout";
import NewWord from "../components/NewWord";
import { DEFAULT_BULK_UPLOAD, DEFAULT_WORD } from "../constants/index.d";
import { useCallback, useEffect, useMemo, useState } from "react";
import BulkUpload from "../components/BulkUpload";
import useApi from "../hooks/useApi";

const Home = () => {
  const [word, setWord] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [bulkData, setBulkData] = useState(DEFAULT_BULK_UPLOAD);

  const {
    error: APIError,
    isLoading: APILoading,
    deleteData,
    getData,
    postData,
    putData,
  } = useApi();

  const [isShowNewWord, setIsShowNewWord] = useState(false);
  const [isShowBulkUpload, setIsShowBulkUpload] = useState(false);
  const [data, setData] = useState([]);

  const showNewWordDialog = () => {
    setIsShowNewWord(true);
  };

  const addWord = () => {
    setWord(DEFAULT_WORD);
    setIsEditMode(false);
    showNewWordDialog();
  };

  const editWord = (id) => {
    const selectedWord = data.filter((word) => word.id === id);

    if (selectedWord.length > 0) {
      setWord({ ...selectedWord[0] });
      setIsEditMode(true);
      showNewWordDialog();
    } else {
      alert("Oops! Something went wrong. Try again.");
    }
  };

  const refreshData = useCallback(() => {
    getData("", setData);
  }, []);

  const saveWord = (newWord) => {
    postData(newWord.id, newWord, refreshData);
  };

  const deleteWord = (newWord) => {
    deleteData(newWord.id, newWord, refreshData);
  };

  const bulkUploadData = (newData) => {
    setIsShowBulkUpload(false);
    setBulkData(null);

    console.log(newData);
    // const data = new FormData();
    // data.append("file", newData.file);
    postData(
      `${newData.language}/${newData.category}`,
      newData.file,
      refreshData
    );
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <DefaultLayout>
      <WordsTable
        data={data}
        onEditClicked={editWord}
        onNewClicked={addWord}
        onUploadClicked={() => {
          setBulkData(DEFAULT_BULK_UPLOAD);
          setIsShowBulkUpload(true);
        }}
      />
      <NewWord
        onCancelClicked={() => {
          setWord(null);
          setIsShowNewWord(false);
        }}
        onDeleteClicked={(newWordValue) => {
          deleteWord(newWordValue);
          setIsShowNewWord(!isShowNewWord);
          setWord(null);
        }}
        defaultWord={word}
        onNewWord={(newWordValue) => {
          setIsShowNewWord(!isShowNewWord);
          saveWord(newWordValue);
          setWord(null);
        }}
        isEditMode={isEditMode}
        isShow={isShowNewWord}
      />

      <BulkUpload
        isShow={isShowBulkUpload}
        onCancelClicked={() => setIsShowBulkUpload(false)}
        data={bulkData}
        onSubmit={bulkUploadData}
      />
    </DefaultLayout>
  );
};
export default Home;
