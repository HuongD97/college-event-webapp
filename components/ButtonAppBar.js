import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

function ButtonAppBar(props) {
    const { classes } = props;
    const buttons = {};
    return (
      <div className={classes.root}>
          <AppBar position="static">
              <Toolbar>
                  <Button color="inherit">Create RSO</Button>
                  <Button color="inherit">My RSOs</Button>
                  <Button color="inherit">RSOs</Button>
                  <Button color="inherit">Events</Button>
                  <Button color="inherit">Create Event</Button>
                  <Button color="inherit">Sign Out</Button>
              </Toolbar>
          </AppBar>
      </div>
    );
}

ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
    role: PropTypes.string.isRequired
};

export default withStyles(styles)(ButtonAppBar);
