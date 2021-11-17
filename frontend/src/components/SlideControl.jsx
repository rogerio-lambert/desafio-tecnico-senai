import React from 'react';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function SlideControl({value, onChange, offMode}) {

  return (
    <Box 
      sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', with: '100%'}}
    >
      <Slider 
        sx={{with: '100%'}}
        aria-label="Controle"
        step={0.1}
        min={-2.0}
        max={10.0}
        value={value}
        disabled={offMode}
        valueLabelDisplay="on"
        onChange={onChange}
        color="primary"
      />
      <Typography>Controle</Typography>
    </Box>
  );
}

export default SlideControl;