import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ButtonHome from '../components/ButtonHome';
import Divider from '@mui/material/Divider';
import RouterIcon from '@mui/icons-material/Router';
import DvrIcon from '@mui/icons-material/Dvr';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';

function Home() {
  return (
    <Box sx={{ width: '100%', display: 'flex', height: '450px', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
      <Typography
        sx={{ width: '100%', maxWidth: 360, textAlign: 'center', marginBottom: '100px'}}
        variant="h4"
      >
        Benvindos ao app de desmonstração de tecnologia socket.io/React
      </Typography> 
      <Box sx={{ width: '100%', maxWidth: 360 }}>
        <Divider />
        <nav aria-label="main mailbox folders">
          <Fade in={true}>
            <List>
              <ButtonHome
                title="Dispositivo"
                href="/device"
                icon={<RouterIcon />}
              />
              <Divider />
              <ButtonHome
                title="Dashboard"
                href="/dashboard"
                icon={<DvrIcon />}
              />
            </List>
          </Fade>
        </nav>
        <Divider />
      </Box>
    </Box>
  );
}

export default Home;