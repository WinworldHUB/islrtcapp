import { useEffect, useState } from "react";
import useApi from "./useApi";
import { LANGUAGE_EN } from "../constants/index.d";
import { isEmpty } from "lodash";

const useBulkUpload = () => {
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dataToUpload, setDataToUpload] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const { getData, postData } = useApi();
  const [message, setMessage] = useState(null);

  const addWord = (newWord) => {
    setMessage(
      `Adding word: ${
        isEmpty(newWord.word_english)
          ? newWord.word_hindi
          : newWord.word_english
      }`
    );
    postData(
      "",
      newWord,
      () => setCurrentIndex(currentIndex + 1),
      (errorValue) => console.log(errorValue)
    );
  };

  const updateWord = (newWord) => {
    setMessage(
      `Updating word: ${
        isEmpty(newWord.word_english)
          ? newWord.word_hindi
          : newWord.word_english
      }`
    );
    postData(
      newWord.id,
      newWord,
      () => setCurrentIndex(currentIndex + 1),
      (errorValue) => console.log(errorValue)
    );
  };

  const saveWord = (newWord, video_url, isEnglish) => {
    getData(
      `video/${video_url}`,
      (value) => {
        console.log(value);

        if (value.length > 0) {
          newWord.id = value[0].id;
          if (isEnglish) {
            newWord.category_hindi = value[0].category_hindi;
            newWord.word_hindi = value[0].word_hindi;
            newWord.video_url_hindi = value[0].video_url_hindi;
          } else {
            newWord.category_english = value[0].category_english;
            newWord.word_english = value[0].word_english;
            newWord.video_url_english = value[0].video_url_english;
          }
          updateWord(newWord);
        } else {
          addWord(newWord);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    if (dataToUpload && currentIndex > 0 && currentIndex < totalRecords) {
      const isEnglish =
        dataToUpload.language.toLowerCase() === LANGUAGE_EN.toLowerCase();
      const word = dataToUpload.words[currentIndex];
      const newWord = {
        id: "",
        category_english: isEnglish ? dataToUpload.category : "",
        category_hindi: isEnglish ? "" : dataToUpload.category,
        word_english: isEnglish ? word.title : "",
        word_hindi: isEnglish ? "" : word.title,
        video_url_english: isEnglish ? word.url : "",
        video_url_hindi: isEnglish ? "" : word.url,
      };
      saveWord(newWord, word.url, isEnglish);
    } else if (dataToUpload) {
      console.log(dataToUpload);
      setIsCompleted(true);
    }
  }, [currentIndex, dataToUpload]);

  const uploadData = (bulkUploadData) => {
    // API stuff to upload the file
    setDataToUpload(bulkUploadData);
    setTotalRecords(bulkUploadData?.words?.length);
    setIsCompleted(false);
    setCurrentIndex(1);
  };

  return { currentIndex, isCompleted, message, totalRecords, uploadData };
};

export default useBulkUpload;
