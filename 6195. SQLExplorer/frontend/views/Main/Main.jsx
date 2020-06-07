import React, { Fragment } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { TerminalBlock } from "../../components/TerminalBlock/TerminalBlock";
import { SelectionBlock } from "../../components/SelectionBlock/SelectionBlock";
import { PreviewBlock } from "../../components/PreviewBlock/PreviewBlock";
import { EntryFieldBlock } from "../../components/EntryFieldBlock/EntryFieldBlock";

import("../../index.scss");

export const Main = () => {
  const useStyles = makeStyles({
    but1: {
      background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
      border: 0,
      borderRadius: 3,
      boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
      color: "white",
      height: 48,
      padding: "0 30px",
    },
    class2: {
      color: "red",
    },
  });

  const classes = useStyles();
  return (
    <div className="Main">
      <div className="disposition-v">
        <div className="selectionBlock">
          <SelectionBlock />
        </div>

        <div className="disposition-g">
          <div className="entryFieldBlock">
            <EntryFieldBlock />
          </div>
          <div className="previewBlock">
            <PreviewBlock />
          </div>
        </div>
      </div>
      <div className="terminalBlock">
        <TerminalBlock />
      </div>
    </div>
  );
};
