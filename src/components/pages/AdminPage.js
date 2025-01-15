import React, { useState, useEffect } from 'react';
import {
  Container, Typography, Box, Paper, Button,
  Grid, CircularProgress, Rating, IconButton, Pagination,
  TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import {  InfoIcon, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { X as CloseIcon, Edit, Delete, PlusCircle } from 'lucide-react';
import axios from 'axios';
import AddMovie from '../adminComponents/AddMovie';
import UpdateMovie from '../adminComponents/UpdateMovie';
import DeleteMovieDialog from '../adminComponents/DeleteMovieDialog';
import Header from '../adminComponents/Header';
import MovieDetailsModal from '../adminComponents/MovieDetailsModal';

const AdminPage = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSort, setActiveSort] = useState({ field: '', direction: '' });
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  // const [selectedMovie, setSelectedMovie] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const API_URL = `${process.env.REACT_APP_API_URL}/movies/`;

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page,
        limit: 8,
      });

      if (searchQuery) {
        params.append('query', searchQuery);
      }

      if (activeSort.field && activeSort.direction) {
        params.append('sortBy', `${activeSort.field}-${activeSort.direction}`);
      }

      const response = await axios.get(`${API_URL}?${params.toString()}`);
      setMovies(response.data.movies);
      setTotalPages(response.data.totalPages);
      setError('');
    } catch (err) {
      setError('Failed to fetch movies');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [page, activeSort, searchQuery]);

  const handleSortChange = (field, value) => {
    if (value === '') {
      setActiveSort({ field: '', direction: '' });
    } else {
      setActiveSort({ field, direction: value });
    }
    setPage(1);
  };

  const handleSearch = () => {
    setPage(1);
    fetchMovies();
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setPage(1);
  };

  const handleReset = () => {
    setActiveSort({ field: '', direction: '' });
    setPage(1);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const openAddDialog = () => setAddDialogOpen(true);
  const closeAddDialog = () => setAddDialogOpen(false);

  const openUpdateDialog = (movie) => {
    setSelectedMovie(movie);
    setUpdateDialogOpen(true);
  };
  const closeUpdateDialog = () => {
    setSelectedMovie(null);
    setUpdateDialogOpen(false);
  };

  const openDeleteDialog = (movie) => {
    setSelectedMovie(movie);
    setDeleteDialogOpen(true);
  };
  const closeDeleteDialog = () => {
    setSelectedMovie(null);
    setDeleteDialogOpen(false);
  };

  const handleMovieModalClick = (movie) => {
    setSelectedMovie(movie);
    setModalOpen(true);
  };

  const closeMovieModal = () => {
    setModalOpen(false);
    setSelectedMovie(null);
  };


  const handleDeleteMovie = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found');
        navigate('/login');
        return;
      }

      await axios.delete(`${API_URL}/${selectedMovie._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchMovies();
      closeDeleteDialog();
    } catch (err) {
      setError('Failed to delete movie');
      console.error(err);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const isSelectDisabled = (field) => {
    return activeSort.field !== '' && activeSort.field !== field;
  };

  const getCurrentSort = (field) => {
    return activeSort.field === field ? activeSort.direction : '';
  };

 
  return  (
    <Box sx={{ flexGrow: 1 }}>
      <Header onLogout={handleLogout} /> {/* Use the Header component */}

      <Container maxWidth="lg" sx={{ mt: 4 }}>

      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Search Movies"
                variant="outlined"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {searchQuery && (
                        <IconButton
                          onClick={handleClearSearch}
                          edge="end"
                          size="small"
                        >
                          <CloseIcon size={16} />
                        </IconButton>
                      )}
                      <IconButton
                        onClick={handleSearch}
                        edge="end"
                        size="small"
                        sx={{ ml: 1 }}
                      >
                        <SearchIcon size={16} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth>
                  <InputLabel>Sort by Name</InputLabel>
                  <Select
                    value={getCurrentSort('name')}
                    onChange={(e) => handleSortChange('name', e.target.value)}
                    label="Sort by Name"
                    disabled={isSelectDisabled('name')}
                  >
                    {/* <MenuItem value="">None</MenuItem> */}
                    <MenuItem value="asc">A to Z</MenuItem>
                    <MenuItem value="desc">Z to A</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth>
                  <InputLabel>Sort by Rating</InputLabel>
                  <Select
                    value={getCurrentSort('rating')}
                    onChange={(e) => handleSortChange('rating', e.target.value)}
                    label="Sort by Rating"
                    disabled={isSelectDisabled('rating')}
                  >
                    {/* <MenuItem value="">None</MenuItem> */}
                    <MenuItem value="desc">Highest First</MenuItem>
                    <MenuItem value="asc">Lowest First</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth>
                  <InputLabel>Sort by Duration</InputLabel>
                  <Select
                    value={getCurrentSort('duration')}
                    onChange={(e) => handleSortChange('duration', e.target.value)}
                    label="Sort by Duration"
                    disabled={isSelectDisabled('duration')}
                  >
                    {/* <MenuItem value="">None</MenuItem> */}
                    <MenuItem value="desc">Longest First</MenuItem>
                    <MenuItem value="asc">Shortest First</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={2}>
                <FormControl fullWidth>
                  <InputLabel>Sort by Release Date</InputLabel>
                  <Select
                    value={getCurrentSort('releaseDate')}
                    onChange={(e) => handleSortChange('releaseDate', e.target.value)}
                    label="Sort by Release Date"
                    disabled={isSelectDisabled('releaseDate')}
                  >
                    <MenuItem value="desc">Latest First</MenuItem>
                    <MenuItem value="asc">Oldest First</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6} md={2}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={handleReset}
                  startIcon={<RotateCcw size={16} />}
                  disabled={!activeSort.field}
                >
                  Reset Sorting
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>


        <Box display="flex" justifyContent="flex-end" sx={{ mb: 2 }}>
          <Button
            variant="contained"
            startIcon={<PlusCircle />}
            onClick={openAddDialog}
          >
            Add Movie
          </Button>
        </Box>

        {loading ? (
          <Box display="flex" justifyContent="center" sx={{ my: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Grid container spacing={3}>
              {movies.map((movie) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={movie._id}>
                  <Paper elevation={3} sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      {/* {movie.name} */}
                      {movie.name.length > 15 ? `${movie.name.slice(0, 15)}...` : movie.name}
                    </Typography>
                    <Rating
                      value={movie.rating / 2}
                      precision={0.5}
                      readOnly
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {movie.description.length > 30 ? `${movie.description.slice(0, 30)}...` : movie.description}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                      Release Date: {formatDate(movie.releaseDate)}
                    </Typography>
                    <Typography variant="body2">
                      Duration: {movie.duration} minutes
                    </Typography>
                    <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
                    <IconButton onClick={() => handleMovieModalClick(movie)} color="primary" sx={{ mt: 1 }}>
                        <InfoIcon />
                      </IconButton>
                      <IconButton
                        color="primary"
                        onClick={() => openUpdateDialog(movie)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => openDeleteDialog(movie)}
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
              />
            </Box>
          </>
        )}
      </Container>

      <AddMovie
        open={addDialogOpen}
        onClose={closeAddDialog}
        onMovieAdded={fetchMovies}
      />

      <UpdateMovie
        open={updateDialogOpen}
        onClose={closeUpdateDialog}
        movie={selectedMovie}
        onMovieUpdated={fetchMovies}
      />

      <DeleteMovieDialog
        open={deleteDialogOpen}
        onClose={closeDeleteDialog}
        onDelete={handleDeleteMovie}
        movieName={selectedMovie?.name}
      />

<MovieDetailsModal open={modalOpen} onClose={closeMovieModal} movie={selectedMovie} />
    </Box>
  );
};


export default AdminPage;
