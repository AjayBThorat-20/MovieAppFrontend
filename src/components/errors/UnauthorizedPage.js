import React from 'react';
import { Box, Typography } from '@mui/material';

const UnauthorizedPage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
      textAlign="center"
    >
      <Typography variant="h1" color="error" gutterBottom>
        401
      </Typography>
      <Typography variant="h4" gutterBottom>
        Unauthorized
      </Typography>
      <Typography variant="body1">
        You are not authorized to access this page.
      </Typography>
    </Box>
  );
};

export default UnauthorizedPage;
