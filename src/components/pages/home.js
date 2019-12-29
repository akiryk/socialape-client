import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Scream from '../scream/scream';
import axios from 'axios';

class Home extends Component {
  state = {
    screams: []
  };
  componentDidMount() {
    axios
      .get('/screams')
      .then(res => {
        console.log(res.data);
        return this.setState({ screams: res.data });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {this.state.screams.length > 0 ? (
            <>
              <h2>Content</h2>
              {this.state.screams.map(scream => (
                <div key={scream.screamId}>
                  <Scream
                    body={scream.body}
                    userHandle={scream.userHandle}
                    userImage={scream.userImage}
                  />
                </div>
              ))}
            </>
          ) : (
            <p>Loading...</p>
          )}
        </Grid>
        <Grid item sm={4} xs={12}>
          <h2>Profile</h2>
        </Grid>
      </Grid>
    );
  }
}

export default Home;
