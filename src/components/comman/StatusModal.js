import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const StatusModal = ({ open, onClose, success, message }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{success ? 'Success' : 'Failed'}</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color={success ? 'primary' : 'error'}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StatusModal;
