import React, { useState } from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";
import { API } from "../../network/API";

import("../../index.scss");

export const EntryFieldBlock = () => {
  const [value, setValue] = useState("");

  async function sendParams() {
    console.log("--", value);
    if (value.trim()) {
      const data = { condition: value };
      let res = await API.getData(data);
      console.log("--res", res);
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
