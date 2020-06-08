import React, { useState, useContext } from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import { MainContext } from "../../context/mainContext";
import { API } from "../../network/API";

import("../../index.scss");

export const EntryFieldBlock = () => {
  const { fetchData } = useContext(MainContext);
  const [value, setValue] = useState("");

  async function sendParams() {
    if (value.trim()) {
      const data = { condition: value };
      fetchData(data);
    }
  }

  return (
    <div className="entryFieldBlock-content">
      <div className="controlPanel">
        <Button
          onClick={sendParams}
          variant="contained"
          color="primary"
          size="small"
        >
          Send
        </Button>
      </div>
      <div className="entry">
        <textarea value={value} onChange={(e) => setValue(e.target.value)} />
      </div>
    </div>
  );
};
