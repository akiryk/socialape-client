import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';

class Home extends Component {
  componentDidMount() {}

  render() {
    return (
      <Grid container spacing={16}>
        <Grid item sm={8} xs={12}>
          <h2>Content</h2>
        </Grid>
        <Grid item sm={4} xs={12}>
          <h2>Profile</h2>
        </Grid>
      </Grid>
    );
  }
}

export default Home;
