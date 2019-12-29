import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import home from './components/pages/home';
import login from './components/pages/login';
import signup from './components/pages/signup';
import NavBar from './components/navbar';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createTheme from '@material-ui/core/styles/createMuiTheme';
import themeObject from './util/theme';
import jwtDecode from 'jwt-decode';
import AuthRoute from './util/auth_route';
import axios from 'axios';

const token = localStorage?.getItem('FBIdToken');
let authenticated;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 > Date.now()) {
    authenticated = true;
  }
}

const handleLogout = () => {
  localStorage.removeItem('FBIdToken');
  delete axios.defaults.headers.common['Authorization'];
  window.location.href = '/';
};

const theme = createTheme(themeObject);

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <NavBar onLogout={handleLogout} authenticated={authenticated} />
        <div className="container">
          <Switch>
            <Route exact path="/" component={home} />
            <AuthRoute
              authenticated={authenticated}
              exact
              path="/login"
              component={login}
            />
            <AuthRoute
              authenticated={authenticated}
              exact
              path="/signup"
              component={signup}
            />
          </Switch>
        </div>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
