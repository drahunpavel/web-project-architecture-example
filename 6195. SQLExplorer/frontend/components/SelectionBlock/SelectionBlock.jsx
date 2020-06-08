import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { API } from "../../network/API";

const useStyles = makeStyles((theme) => ({
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

export const SelectionBlock = () => {
  const classes = useStyles();
  const [db, setDb] = useState("");
  const [dbArr, setdbArr] = useState([]);
  const [open, setOpen] = useState(false);

  async function fetchData() {
    const response = await API.getDB();
    return response;
  }

  async function fetchSetDB(data) {
    const response = await API.setDB(data);
    return response;
  }

  useEffect(() => {
    fetchData().then((res) => {
      setdbArr(res.data.data);
      if (res.data.data.length) {
        // setDb(res.data.data[0].Database);
        setDb("learning_db");

        fetchSetDB({ db: "learning_db" });
      }
    });
  }, []); //вызыв будет 1 раз - это эмуляция componentDidMount

  const handleChange = (event) => {
    fetchSetDB({ db: event.target.value });
    setDb(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Button className={classes.button} onClick={handleOpen}>
        Select DB
      </Button>
      <FormControl className={classes.formControl}>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={db}
          onChange={handleChange}
        >
          {dbArr.map((item, index) => (
            <MenuItem key={index} value={item.Database}>
              {item.Database}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
