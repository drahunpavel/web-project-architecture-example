import React, { Fragment } from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";

import("../../index.scss");

export const EntryFieldBlock = () => {
  return (
    <div className="entryFieldBlock-content">
      <div className="controlPanel">
        <Button variant="contained" color="primary" size="small">
          Send
        </Button>
      </div>
      <div className="entry">
        <textarea />
      </div>
    </div>
  );
};
