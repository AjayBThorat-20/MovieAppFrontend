// import React, { useState, useEffect } from 'react';
// import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
// import axios from 'axios';
// import StatusModal from '../comman/StatusModal';

// const formatDateForInput = (dateString) => {
//   const date = new Date(dateString);
//   return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
// };

// const UpdateMovie = ({ open, onClose, movie, onMovieUpdated }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     description: '',
//     rating: '',
//     releaseDate: '',
//     duration: ''
//   });
//   const [error, setError] = useState('');
//   const [statusModalOpen, setStatusModalOpen] = useState(false); // State for StatusModal
//   const [statusSuccess, setStatusSuccess] = useState(true); // Whether the operation was successful
//   const [statusMessage, setStatusMessage] = useState(''); // Status message

//   useEffect(() => {
//     if (movie) {
//       setFormData({
//         name: movie.name,
//         description: movie.description,
//         rating: movie.rating,
//         releaseDate: formatDateForInput(movie.releaseDate),
//         duration: movie.duration
//       });
//     }
//   }, [movie]);

//   const handleFormChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const validateForm = () => {
//     if (!formData.name || !formData.description || !formData.rating || 
//         !formData.releaseDate || !formData.duration) {
//       setError('All fields are required');
//       return false;
//     }
//     if (isNaN(formData.rating) || formData.rating < 0 || formData.rating > 10) {
//       setError('Rating must be between 0 and 10');
//       return false;
//     }
//     return true;
//   };

//   const handleUpdateMovie = async () => {
//     try {
//       if (!validateForm()) return;

//       const token = localStorage.getItem('token');
//       if (!token) {
//         setError('Authentication required');
//         return;
//       }

//       await axios.put(
//         `${process.env.REACT_APP_API_URL}/movies/${movie._id}`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );
      
//       setStatusSuccess(true);
//       setStatusMessage('Movie updated successfully');
//       setStatusModalOpen(true); // Open the status modal on success
//       onMovieUpdated();
//       onClose();
//     } catch (err) {
//       console.error('Error updating movie:', err);
//       setStatusSuccess(false);
//       setStatusMessage(err.response?.data?.message || 'Error updating movie');
//       setStatusModalOpen(true); // Open the status modal on error
//     }
//   };

//   return (
//     <>
//       <Dialog open={open} onClose={onClose}>
//         <DialogTitle>Edit Movie</DialogTitle>
//         <DialogContent>
//           {error && (
//             <div style={{ color: 'red', marginBottom: '10px' }}>
//               {error}
//             </div>
//           )}
//           <TextField
//             fullWidth
//             margin="dense"
//             label="Name"
//             name="name"
//             value={formData.name}
//             onChange={handleFormChange}
//             required
//           />
//           <TextField
//             fullWidth
//             margin="dense"
//             label="Description"
//             name="description"
//             value={formData.description}
//             onChange={handleFormChange}
//             multiline
//             rows={3}
//             required
//           />
//           <TextField
//             fullWidth
//             margin="dense"
//             label="Rating"
//             name="rating"
//             type="number"
//             inputProps={{ min: 0, max: 10, step: 0.1 }}
//             value={formData.rating}
//             onChange={handleFormChange}
//             required
//           />
//           <TextField
//             fullWidth
//             margin="dense"
//             label="Release Date"
//             name="releaseDate"
//             type="date"
//             value={formData.releaseDate}
//             onChange={handleFormChange}
//             InputLabelProps={{
//               shrink: true,
//             }}
//             required
//           />
//           <TextField
//             fullWidth
//             margin="dense"
//             label="Duration (e.g., 2h 30m)"
//             name="duration"
//             value={formData.duration}
//             onChange={handleFormChange}
//             helperText="Format: 2h 30m"
//             required
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={onClose}>Cancel</Button>
//           <Button variant="contained" onClick={handleUpdateMovie} color="primary">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Status Modal for success/error */}
//       <StatusModal 
//         open={statusModalOpen} 
//         onClose={() => setStatusModalOpen(false)} 
//         success={statusSuccess} 
//         message={statusMessage} 
//       />
//     </>
//   );
// };

// export default UpdateMovie;









import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import axios from 'axios';
import StatusModal from '../comman/StatusModal';

const formatDateForInput = (dateString) => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
};

const UpdateMovie = ({ open, onClose, movie, onMovieUpdated }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    rating: '',
    releaseDate: '',
    duration: ''
  });
  const [error, setError] = useState('');
  const [statusModalOpen, setStatusModalOpen] = useState(false); // State for StatusModal
  const [statusSuccess, setStatusSuccess] = useState(true); // Whether the operation was successful
  const [statusMessage, setStatusMessage] = useState(''); // Status message

  useEffect(() => {
    if (movie) {
      setFormData({
        name: movie.name,
        description: movie.description,
        rating: movie.rating,
        releaseDate: formatDateForInput(movie.releaseDate),
        duration: movie.duration
      });
    }
  }, [movie]);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate form fields
  const validateForm = () => {
    if (!formData.name || !formData.description || !formData.rating || 
        !formData.releaseDate || !formData.duration) {
      setError('All fields are required');
      return false;
    }

    // Rating validation: Ensure it's a number between 0 and 10
    if (isNaN(formData.rating) || formData.rating < 0 || formData.rating > 10) {
      setError('Rating must be between 0 and 10');
      return false;
    }

    // Duration validation: Ensure format is "2h 30m"
    const durationRegex = /^\d+h \d+m$/;
    if (!formData.duration.match(durationRegex)) {
      setError('Duration must be in format: "2h 30m"');
      return false;
    }

    // Release Date validation: Ensure it's a valid date
    const releaseDate = new Date(formData.releaseDate);
    if (isNaN(releaseDate)) {
      setError('Invalid release date');
      return false;
    }

    // Reset error if form is valid
    setError('');
    return true;
  };

  const handleUpdateMovie = async () => {
    try {
      if (!validateForm()) return;

      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication required');
        return;
      }

      await axios.put(
        `${process.env.REACT_APP_API_URL}/movies/${movie._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      setStatusSuccess(true);
      setStatusMessage('Movie updated successfully');
      setStatusModalOpen(true); // Open the status modal on success
      onMovieUpdated();
      onClose();
    } catch (err) {
      console.error('Error updating movie:', err);
      setStatusSuccess(false);
      setStatusMessage(err.response?.data?.message || 'Error updating movie');
      setStatusModalOpen(true); // Open the status modal on error
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Edit Movie</DialogTitle>
        <DialogContent>
          {error && (
            <div style={{ color: 'red', marginBottom: '10px' }}>
              {error}
            </div>
          )}
          <TextField
            fullWidth
            margin="dense"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleFormChange}
            required
          />
          <TextField
            fullWidth
            margin="dense"
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleFormChange}
            multiline
            rows={3}
            required
          />
          <TextField
            fullWidth
            margin="dense"
            label="Rating"
            name="rating"
            type="number"
            inputProps={{ min: 0, max: 10, step: 0.1 }}
            value={formData.rating}
            onChange={handleFormChange}
            required
          />
          <TextField
            fullWidth
            margin="dense"
            label="Release Date"
            name="releaseDate"
            type="date"
            value={formData.releaseDate}
            onChange={handleFormChange}
            InputLabelProps={{
              shrink: true,
            }}
            required
          />
          <TextField
            fullWidth
            margin="dense"
            label="Duration (e.g., 2h 30m)"
            name="duration"
            value={formData.duration}
            onChange={handleFormChange}
            helperText="Format: 2h 30m"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdateMovie} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Status Modal for success/error */}
      <StatusModal 
        open={statusModalOpen} 
        onClose={() => setStatusModalOpen(false)} 
        success={statusSuccess} 
        message={statusMessage} 
      />
    </>
  );
};

export default UpdateMovie;
