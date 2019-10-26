import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
// https://medium.freecodecamp.org/how-to-show-informational-messages-using-material-ui-in-a-react-web-app-5b108178608
const styles = theme => ({
  close: {
    padding: theme.spacing.unit / 2,
  },
});

let openDialogFn;

class MessageDialog extends React.Component {
  state = {
    open: false,
    message: '',
  };
  
    componentDidMount() {
    openDialogFn = this.openDialog;
  }
  
  openDialog = ({ message }) => {
    this.setState({
      open: true,
      message,
    });
  };

  handleClick = () => {
    this.setState({ open: false });
  };
  
  handleClose = (event, reason) => {
	    if (reason === 'clickaway') {
	      return;
	    }

	    this.setState({ open: false });
  };
  // https://stackoverflow.com/questions/44121069/how-to-pass-params-with-history-push-in-react-router-v4
  render() {
    const { classes } = this.props;
    return (
    	      <div>
    	        <Snackbar
    	          anchorOrigin={{
    	            vertical: 'bottom',
    	            horizontal: 'left',
    	          }}
    	          open={this.state.open}
    	          autoHideDuration={6000}
    	          onClose={this.handleClose}
    	          ContentProps={{
    	            'aria-describedby': 'message-id',
    	          }}
    	          message={<span id="message-id">{this.state.message}</span>}
    	          action={[
    	            <IconButton
    	              key="close"
    	              aria-label="Close"
    	              color="inherit"
    	              className={classes.close}
    	              onClick={this.handleClose}
    	            >
    	              <CloseIcon />
    	            </IconButton>,
    	          ]}
    	        />
    	      </div>
    );
  }
}

MessageDialog.propTypes = {
  classes: PropTypes.object.isRequired,
};

export function openDialog({ message }) {
  openDialogFn({ message });
}

export default withStyles(styles)(MessageDialog);