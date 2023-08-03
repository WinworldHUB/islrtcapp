/* eslint-disable no-undef */
import WordsTable from "../components/WordsTable";
import DefaultLayout from "../layout/DefaultLayout";
import NewWord from "../components/NewWord";
import { DEFAULT_BULK_UPLOAD, DEFAULT_WORD } from "../constants/index.d";
import { useCallback, useEffect, useMemo, useState } from "react";
import BulkUpload from "../components/BulkUpload";
import useApi from "../hooks/useApi";
import ProcessBulkUpload from "../components/ProcessBulkUpload";
import LoadingIcon from "../components/LoadingIcon";

const Home = () => {
  const [word, setWord] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [bulkData, setBulkData] = useState(null);

  const {
    error: APIError,
    isLoading: APILoading,
    deleteData,
    getData,
    postData,
  } = useApi();

  const [isShowNewWord, setIsShowNewWord] = useState(false);
  const [isShowBulkUpload, setIsShowBulkUpload] = useState(false);
  const [isShowProcessBulkUpload, setIsShowProcessBulkUpload] = useState(false);
  const [data, setData] = useState(null);
  const [categoriesEN, setCategoriesEN] = useState([]);
  const [categoriesHI, setCategoriesHI] = useState([]);

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

  const refreshData = () => {
    getData("", setData);
    getData("hindi/categories", setCategoriesHI);
    getData("english/categories", setCategoriesEN);
  };

  const saveWord = (newWord) => {
    postData(newWord.id, newWord, refreshData);
  };

  const deleteWord = (newWord) => {
    deleteData(newWord.id, newWord, refreshData);
  };

  const bulkUploadData = (newData) => {
    setIsShowBulkUpload(false);
    setBulkData(newData);
    setIsShowProcessBulkUpload(true);

    console.log(newData);
  };

  useEffect(() => {
    if (!data) refreshData();
  }, []);

  //if (APILoading === true) return <LoadingIcon />;

  return (
    <DefaultLayout>
      <WordsTable
        categories={categoriesEN}
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
        data={bulkData ?? DEFAULT_BULK_UPLOAD}
        onSubmit={bulkUploadData}
      />
      <ProcessBulkUpload
        isShow={isShowProcessBulkUpload}
        data={bulkData}
        onCompleted={refreshData}
      />
    </DefaultLayout>
  );
};
export default Home;
