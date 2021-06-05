import React from "react";
import {
  Typography,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
} from "@material-ui/core/";
import useStyles from "../../styles/confirmationModal";
import {
	getIsMobile
} from '../../utils/localstorage';

const ConfirmationModal = (props) => {
  const classes = useStyles();
  const isMobile = getIsMobile();
  const {
    title,
    description,
    okButton,
    okHandler,
    cancelButton,
    cancelHandler,
  } = props;

  return (
    <React.Fragment>
      <DialogContent className={classes.heading}>
        <Typography variant="h5" component="h5">
          {title}
        </Typography>
        <Typography variant="h4" color="primary"component="h4" style={{textTransform:"uppercase"}}>
          {description}
        </Typography>
      </DialogContent>

      <Divider className={classes.divider} />
      <DialogActions className={classes.actionButtons}>
        <Button
          onClick={okHandler}
          variant="contained"
          className={classes.okButton}
          size="large"
        >
          {okButton}
        </Button>
        <Button
          onClick={cancelHandler}
          color="primary"
          variant="outlined"
          className={classes.cancelButton}
          size="large"
        >
          {cancelButton}
        </Button>
      </DialogActions>
    </React.Fragment>
  );
};

export default ConfirmationModal;
