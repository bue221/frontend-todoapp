import React, { useEffect, useState } from "react";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const Tareas = ({ editar }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    obtenerData();
  }, []);

  const obtenerData = async () => {
    const res = await axios.get("http://localhost:4000/api/task");
    setData(res.data);
  };

  const eliminar = async (id) => {
    if (window.confirm("Estas seguro de eliminar esta tarea?")) {
      axios
        .delete(`http://localhost:4000/api/task/${id}`)
        .then((res) => {
          obtenerData();
          toast.error(res.data.status, {
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

  return (
    <>
      {data.tareas && (
        <>
          {data.tareas.map((i, index) => (
            <Card variant="outlined" style={{ width: "30%" }} key={index}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  Tarea {index + 1}
                </Typography>
                <Typography variant="h5" component="h2">
                  {i.title}
                </Typography>
                <Typography color="textSecondary">Descripción</Typography>
                <Typography variant="body2" component="p">
                  {i.description}
                  <br />
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  color="secondary"
                  size="small"
                  onClick={() => eliminar(i._id)}
                >
                  Eliminar
                </Button>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => editar(i._id)}
                >
                  Editar
                </Button>
              </CardActions>
            </Card>
          ))}
        </>
      )}
      <ToastContainer />
    </>
  );
};

export default Tareas;
