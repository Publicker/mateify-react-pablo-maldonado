import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useLocalStorage } from "../database/useLocalStorage";
import userData from "../database/userData.json";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Snackbar,
} from "@material-ui/core";

import Alert from "@material-ui/lab/Alert";

import { Lock } from "@material-ui/icons";

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
  w100: {
    width: "100%",
  },
  textDontHaveAccount: {
    color: "#C4C4C4",
  },
  lock: {
    color: "#FFF",
    backgroundColor: theme.palette.secondary.main,
    borderRadius: "50%",
    padding: "1%",
  },
  // margin: {
  //   margin: theme.spacing(1),
  // },
}));

const Login = () => {
  const classes = useStyles();
  const history = useHistory();

  const [loggedUser, setLoggedUser] = useLocalStorage();

  const [userMail, setUserMail] = useState("test@email.com");
  const [userPass, setUserPass] = useState("Passw0rd");

  const [errorLogin, setErrorLogin] = useState(false);

  useEffect(() => {
    if (loggedUser) {
      history.push("/playlist-creator");
    }
  }, [loggedUser, history]);

  const handleLogin = () => {
    const userToSignIn = userData.find(
      (user) => user.email === userMail && user.password === userPass
    );

    if (userToSignIn) {
      setLoggedUser(userToSignIn);
      history.push("/playlist-creator");
    } else {
      setErrorLogin(true);
    }
  };

  const handleInputMail = (e) => {
    setUserMail(e.target.value);
  };

  const handleInputPassword = (e) => {
    setUserPass(e.target.value);
  };

  const handleCloseErrorLogin = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorLogin(false);
  };

  return (
    <Container className={classes.app} maxWidth="md">
      <Box width="100%" className={classes.box} p={{ xs: 10, sm: 10 }}>
        <Lock className={classes.lock} />
        <Typography variant="h5" gutterBottom>
          Ingresar
        </Typography>

        <TextField
          className={classes.textField}
          id="email"
          label="Correo electrónico"
          type="email"
          variant="outlined"
          value={userMail}
          onChange={handleInputMail}
        />
        <TextField
          className={classes.textField}
          id="password"
          label="Contraseña"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          value={userPass}
          onChange={handleInputPassword}
        />
        <Button
          className={classes.buttonLogin}
          variant="contained"
          fullWidth
          color="secondary"
          onClick={handleLogin}
        >
          Comenzar a crear playlists
        </Button>

        <Box m={2}>
          <Button color="primary">¿Has olvidado la contraseña?</Button>
        </Box>
        <Divider className={classes.w100} />
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

        <Box width="50%">
          <Button fullWidth variant="outlined" color="primary">
            Registrate
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={errorLogin}
        autoHideDuration={6000}
        onClose={handleCloseErrorLogin}
      >
        <Alert onClose={handleCloseErrorLogin} severity="error">
          Usuario y/o contraseña incorrectos
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
