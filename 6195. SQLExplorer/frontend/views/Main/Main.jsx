import React, { Fragment } from "react";
import { TerminalBlock } from "../../components/TerminalBlock/TerminalBlock";
import { SelectionBlock } from "../../components/SelectionBlock/SelectionBlock";
import { PreviewBlock } from "../../components/PreviewBlock/PreviewBlock";
import { EntryFieldBlock } from "../../components/EntryFieldBlock/EntryFieldBlock";
import { MainState } from "../../context/mainState";

import("../../index.scss");

export const Main = () => {
  return (
    <MainState>
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
        {/* <div className="terminalBlock">
        <TerminalBlock />
      </div> */}
      </div>
    </MainState>
  );
};
