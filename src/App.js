import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  MuiThemeProvider,
  createMuiTheme,
  makeStyles,
} from "@material-ui/core/styles";
import { teal } from "@material-ui/core/colors";
import { CustomAppBar } from "./components/CustomAppBar";
import { Login, PlaylistCreator } from "./routes";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      backgroundColor: "#E5E5E5",
      height: "100%",
    },
    aaa: {
      height: "200px",
    },
    customApp: {
      height: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`,
      paddingTop: theme.mixins.toolbar.minHeight,
      // eslint-disable-next-line
      ["@media (min-width:0px) and (orientation: landscape)"]: {
        height: `calc(100% - ${theme.mixins.toolbar["@media (min-width:0px) and (orientation: landscape)"].minHeight}px)`,
        paddingTop:
          theme.mixins.toolbar[
            "@media (min-width:0px) and (orientation: landscape)"
          ].minHeight,
      },
      // eslint-disable-next-line
      ["@media (min-width:600px)"]: {
        height: `calc(100% - ${theme.mixins.toolbar["@media (min-width:600px)"].minHeight}px)`,
        paddingTop: theme.mixins.toolbar["@media (min-width:600px)"].minHeight,
      },
    },
  };
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: teal[500],
    },
  },
});

function App() {
  const classes = useStyles();

  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <div className={classes.root}>
          <CustomAppBar />
          <div className={classes.customApp}>
            <Switch>
              <Route path="/playlist-creator">
                <PlaylistCreator />
              </Route>
              <Route path="/">
                <Login />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
