import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

const validFormFields = {
  email: 'email',
  password: 'password'
};

class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      handle: '',
      errors: {},
      loading: false,
      redirect: false
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      loading: true
    });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle
    };
    axios.post('/signup', newUserData).then(res => {
      console.log(res.data);
      localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
      this.setState({
        loading: false,
        redirect: true
      });
    });
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    const { errors } = this.state;
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <>
        <h2>SignUp</h2>
        <form noValidate onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              label="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              value={this.state.confirmPassword}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="handle">User Name</label>
            <input
              id="handle"
              name="handle"
              type="text"
              label="Handle"
              value={this.state.handle}
              onChange={this.handleChange}
            />
          </div>
          {errors.general && <p>{errors.general}</p>}
          <button disabled={this.state.loading}>
            SignUp
            {this.state.loading && <p>Loading...</p>}
          </button>
          <small>
            Already have an account ? Login <Link to="/login">here</Link>
          </small>
        </form>
      </>
    );
  }
}

export default signup;
