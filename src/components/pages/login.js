import React, { Component } from 'react';
import axios from 'axios';
import { Grid, TextField, Button, CircularProgress } from '@material-ui/core/';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';

const validFormFields = {
  email: 'email',
  password: 'password'
};

const styles = theme => ({
  ...theme
});

class Login extends Component {
  state = {
    email: '',
    password: '',
    formIsReady: false,
    loading: false,
    errors: {}
  };

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    this.setState({
      loading: true
    });
    axios
      .post('/login', {
        email,
        password
      })
      .then(res => {
        localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
        this.setState({
          loading: false
        });
        this.props.history.push('/');
      })
      .catch(err => {
        this.setState(prev => ({
          errors: { ...prev.errors, ...err.response.data },
          formIsReady: true,
          loading: false
        }));
      });
  };

  handleFormChange = e => {
    if (!validFormFields[e.target.id]) {
      return;
    }

    this.setState(
      {
        [e.target.id]: e.target.value
      },
      () => {
        if (this.state.email && this.state.password) {
          this.setState({
            formIsReady: true
          });
        }
      }
    );
  };

  render() {
    return (
      <Grid container>
        <Grid item sm />
        <Grid item sm>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              fullWidth
              id="email"
              label="email"
              type="text"
              onChange={this.handleFormChange}
              value={this.state.email}
              error={this.state.errors.email ? true : false}
            />
            <TextField
              id="password"
              fullWidth
              label="Password"
              type="password"
              onChange={this.handleFormChange}
              error={this.state.errors.password ? true : false}
              value={this.state.password}
            />
            {this.state.errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!this.state.formIsReady || this.state.loading}
            >
              Login
              {this.state.loading && <CircularProgress size={30} />}
            </Button>
            <br />
            <small>
              dont have an account ? sign up <Link to="/signup">here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}

export default Login;
