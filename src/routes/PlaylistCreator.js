import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Container, Box, Typography, TextField } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useLocalStorage } from "../database/useLocalStorage";

const useStyles = makeStyles((theme) => ({
  app: {
    height: "100%",
    display: "flex",
    width: "100%",
    // [theme.breakpoints.up("sm")]: {
    //   padding: theme.spacing(3),
    // },
  },
  box: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#FFF",
    margin: "auto",
  },
  textField: {
    margin: theme.spacing(2),
    width: "100%",
  },
  buttonLogin: {
    marginTop: theme.spacing(2),
  },
  textDontHaveAccount: {
    color: "#C4C4C4",
  },
}));

const PlaylistCreator = () => {
  const classes = useStyles();
  const history = useHistory();
  const [loggedUser, setLoggedUser] = useLocalStorage();

  const logout = () => {
    setLoggedUser("");
    history.push("");
  };

  return (
    <Container className={classes.app} maxWidth="md">
      <Box width="100%" className={classes.box} p={{ xs: 10, sm: 10 }}>
        <Typography variant="h5" gutterBottom>
          Soy {loggedUser.email}
        </Typography>

        <TextField
          className={classes.textField}
          id="email"
          label="Correo electrónico"
          type="email"
          variant="outlined"
          onFocus={logout}
        />
        <TextField
          className={classes.textField}
          id="password"
          label="Contraseña"
          type="password"
          autoComplete="current-password"
          variant="outlined"
        />

        <Box mt={2} mb={1}>
          <Typography
            className={classes.textDontHaveAccount}
            variant="button"
            display="block"
            gutterBottom
          >
            ¿No tienes cuenta?
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default PlaylistCreator;
