import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const ErrorComponent = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', height: '80vh', alignItems: 'center' }}>
      <Typography variant="h2" component="h2">
        Ooops... Smth went wrong <br />
        Try again later
      </Typography>
    </Box>
  );
};
