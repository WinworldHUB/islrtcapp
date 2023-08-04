import { useRef } from "react";
import DataTable from "react-data-table-component";

const WordsTable = (props) => {
  const headerRef = useRef(null);
  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Category English",
      selector: (row) => row.category_english,
      sortable: true,
    },
    {
      name: "Category Hindi",
      selector: (row) => row.category_hindi,
      sortable: true,
    },
    {
      name: "Word English",
      selector: (row) => row.word_english,
      sortable: true,
    },
    {
      name: "Word Hindi",
      selector: (row) => row.word_hindi,
      sortable: true,
    },
    {
      name: "Video Url English",
      selector: (row) => row.video_url_english,
      sortable: true,
    },
    {
      name: "Video Url Hindi",
      selector: (row) => row.video_url_hindi,
      sortable: true,
    },
  ];

  return (
    <div className="row">
      <div className="col-12 pb-2 d-flex justify-content-between">
        <div className="mb-3">
          <select
            className="form-select"
            aria-label="Default select example"
            onChange={(e) => {
              props.onFiltered?.(e.target.value);
            }}
          >
            <option defaultValue={"all"}>All categories</option>
            {(props.categories ?? []).map((category) => (
              <option value={category.title} key={category.title}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
        <div ref={headerRef}>
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
      </div>
      <div className="col-12">
        <DataTable
          columns={columns}
          data={props.data}
          fixedHeader={true}
          fixedHeaderScrollHeight={`calc(100vh - ${
            headerRef.current?.clientHeight + 130
          }px)`}
          pagination={true}
          highlightOnHover={true}
          onRowClicked={(row) => props.onEditClicked(row.id)}
        />
      </div>
    </div>
  );
};

export default WordsTable;
