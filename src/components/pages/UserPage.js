// import React, { useState, useEffect } from 'react';
// import {
//   Container, Typography, Box, Paper, Button, AppBar, Toolbar,
//   TextField, Card, CardContent, Grid, CircularProgress, Rating,
//   IconButton, InputAdornment, Select, MenuItem, FormControl,
//   InputLabel, Pagination
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { X as CloseIcon, Search as SearchIcon, RotateCcw, InfoIcon } from 'lucide-react';
// import axios from 'axios';
// import MovieDetailsModal from '../adminComponents/MovieDetailsModal';


// const UserPage = () => {
//   const navigate = useNavigate();
//   const [movies, setMovies] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [error, setError] = useState('');
//   const [selectedMovie, setSelectedMovie] = useState(null);
//   const [modalOpen, setModalOpen] = useState(false);
//   // Modified to use single sort state
//   const [activeSort, setActiveSort] = useState({
//     field: '',
//     direction: ''
//   });

//   const API_URL = `${process.env.REACT_APP_API_URL}/movies/`;

//   const fetchMovies = async () => {
//     try {
//       setLoading(true);
//       const params = new URLSearchParams({
//         page: page,
//         limit: 8
//       });

//       if (searchQuery) {
//         params.append('query', searchQuery);
//       }

//       // Apply single sort
//       if (activeSort.field && activeSort.direction) {
//         params.append('sortBy', `${activeSort.field}-${activeSort.direction}`);
//       }

//       const response = await axios.get(`${API_URL}?${params.toString()}`);
//       setMovies(response.data.movies);
//       setTotalPages(response.data.totalPages);
//       setError('');
//     } catch (err) {
//       setError('Failed to fetch movies');
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchMovies();
//   }, [page, activeSort, searchQuery]);

//   const handleSortChange = (field, value) => {
//     if (value === '') {
//       setActiveSort({ field: '', direction: '' });
//     } else {
//       setActiveSort({ field, direction: value });
//     }
//     setPage(1);
//   };

//   const handleSearch = () => {
//     setPage(1);
//     fetchMovies();
//   };

//   const handleReset = () => {
//     setActiveSort({ field: '', direction: '' });
//     setPage(1);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   const handlePageChange = (event, value) => {
//     setPage(value);
//   };

//   const handleClearSearch = () => {
//     setSearchQuery('');
//     setPage(1);
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   // Helper function to check if select should be disabled
//   const isSelectDisabled = (field) => {
//     return activeSort.field !== '' && activeSort.field !== field;
//   };

//   // Helper function to get current sort value for a field
//   const getCurrentSort = (field) => {
//     return activeSort.field === field ? activeSort.direction : '';
//   };



//   const handleMovieModalClick = (movie) => {
//     setSelectedMovie(movie);
//     setModalOpen(true);
//   };

//   const closeMovieModal = () => {
//     setModalOpen(false);
//     setSelectedMovie(null);
//   };


//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//             User Dashboard
//           </Typography>
//           <Button
//             color="inherit"
//             onClick={handleLogout}
//             startIcon={<CloseIcon size={16} />}
//           >
//             Logout
//           </Button>
//         </Toolbar>
//       </AppBar>

//       <Container maxWidth="lg" sx={{ mt: 4 }}>
        // <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        //   <Grid container spacing={3}>
        //     <Grid item xs={12} md={6}>
        //       <TextField
        //         fullWidth
        //         label="Search Movies"
        //         variant="outlined"
        //         value={searchQuery}
        //         onChange={(e) => setSearchQuery(e.target.value)}
        //         onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        //         InputProps={{
        //           endAdornment: (
        //             <InputAdornment position="end">
        //               {searchQuery && (
        //                 <IconButton
        //                   onClick={handleClearSearch}
        //                   edge="end"
        //                   size="small"
        //                 >
        //                   <CloseIcon size={16} />
        //                 </IconButton>
        //               )}
        //               <IconButton
        //                 onClick={handleSearch}
        //                 edge="end"
        //                 size="small"
        //                 sx={{ ml: 1 }}
        //               >
        //                 <SearchIcon size={16} />
        //               </IconButton>
        //             </InputAdornment>
        //           ),
        //         }}
        //       />
        //     </Grid>
        //   </Grid>

        //   <Box sx={{ mt: 3 }}>
        //     <Grid container spacing={2} alignItems="center">
        //       <Grid item xs={12} sm={6} md={2}>
        //         <FormControl fullWidth>
        //           <InputLabel>Sort by Name</InputLabel>
        //           <Select
        //             value={getCurrentSort('name')}
        //             onChange={(e) => handleSortChange('name', e.target.value)}
        //             label="Sort by Name"
        //             disabled={isSelectDisabled('name')}
        //           >
        //             {/* <MenuItem value="">None</MenuItem> */}
        //             <MenuItem value="asc">A to Z</MenuItem>
        //             <MenuItem value="desc">Z to A</MenuItem>
        //           </Select>
        //         </FormControl>
        //       </Grid>

        //       <Grid item xs={12} sm={6} md={2}>
        //         <FormControl fullWidth>
        //           <InputLabel>Sort by Rating</InputLabel>
        //           <Select
        //             value={getCurrentSort('rating')}
        //             onChange={(e) => handleSortChange('rating', e.target.value)}
        //             label="Sort by Rating"
        //             disabled={isSelectDisabled('rating')}
        //           >
        //             {/* <MenuItem value="">None</MenuItem> */}
        //             <MenuItem value="desc">Highest First</MenuItem>
        //             <MenuItem value="asc">Lowest First</MenuItem>
        //           </Select>
        //         </FormControl>
        //       </Grid>

        //       <Grid item xs={12} sm={6} md={2}>
        //         <FormControl fullWidth>
        //           <InputLabel>Sort by Duration</InputLabel>
        //           <Select
        //             value={getCurrentSort('duration')}
        //             onChange={(e) => handleSortChange('duration', e.target.value)}
        //             label="Sort by Duration"
        //             disabled={isSelectDisabled('duration')}
        //           >
        //             {/* <MenuItem value="">None</MenuItem> */}
        //             <MenuItem value="desc">Longest First</MenuItem>
        //             <MenuItem value="asc">Shortest First</MenuItem>
        //           </Select>
        //         </FormControl>
        //       </Grid>

        //       <Grid item xs={12} sm={6} md={2}>
        //         <FormControl fullWidth>
        //           <InputLabel>Sort by Release Date</InputLabel>
        //           <Select
        //             value={getCurrentSort('releaseDate')}
        //             onChange={(e) => handleSortChange('releaseDate', e.target.value)}
        //             label="Sort by Release Date"
        //             disabled={isSelectDisabled('releaseDate')}
        //           >
        //             <MenuItem value="desc">Latest First</MenuItem>
        //             <MenuItem value="asc">Oldest First</MenuItem>
        //           </Select>
        //         </FormControl>
        //       </Grid>

        //       <Grid item xs={12} sm={6} md={2}>
        //         <Button
        //           fullWidth
        //           variant="outlined"
        //           onClick={handleReset}
        //           startIcon={<RotateCcw size={16} />}
        //           disabled={!activeSort.field}
        //         >
        //           Reset Sorting
        //         </Button>
        //       </Grid>
        //     </Grid>
        //   </Box>
        // </Paper>

//         {error && (
//           <Typography color="error" sx={{ mb: 2 }}>
//             {error}
//           </Typography>
//         )}

//         {loading ? (
//           <Box display="flex" justifyContent="center" sx={{ my: 4 }}>
//             <CircularProgress />
//           </Box>
//         ) : (
//           <>
//             <Grid container spacing={3}>
//               {movies.map((movie) => (
//                 <Grid item xs={12} sm={6} md={4} lg={3} key={movie._id}>
//                   <Card sx={{
//                     height: '100%',
//                     transition: 'transform 0.2s',
//                     '&:hover': {
//                       transform: 'translateY(-4px)',
//                       boxShadow: 3
//                     }
//                   }}>
//                     <CardContent>
//                       <Typography variant="h6" gutterBottom>
//                         {/* {movie.name} */}
//                         {movie.name.length > 15 ? `${movie.name.slice(0, 15)}...` : movie.name}
//                       </Typography>
//                       <Rating
//                         value={movie.rating / 2}
//                         precision={0.5}
//                         readOnly
//                       />
//                       <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//                       {movie.description.length > 30 ? `${movie.description.slice(0, 30)}...` : movie.description}
//                       </Typography>
//                       <Typography variant="body2" sx={{ mt: 1 }}>
//                         Release Date: {formatDate(movie.releaseDate)}
//                       </Typography>
//                       <Typography variant="body2">
//                         Duration: {movie.duration} minutes
//                       </Typography>
//                       <IconButton onClick={() => handleMovieModalClick(movie)} color="primary" sx={{ mt: 1 }}>
//                         <InfoIcon />
//                       </IconButton>

//                     </CardContent>
//                   </Card>
//                 </Grid>
//               ))}
//             </Grid>

//             <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
//               <Pagination
//                 count={totalPages}
//                 page={page}
//                 onChange={handlePageChange}
//                 color="primary"
//                 size="large"
//               />
//             </Box>
//           </>
//         )}
//       </Container>
//       <MovieDetailsModal open={modalOpen} onClose={closeMovieModal} movie={selectedMovie} />
//     </Box>
//   );
// };

// export default UserPage;



















import React, { useState, useEffect, useCallback } from 'react';
import {
  Container, Typography, Box, Paper, Button, AppBar, Toolbar,
  TextField, Card, CardContent, Grid, CircularProgress, Rating,
  IconButton, InputAdornment, Select, MenuItem, FormControl,
  InputLabel, Pagination
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { X as CloseIcon, Search as SearchIcon, RotateCcw, InfoIcon } from 'lucide-react';
import axios from 'axios';
import MovieDetailsModal from '../adminComponents/MovieDetailsModal';

const UserPage = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeSort, setActiveSort] = useState({
    field: '',
    direction: ''
  });

  const API_URL = `${process.env.REACT_APP_API_URL}/movies/`;

  const fetchMovies = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page,
        limit: 8
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
  }, [page, activeSort, searchQuery, API_URL]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleSortChange = (field, value) => {
    setActiveSort(value === '' ? { field: '', direction: '' } : { field, direction: value });
    setPage(1);
  };

  const handleSearch = () => {
    setPage(1);
    fetchMovies();
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

  const handleClearSearch = () => {
    setSearchQuery('');
    setPage(1);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isSelectDisabled = (field) => activeSort.field !== '' && activeSort.field !== field;
  const getCurrentSort = (field) => (activeSort.field === field ? activeSort.direction : '');

  const handleMovieModalClick = (movie) => {
    setSelectedMovie(movie);
    setModalOpen(true);
  };

  const closeMovieModal = () => {
    setModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            User Dashboard
          </Typography>
          <Button
            color="inherit"
            onClick={handleLogout}
            startIcon={<CloseIcon size={16} />}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

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

        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}

        {loading ? (
          <Box display="flex" justifyContent="center" sx={{ my: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Grid container spacing={3}>
              {movies.map((movie) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={movie._id}>
                  <Card
                    sx={{
                      height: '100%',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: 3
                      }
                    }}
                  >
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {movie.name.length > 15 ? `${movie.name.slice(0, 15)}...` : movie.name}
                      </Typography>
                      <Rating value={movie.rating / 2} precision={0.5} readOnly />
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                        {movie.description.length > 30
                          ? `${movie.description.slice(0, 30)}...`
                          : movie.description}
                      </Typography>
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        Release Date: {formatDate(movie.releaseDate)}
                      </Typography>
                      <Typography variant="body2">
                        Duration: {movie.duration} minutes
                      </Typography>
                      <IconButton
                        onClick={() => handleMovieModalClick(movie)}
                        color="primary"
                        sx={{ mt: 1 }}
                      >
                        <InfoIcon />
                      </IconButton>
                    </CardContent>
                  </Card>
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
      <MovieDetailsModal open={modalOpen} onClose={closeMovieModal} movie={selectedMovie} />
    </Box>
  );
};

export default UserPage;
