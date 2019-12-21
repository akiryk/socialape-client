import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import home from './components/pages/home';
import login from './components/pages/login';
import signup from './components/pages/signup';
import NavBar from './components/navbar';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import createTheme from '@material-ui/core/styles/createMuiTheme';
import themeObject from './util/theme';

const theme = createTheme(themeObject);
function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <NavBar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={home} />
            <Route exact path="/login" component={login} />
            <Route exact path="/signup" component={signup} />
          </Switch>
        </div>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
