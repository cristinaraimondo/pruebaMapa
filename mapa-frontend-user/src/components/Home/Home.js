import * as React from "react";
import "leaflet/dist/leaflet.css";
import { Box, Button, Modal, Stack, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import "./Home.scss";
import MapView from "../MapView/MapView";
import petitions from "../Petitions";
import SelectTextField from "../SelectTextField";
import Footer from "../Footer/Footer";

export default function Home() {
  return (
    <div className="background">
      <div>
        <SelectTextField />
        <MapView />
      </div>
      <div>
        <InfoPlace />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

const stylebox = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "100%",
  width: 750,
  overflow: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function InfoPlace(place) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Ver info</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={stylebox}>
          <Button onClick={handleClose}>
            <CloseIcon color="primary" />
          </Button>
          <Stack>
            <img
              src={`https://www.uba.ar/internacionales/archivos/TEST.jpg`}
              width="100%"
              height="100%"
            />
          </Stack>
          <Stack className="modal-title">
            <b>Nombre</b>
          </Stack>
          <Stack>El nombre</Stack>
          <Stack className="modal-title">
            <b>Descripcion</b>
          </Stack>
          <Stack>La descripcion</Stack>
          <Stack className="modal-title">
            <b>Categorias</b>
          </Stack>
          <Stack>
            <li>categoria 1</li>
            <li>categoria 2</li>
          </Stack>
          <Stack className="modal-title">
            <b>Caracteristicas</b>
          </Stack>
          <Stack>
            <li>caracteristica 1</li>
            <li>caracteristica 2</li>
          </Stack>
          <Stack className="modal-title">
            <b>Puntaje:</b>
          </Stack>
          {FormRating(place)}
          <Stack className="modal-title">
            <b>Opiniones</b>
          </Stack>
          <Stack>Opiniones</Stack>
          {FormComment(place)}
        </Box>
      </Modal>
    </div>
  );
}

function FormComment(place) {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const newComment = await petitions.CreateComment(data);
    let dataCommentToPlace = {};
    dataCommentToPlace.place = place;
    dataCommentToPlace.comment = newComment;
    petitions.AddCommentToPlace(dataCommentToPlace);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack className="modal-title">
        <b>Dejar una opinion</b>
      </Stack>
      <Stack direction="row">
        <TextField
          style={{ background: "white" }}
          {...register("name")}
          required
          label="Nombre"
          placeholder="Nombre"
        />
      </Stack>
      <Stack mt="3px">
        <TextField
          style={{ background: "white" }}
          {...register("text")}
          required
          label="Comentario"
          placeholder="Comentario"
        />
      </Stack>
      <Stack direction="row" mt="3px">
        <Button
          variant="contained"
          type="submit"
          style={{ background: "gray" }}
        >
          Dejar opinion
        </Button>
      </Stack>
    </form>
  );
}

function FormRating(place) {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    let dataEditRating = {};
    dataEditRating.rating = data.rating;
    dataEditRating.place = place;
    petitions.EditRating(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack className="modal-title">
        <b>Dar puntuación</b>
      </Stack>
      <Stack direction="row">
        <select {...register("rating")}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </Stack>
      <Stack direction="row" mt="3px">
        <Button
          variant="contained"
          type="submit"
          style={{ background: "gray" }}
        >
          Dejar puntaje
        </Button>
      </Stack>
    </form>
  );
}
