import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Divider,
} from "@material-ui/core";
import { Lock } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  app: {
    height: "100%",
    display: "flex",
    width: "100%",
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

  return (
    <Container className={classes.app} maxWidth="md">
      <Box width="100%" className={classes.box} p={10}>
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
        />
        <TextField
          className={classes.textField}
          id="password"
          label="Contraseña"
          type="password"
          autoComplete="current-password"
          variant="outlined"
        />
        <Button
          className={classes.buttonLogin}
          variant="contained"
          fullWidth
          color="secondary"
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
    </Container>
  );
};

export default Login;
