import React, { useState } from "react";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  AppBar,
  Typography,
  Toolbar,
  FormControl,
  Card,
  CardContent,
  Button,
  TextField,
  CircularProgress,
  Backdrop,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Tareas from "./components/tareas";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  card: {
    width: "fit-content",
    margin: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  papa: {
    display: "flex",
  },
  tareas: {
    padding: "2rem",
    width: "60%",
    display: "flex",
    flexWrap: "wrap",
    gap: "2rem",
  },
}));

const App = () => {
  const classes = useStyles();

  const [data, setData] = useState({
    title: "",
    description: "",
    id: "",
  });

  const [cargar, setCargar] = useState(false);

  const onchange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const onclick = async () => {
    if (!data.id) {
      setCargar(true);
      axios
        .post("http://localhost:4000/api/task", data)
        .then((res) => {
          setData({
            title: "",
            description: "",
          });
          setCargar(false);
          toast.success(res.data.status, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
          });
        })
        .catch((err) => console.log(err));
    } else {
      setCargar(true);
      axios
        .put(`http://localhost:4000/api/task/${data.id}`, data)
        .then((res) => {
          setData({
            title: "",
            description: "",
          });
          setCargar(false);
          toast.success(res.data.status, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: 0,
          });
        })
        .catch((err) => console.log(err));
    }
  };

  const editar = (id) => {
    axios.get(`http://localhost:4000/api/task/${id}`).then((res) => {
      setData({
        title: res.data.tarea.title,
        description: res.data.tarea.description,
        id: res.data.tarea._id,
      });
    });
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            MERN APP
          </Typography>
        </Toolbar>
      </AppBar>
      {cargar ? (
        <Backdrop open={true}>
          <CircularProgress color="secondary" />
        </Backdrop>
      ) : (
        <>
          <div className={classes.papa}>
            <div>
              <Card className={classes.card}>
                <CardContent>
                  <FormControl>
                    <TextField
                      id="title"
                      name="title"
                      label="Titulo"
                      style={{ margin: 8 }}
                      placeholder="añada su titulo"
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={data.title}
                      onChange={onchange}
                    />
                    <TextField
                      id="description"
                      name="description"
                      label="Descripción"
                      style={{ margin: 8 }}
                      placeholder="añada su descripción"
                      fullWidth
                      margin="normal"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      value={data.description}
                      onChange={onchange}
                    />
                    <Button
                      size="small"
                      color="primary"
                      type="submit"
                      onClick={onclick}
                    >
                      Guardar
                    </Button>
                  </FormControl>
                </CardContent>
              </Card>
            </div>
            <div className={classes.tareas}>
              <Tareas editar={editar} />
            </div>
            <ToastContainer />
          </div>
        </>
      )}
    </div>
  );
};

export default App;
