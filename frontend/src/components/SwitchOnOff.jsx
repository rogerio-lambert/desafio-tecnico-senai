import React from 'react';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function SwitchOnOff({offMode, onChange}) {
  return (
  <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row' }}>
    <Typography>Desliga</Typography>
    <Switch
      checked={!offMode}
      onChange={onChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />        
    <Typography>Liga</Typography>
  </Box>  
  );
}

export default SwitchOnOff;