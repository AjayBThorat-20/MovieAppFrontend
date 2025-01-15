import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { X as CloseIcon } from 'lucide-react';

const Header = ({ onLogout }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Admin Dashboard
        </Typography>
        <Button
          color="inherit"
          onClick={onLogout}
          startIcon={<CloseIcon size={16} />}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
