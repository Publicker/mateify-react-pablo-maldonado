import React, { useState } from "react";
import songData from "../database/songData.json";

import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Grid,
  Box,
  Typography,
  TextField,
  InputAdornment,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Avatar,
  IconButton,
} from "@material-ui/core";
import MuiTableCell from "@material-ui/core/TableCell";

import { Search, Add } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  app: {
    flexGrow: 1,
  },
  box: {
    backgroundColor: "#FFF",
  },
  table: {
    minWidth: 650,
  },
  tableHeadTitle: {
    borderBottom: "none",
    paddingBottom: 0,
    paddingTop: theme.spacing(1),
  },
  textField: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    width: "100%",
  },
  disabledColor: {
    color: theme.palette.action.disabled,
  },
}));

const TableCell = withStyles({
  root: {
    borderBottom: "none",
  },
})(MuiTableCell);

const PlaylistCreator = () => {
  const classes = useStyles();

  // const [searchResults, setSearchResults] = useState([]);
  const [searchResults, setSearchResults] = useState(songData);

  const _renderSearchTable = () => {
    return (
      <TableContainer>
        <Table className={classes.table}>
          {!searchResults.length && (
            <caption>
              <Typography align="center" className={classes.disabledColor}>
                No hay resultados: utiliza la barra de búsqueda para encontrar
                canciones
              </Typography>
            </caption>
          )}
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeadTitle}>
                <Typography color="primary" variant="h6">
                  Resultados
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <MuiTableCell>Nombre</MuiTableCell>
              <MuiTableCell>Artista</MuiTableCell>
              <MuiTableCell>Álbum</MuiTableCell>
              <MuiTableCell>Duración</MuiTableCell>
              <MuiTableCell>Agregar</MuiTableCell>
            </TableRow>
          </TableHead>
          <TableBody>{_renderSearchList(searchResults)}</TableBody>
        </Table>
      </TableContainer>
    );
  };

  const _renderSearchList = (listSongs) =>
    listSongs.map((song) => (
      <TableRow key={`result-${song.uuid}`}>
        <TableCell component="th" scope="row">
          <Grid container direction="row" alignItems="center" wrap="nowrap">
            <Grid item>
              <Box pr={2}>
                <Avatar
                  alt={`Foto de ${song.artist}`}
                  src={song.artist.coverUrl}
                />
              </Box>
            </Grid>
            <Grid item>
              <Typography noWrap>{song.name}</Typography>
            </Grid>
          </Grid>
        </TableCell>
        <TableCell>{song.artist.name}</TableCell>
        <TableCell>{song.album}</TableCell>
        <TableCell>{song.duration}</TableCell>
        <TableCell>
          <IconButton
            aria-label="Añadir canción a la playlist"
            // onClick={TODO: Add onclick}
            color="inherit"
          >
            <Add />
          </IconButton>
        </TableCell>
      </TableRow>
    ));

  return (
    <Grid container justify="center" className={classes.app}>
      <Grid item xs={10} md={8}>
        <TextField
          className={classes.textField}
          id="input"
          label="Buscar"
          type="email"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={10} md={8}>
        <Box width="100%" borderRadius={4} className={classes.box}>
          <Box p={2}>{_renderSearchTable()}</Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default PlaylistCreator;
