import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SlideControl from '../components/SlideControl';
import ValueDisplay from '../components/ValueDisplay';

function ParameterConsole({ handleSlideControl, offMode, paramName, paramValue, controlValue}) {
  return (
    <Box 
      sx={{ width: '100%', height: 150, maxWidth: 500,  margin: '5px', backgroundColor:'#ebebe0', padding: '5px', borderRadius: '10px'}}
      >
      <Typography
        sx={{ width: '100%', maxWidth: 450, textAlign: 'center', margin: '5px'}}
        variant="h6"
      >
        {paramName}
      </Typography>
      <Grid 
        container 
        spacing={2}
        direction="row"
        justifyContent="space-around"
        alignItems="flex-end"
      >
        <Grid item xs={5}>
          <ValueDisplay value={offMode ? '---' : paramValue} />
        </Grid>
        <Grid item xs={5}>
          <SlideControl
            onChange={handleSlideControl}
            value={controlValue}
            offMode={offMode}
          />
        </Grid>
      </Grid> 
    </Box>
  );
}

export default ParameterConsole;