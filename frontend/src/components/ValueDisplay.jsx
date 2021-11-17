import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function ValueDisplay({value}) {
  return (
    <Box 
      sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around'}}
    >
      <TextField 
        id="filled-basic"
        color="secondary"
        variant="filled"
        value={value}
        aria-readonly
        sx={{ display: 'flex', justifyContent: 'flex-end'}}
      />
      <Typography>Valor</Typography>
    </Box>
  );
}

export default ValueDisplay;