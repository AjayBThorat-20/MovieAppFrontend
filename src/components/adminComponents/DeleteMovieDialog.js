import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Button, Typography
} from '@mui/material';

const DeleteMovieDialog = ({ open, onClose, onDelete, movieName }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <Typography>
          Are you sure you want to delete the movie{' '}
          <strong>{movieName}</strong>?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>No</Button>
        <Button onClick={onDelete} variant="contained" color="error">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteMovieDialog;
