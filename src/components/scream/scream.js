import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const styles = {
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: 20
  },
  image: {
    minWidth: 200
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  }
};

class Scream extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      body,
      userImage,
      userHandle,
      screamId,
      likeCount,
      commentCount
    } = this.props;

    return (
      <Card className={classes.card}>
        <CardMedia
          image={userImage}
          title="Profile image"
          className={classes.image}
        />
        <CardContent className={classes.details}>
          <Typography
            variant="h5"
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
          >
            {userHandle}
          </Typography>

          <Typography variant="body1">{body}</Typography>
          <span>{likeCount} Likes</span>
          <span>{commentCount} comments</span>
        </CardContent>
      </Card>
    );
  }
}

Scream.propTypes = {
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};

export default withStyles(styles)(Scream);
