import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import axios from 'axios';
import StatusModal from '../comman/StatusModal';

const AddMovie = ({ open, onClose, onMovieAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    rating: '',
    releaseDate: '',
    duration: ''
  });
  const [error, setError] = useState('');
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusSuccess, setStatusSuccess] = useState(false); // to track success/failure

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.name || !formData.description || !formData.rating || 
        !formData.releaseDate || !formData.duration) {
      setError('All fields are required');
      return false;
    }
    if (isNaN(formData.rating) || formData.rating < 0 || formData.rating > 10) {
      setError('Rating must be between 0 and 10');
      return false;
    }
    if (!formData.duration.match(/^\d+h \d+m$/)) {
      setError('Duration must be in format: "2h 30m"');
      return false;
    }
    return true;
  };

  const handleAddMovie = async () => {
    try {
      if (!validateForm()) return;

      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication required');
        return;
      }

      const preparedData = {
        ...formData,
        rating: Number(formData.rating),
        releaseDate: new Date(formData.releaseDate).toISOString()
      };

      await axios.post(
        `${process.env.REACT_APP_API_URL}/movies`, 
        preparedData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      onMovieAdded();
      onClose();
      setStatusSuccess(true);
      setStatusMessage('Movie added successfully!');
    } catch (err) {
      console.error('Error adding movie:', err);
      setStatusSuccess(false);
      setStatusMessage(err.response?.data?.message || 'Error adding movie');
    } finally {
      setStatusModalOpen(true);
      // Reset form
      setFormData({
        name: '',
        description: '',
        rating: '',
        releaseDate: '',
        duration: ''
      });
      setError('');
    }
  };

  const handleStatusModalClose = () => {
    setStatusModalOpen(false);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add Movie</DialogTitle>
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
            label="Duration"
            name="duration"
            value={formData.duration}
            onChange={handleFormChange}
            helperText="Format: 2h 30m"
            required
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={handleAddMovie} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>

      <StatusModal
        open={statusModalOpen}
        onClose={handleStatusModalClose}
        success={statusSuccess}
        message={statusMessage}
      />
    </>
  );
};

export default AddMovie;
