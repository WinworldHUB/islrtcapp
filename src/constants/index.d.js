export const YOUTUBE_BASE_URL = "https://www.youtube.com/watch?v=";
//export const ISLRTC_BASE_URL = "http://localhost:8080/";
export const ISLRTC_BASE_URL = "https://islrtcbe.onrender.com/";

export const ENGLISH_CATEGORY_EMPTY_ERROR =
  "Please provide a value for English Category";
export const HINDI_CATEGORY_EMPTY_ERROR =
  "Please provide a value for Hindi Category";
export const ENGLISH_WORD_EMPTY_ERROR =
  "Please provide a value for English Word";
export const HINDI_WORD_EMPTY_ERROR = "Please provide a value for Hindi Word";
export const ENGLISH_VIDEO_URL_EMPTY_ERROR =
  "Please provide a value for English Video Url";
export const HINDI_VIDEO_URL_EMPTY_ERROR =
  "Please provide a value for Hindi Video Url";
export const ENGLISH_VIDEO_URL_INCORRECT_ERROR =
  "English Video dose not exists";
export const HINDI_VIDEO_URL_INCORRECT_ERROR = "Hindi Video dose not exists";
export const VALIDATING_VIDEO_URLS = "Validating video urls";
export const LANGUAGE_NOT_SELECTED_ERROR = "Please select a language";
export const CATEGORY_EMPTY_ERROR = "Please provide a value for category";
export const FILE_EMPTY_ERROR = "Please select a file";

export const DEFAULT_WORD = {
  id: "",
  category_english: "",
  category_hindi: "",
  word_english: "",
  word_hindi: "",
  video_url_english: "",
  video_url_hindi: "",
};

export const DEFAULT_BULK_UPLOAD = {
  language: "",
  category: "",
  words: "",
};

export const SAMPLE_DATA = [
  {
    id: "1",
    category_english: "Academic",
    category_hindi: "शैक्षिक",
    word_english: "ability to pay principle",
    word_hindi: "उपरिभूमिक लक्षण",
    video_url_english: "GYAnF-rsCxc",
    video_url_hindi: "zPbdxvnQKSQ",
  },
];

export const API_GET_OPTIONS = {
  method: "GET",
  headers: { "Content-Type": "application/json" },
};

export const API_POST_OPTIONS = (data) => {
  return {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
};

export const API_DELETE_OPTIONS = (data) => {
  return {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
};

export const API_PUT_OPTIONS = (data) => {
  return {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: data,
  };
};

export const API_SUCCESS = "success";
export const API_FAILURE = "failure";

export const LANGUAGE_EN = "English";
export const LANGUAGE_HI = "Hindi";
