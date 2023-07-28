import { Link } from "react-router-dom";
import { YOUTUBE_BASE_URL } from "../constants/index.d";

const WordsTable = (props) => {
  return (
    <div className="row">
      <div className="col-12 text-end pb-2">
        <button
          type="button"
          className="btn btn-warning me-2"
          onClick={(e) => props.onUploadClicked(e)}
        >
          ^ Upload
        </button>
        <button
          type="button"
          className="btn btn-primary"
          onClick={(e) => props.onNewClicked(e)}
        >
          + New Record
        </button>
      </div>
      <div className="col-12">
        <table className="table table-responsive border" width={"100%"}>
          <thead>
            <tr className="p-2">
              <th className="border">Id</th>
              <th className="border">Category English</th>
              <th className="border">Category Hindi</th>
              <th className="border">Word English</th>
              <th className="border">Word Hindi</th>
              <th className="border">Video Url English</th>
              <th className="border">Video Url Hindi</th>
            </tr>
          </thead>
          <tbody>
            {props.data ? (
              props.data.map((item) => (
                <tr key={item.id}>
                  <td className="border">
                    <Link
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        props.onEditClicked(item.id);
                      }}
                    >
                      {item.id}
                    </Link>
                  </td>
                  <td className="border">{item.category_english}</td>
                  <td className="border">{item.category_hindi}</td>
                  <td className="border">{item.word_english}</td>
                  <td className="border">{item.word_hindi}</td>
                  <td className="border">
                    <Link
                      to={`${YOUTUBE_BASE_URL}${item.video_url_english}`}
                      target="_blank"
                    >
                      {item.video_url_english}
                    </Link>
                  </td>
                  <td className="border">
                    <Link
                      to={`${YOUTUBE_BASE_URL}${item.video_url_hindi}`}
                      target="_blank"
                    >
                      {item.video_url_hindi}
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <th colSpan={7} className="text-center text-danger border">
                  No data, start by adding new record
                </th>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WordsTable;
