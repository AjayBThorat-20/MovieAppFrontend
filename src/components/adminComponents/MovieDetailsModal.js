// // components/MovieDetailsModal.js
// import React from 'react';
// import { Modal, Box, Typography, Backdrop, Fade } from '@mui/material';

// const MovieDetailsModal = ({ open, onClose, movie }) => {
//   return (
//     <Modal
//       open={open}
//       onClose={onClose}
//       closeAfterTransition
//       BackdropComponent={Backdrop}
//       BackdropProps={{
//         timeout: 500,
//       }}
//     >
//       <Fade in={open}>
//         <Box
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             width: 400,
//             bgcolor: 'background.paper',
//             border: '2px solid #000',
//             boxShadow: 24,
//             p: 4,
//             borderRadius: 2,
//           }}
//         >
//           {movie ? (
//             <>
//               <Typography variant="h6" gutterBottom>
//                 {movie.name}
//               </Typography>
//               <Typography variant="body2" gutterBottom>
//                 <strong>Rating:</strong> {movie.rating} / 10
//               </Typography>
//               <Typography variant="body2" gutterBottom>
//                 <strong>Description:</strong> {movie.description}
//               </Typography>
//               <Typography variant="body2" gutterBottom>
//                 <strong>Release Date:</strong> {new Date(movie.releaseDate).toLocaleDateString()}
//               </Typography>
//               <Typography variant="body2" gutterBottom>
//                 <strong>Duration:</strong> {movie.duration} minutes
//               </Typography>
//             </>
//           ) : (
//             <Typography variant="body2">No details available.</Typography>
//           )}
//         </Box>
//       </Fade>
//     </Modal>
//   );
// };

// export default MovieDetailsModal;








import React from 'react';
import { Modal, Box, Typography, Backdrop, Fade, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const MovieDetailsModal = ({ open, onClose, movie }) => {
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
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            outline: 'none',
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
              <Typography variant="h6" gutterBottom>
              <strong>Title:</strong>  {movie.name}
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
