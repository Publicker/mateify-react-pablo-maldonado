import React, { useState, useEffect } from "react";
import songDataFromDb from "../database/songData.json";

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
  Paper,
  Hidden,
} from "@material-ui/core";
import MuiTableCell from "@material-ui/core/TableCell";

import {
  Search,
  AddCircle,
  RemoveCircle,
  ThumbUp,
  ThumbDown,
} from "@material-ui/icons";

const randomInteger = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const useStyles = makeStyles((theme) => ({
  app: {
    flexGrow: 1,
  },
  box: {
    backgroundColor: "#FFF",
  },
  table: {
    // TODO: remove this
    // minWidth: 650,
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
  noResultsSearch: {
    paddingTop: theme.spacing(2),
  },
  mb2: {
    marginBottom: theme.spacing(2),
  },
}));

const TableCell = withStyles({
  root: {
    borderBottom: "none",
  },
})(MuiTableCell);

let songData = songDataFromDb;

songData = songData.map((song) => {
  song.votes = randomInteger(0, 40);
  return song;
});

const PlaylistCreator = () => {
  const classes = useStyles();

  const [inputSearchValue, setInputSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playlistSongs, setPlaylistSongs] = useState([]);
  // const [playlistSongs, setPlaylistSongs] = useState(songData);

  const _renderSearchTable = () => {
    return (
      <TableContainer>
        <Table className={classes.table}>
          {!searchResults.length && (
            <caption>
              <Typography
                align="center"
                className={`${classes.disabledColor} ${classes.noResultsSearch}`}
              >
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
              <Hidden xsDown>
                <MuiTableCell>Álbum</MuiTableCell>
                <MuiTableCell>Duración</MuiTableCell>
              </Hidden>
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
            <Hidden xsDown>
              <Grid item>
                <Box pr={2}>
                  <Avatar
                    alt={`Foto de ${song.artist}`}
                    src={song.artist.coverUrl}
                  />
                </Box>
              </Grid>
            </Hidden>
            <Grid item>
              <Typography noWrap>{song.name}</Typography>
            </Grid>
          </Grid>
        </TableCell>
        <TableCell>{song.artist.name}</TableCell>
        <Hidden xsDown>
          <TableCell>{song.album}</TableCell>
          <TableCell>{song.duration}</TableCell>
        </Hidden>
        <TableCell>
          {!playlistSongs.includes(song) ? (
            <IconButton
              aria-label="Añadir canción a la playlist"
              onClick={() => handleAddSong(song)}
              color="inherit"
            >
              <AddCircle color="secondary" />
            </IconButton>
          ) : (
            <IconButton
              aria-label="Eliminar canción de la playlist"
              onClick={() => handleRemoveSong(song)}
              color="inherit"
            >
              <RemoveCircle color="secondary" />
            </IconButton>
          )}
        </TableCell>
      </TableRow>
    ));

  const _renderPlaylistTable = () => {
    return (
      <TableContainer>
        <Table className={classes.table}>
          {!playlistSongs.length && (
            <caption>
              <Grid container justify="center">
                <Grid item xs={6}>
                  <Paper variant="outlined">
                    <Box p={3}>
                      <Grid container justify="center" direction="column">
                        <Grid item>
                          <Typography
                            component="div"
                            align="center"
                            className={`${classes.disabledColor}`}
                          >
                            <Box fontWeight="fontWeightBold" m={1}>
                              UPS!, TU PLAYLIST AÚN ESTÁ VACÍA
                            </Box>
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography
                            align="center"
                            className={`${classes.disabledColor}`}
                          >
                            Comienza a agregar canciones
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </caption>
          )}
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeadTitle}>
                <Typography color="primary" variant="h6">
                  Tu playlist
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <MuiTableCell>Nombre</MuiTableCell>
              <MuiTableCell>Artista</MuiTableCell>
              <Hidden xsDown>
                <MuiTableCell>Duración</MuiTableCell>
                <MuiTableCell>Cant. Votos</MuiTableCell>
              </Hidden>
              <MuiTableCell>Votar</MuiTableCell>
            </TableRow>
          </TableHead>
          <TableBody>{_renderPlaylistList(playlistSongs)}</TableBody>
        </Table>
      </TableContainer>
    );
  };

  const _renderPlaylistList = (listSongs) => {
    listSongs.sort((songX, songY) => songY.votes - songX.votes);

    return listSongs.map((song) => (
      <TableRow key={`result-${song.uuid}`}>
        <TableCell component="th" scope="row">
          <Grid container direction="row" alignItems="center" wrap="nowrap">
            <Hidden xsDown>
              <Grid item>
                <Box pr={2}>
                  <Avatar
                    alt={`Foto de ${song.artist}`}
                    src={song.artist.coverUrl}
                  />
                </Box>
              </Grid>
            </Hidden>

            <Grid item>
              <Typography noWrap>{song.name}</Typography>
            </Grid>
          </Grid>
        </TableCell>
        <TableCell>{song.artist.name}</TableCell>
        <Hidden xsDown>
          <TableCell>{song.duration}</TableCell>
          <TableCell>{song.votes}</TableCell>
        </Hidden>
        <TableCell>
          <Grid container>
            <Grid item>
              <IconButton
                aria-label="Votar +1"
                onClick={() => handleVoteSong(song, 1)}
                color="inherit"
              >
                <ThumbUp
                  color={
                    !song.yourVote
                      ? "inherit"
                      : song.yourVote === 1
                      ? "primary"
                      : "inherit"
                  }
                />
              </IconButton>
            </Grid>
            <Hidden xsDown>
              <Grid item>
                <IconButton
                  aria-label="Votar -1"
                  onClick={() => handleVoteSong(song, -1)}
                  color="inherit"
                >
                  <ThumbDown
                    color={
                      !song.yourVote
                        ? "inherit"
                        : song.yourVote === -1
                        ? "secondary"
                        : "inherit"
                    }
                  />
                </IconButton>
              </Grid>
            </Hidden>
          </Grid>
        </TableCell>
      </TableRow>
    ));
  };

  const handleInputSearch = (e) => {
    setInputSearchValue(e.target.value);
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const songsFounded = searchSong(inputSearchValue);
      setSearchResults(songsFounded);
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [inputSearchValue]);

  const searchSong = (inputValue) => {
    if (!inputValue) return [];
    return songData.filter(
      (song) =>
        song.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        song.artist.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        song.album.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const handleAddSong = (song) => {
    setPlaylistSongs((oldPlaylist) => [...oldPlaylist, song]);
  };

  const handleRemoveSong = (song) => {
    setPlaylistSongs((oldPlaylist) =>
      oldPlaylist.filter((songItem) => songItem.uuid !== song.uuid)
    );
  };

  const handleVoteSong = (song, vote) => {
    const newPlaylist = [...playlistSongs];
    const index = newPlaylist.indexOf(song);

    // If user din't voted
    if (!song.yourVote) {
      newPlaylist[index].yourVote = vote;
      newPlaylist[index].votes += vote;
    } else if (song.yourVote === vote) {
      // if you voted twice with the same vote -> cancel the vote
      newPlaylist[index].yourVote = 0;
      newPlaylist[index].votes -= vote;
    } else {
      // you voted with different vote
      newPlaylist[index].yourVote = vote;

      vote *= 2;
      newPlaylist[index].votes += vote;
    }
    setPlaylistSongs(newPlaylist);
  };

  return (
    <Grid container justify="center" className={classes.app}>
      {/* Search input */}
      <Grid item xs={10} sm={5}>
        <TextField
          className={classes.textField}
          id="input-song"
          label="Buscar"
          type="text"
          variant="outlined"
          onChange={handleInputSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Grid>

      {/* Results of search table */}
      <Grid item xs={12} sm={10} className={classes.mb2}>
        <Box width="100%" borderRadius={4} className={classes.box}>
          <Box p={2}>{_renderSearchTable()}</Box>
        </Box>
      </Grid>

      {/* Playlist table */}
      <Grid item xs={12} sm={10}>
        <Box width="100%" borderRadius={4} className={classes.box}>
          <Box p={2}>{_renderPlaylistTable()}</Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default PlaylistCreator;
