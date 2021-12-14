import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

interface IHeader {
  isLogin: boolean;
  loginHandler: () => void;
  registerHandler: () => void;
  logoutHandler: () => void;
}

export const Header: React.FC<IHeader> = ({
  isLogin,
  loginHandler,
  registerHandler,
  logoutHandler,
}) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          {isLogin ? (
            <Button onClick={logoutHandler} color="inherit">
              Logout
            </Button>
          ) : (
            <>
              <Button onClick={loginHandler} color="inherit">
                Login
              </Button>
              <Button onClick={registerHandler} color="inherit">
                Sign Up
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
