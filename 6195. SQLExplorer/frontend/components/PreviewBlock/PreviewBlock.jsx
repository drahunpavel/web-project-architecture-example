import React, { Fragment, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import TableHead from "@material-ui/core/TableHead";

import { MainContext } from "../../context/mainContext";

import("../../index.scss");

const useStyles = makeStyles({
  paper: {
    height: 198,
    width: "100%",
    overflow: "auto",
  },
  TableHead: {
    fontWeight: 900,
  },
});

export const PreviewBlock = () => {
  const { data } = useContext(MainContext);
  const classes = useStyles();

  const buildTableHeader = (data) => {
    let arr = [];

    for (var key in data) {
      arr.push(key);
    }

    return arr;
  };

  const renderContent = (data) => {
    if (data.errorCode === 0) {
      switch (data.type) {
        case "update":
        case "delete":
        case "insert":
        case "create":
          return <div>Changed rows: {data.data}</div>;

        case "select":
        case "show":
          if (data.data.length) {
            let headArr = buildTableHeader(data.data[0]);
            return (
              <Paper className={classes.paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      {headArr.map((item, index) => (
                        <TableCell
                          className={classes.TableHead}
                          key={index}
                          align="left"
                        >
                          {item}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.data.map((row, index) => (
                      <TableRow key={index}>
                        {headArr.map((item, index) => {
                          return (
                            <TableCell key={index} align="left">
                              {row[item]}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Paper>
            );
          } else {
            return <div>Nothing found</div>;
          }
      }
    } else if (data.errorCode !== 0) {
      return <div className="error-information">{data.errorMessage}</div>;
    } else {
      return <div>Make a request</div>;
    }
  };

  return <Fragment>{renderContent(data)}</Fragment>;
};
