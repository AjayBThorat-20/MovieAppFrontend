import React from 'react';
import { Modal, Box, Typography, Backdrop, Fade, IconButton, useMediaQuery } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const MovieDetailsModal = ({ open, onClose, movie }) => {
  // Responsive design for modal width
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery((theme) => theme.breakpoints.between('sm', 'md'));

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: isMobile ? '90%' : isTablet ? '75%' : 600, // Adjust width for mobile, tablet, and desktop
            maxWidth: 800, // Maximum width for larger screens
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: isMobile ? 2 : 4, // Adjust padding for mobile and larger screens
            borderRadius: 2,
            outline: 'none',
            maxHeight: '90vh', // Prevent overflow
            overflowY: 'auto', // Allow scrolling on small screens if content overflows
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: 'grey.600',
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Modal Content */}
          {movie ? (
            <>
              <Typography variant={isMobile ? 'h6' : 'h5'} gutterBottom>
                <strong>Title:</strong> {movie.name}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Rating:</strong> {movie.rating} / 10
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Description:</strong> {movie.description}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Release Date:</strong> {new Date(movie.releaseDate).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" gutterBottom>
                <strong>Duration:</strong> {movie.duration} minutes
              </Typography>
            </>
          ) : (
            <Typography variant="body2">No details available.</Typography>
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

export default MovieDetailsModal;
