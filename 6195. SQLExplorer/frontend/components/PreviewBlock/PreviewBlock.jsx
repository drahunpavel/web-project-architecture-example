import React, { Fragment, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";

import { MainContext } from "../../context/mainContext";

import("../../index.scss");

const useStyles = makeStyles({
  table: {
    // minWidth: 150,
    // height: 200,
    // overflow: "auto",
  },
  paper: {
    height: 198,
    width: "100%",
    overflow: "auto",
  },
});

export const PreviewBlock = () => {
  const { data } = useContext(MainContext);
  const classes = useStyles();

  const renderContent = (data) => {
    console.log("--data", data, data.errorCode && data.errorCode);
    // switch (code) {
    //   case "7": {
    //     return {};
    //   }
    //   default:
    //     return <div>Данных нет</div>;
    // }
    if (data.errorCode === 0) {
      switch (data.type) {
        case "update":
        case "delete":
        case "insert":
        case "create":
          return <div>Changed rows: {data.data}</div>;
      }
      console.log("--", data.data);
      // return (
      //   <Paper className={classes.paper}>
      //     <Table className={classes.table} aria-label="simple table">
      //       <TableBody>
      //         {data.data.map((row) => (
      //           <TableRow key={row.name}>
      //             <TableCell align="right">{row.name}</TableCell>
      //           </TableRow>
      //         ))}
      //       </TableBody>
      //     </Table>
      //   </Paper>
      // );
    } else if (data.errorCode !== 0) {
      return <div className="error-information">{data.errorMessage}</div>;
    } else {
      return <div>Данных нет</div>;
    }
  };

  return <Fragment>{renderContent(data)}</Fragment>;
};
