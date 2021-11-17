import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SwitchOnOff from '../components/SwitchOnOff';
import ParameterConsole from '../components/ParameterConsole';

const { io } = require("socket.io-client");
require('dotenv').config();
const {
  updateDashboardListener,
  loadDevicesListener,
  switchOnOffListener } = require('../utils/dashboardListeners');

const socketServerUrl = process.env.SOCKET_SERVER || 'http://localhost:3001';
const socket = io(socketServerUrl);

function Dashboard(props) {
  const [onlineDevices, setOnlineDevices] = useState({});

  useEffect(() => {
    socket.emit('newDashboard');
  }, []);

  useEffect(() => {
    updateDashboardListener(socket, onlineDevices, setOnlineDevices);
    loadDevicesListener(socket, setOnlineDevices);
    switchOnOffListener(socket, onlineDevices, setOnlineDevices);
  }, [onlineDevices]);

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}
    > 
      <Typography
        variant="h3"
        sx={{ textAlign: 'center', backgroundColor: '#e0e0d1', width: '100%'}}
      >
        Dashboard
      </Typography>
      <Typography
        variant="h6"
        sx={{ textAlign: 'left', width: '100%'}}
      >
        {`Quantidade de dispositivos online: ${Object.keys(onlineDevices).length}`}
      </Typography> 
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        flexWrap={true}
        spacing={2}
      >
        {
          Object.entries(onlineDevices).map((device) => {
            const { params, controls, offMode } = device[1];
            const deviceId = device[0];
            const handleSwichOnOff = ({ target: { checked }}) => {
              socket.emit('switchOnOff', { id: deviceId, offMode: !offMode })
            };
            return (
              <Grid 
                item
                xs={4}
              >                
                <Grid 
                  container
                  spacing={2}
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  sx={{ width: '100%', margin: '50px'}}
                >
                  <Grid 
                    item
                    xs={5}
                    sx={{ width: '100%', maxWidth: 500, backgroundColor: '#f5f5f0', padding: '30px', borderRadius: '10px', border: 'black 1px solid'}}
                  >
                    <Typography
                      sx={{ width: '100%' , textAlign: 'left', marginBottom: '10px'}}
                      variant="h5"
                    >
                      { `Dispositivo id: ${deviceId}` }
                    </Typography> 
                    {
                      Object.entries(controls).map((control, index) => {
                        const [paramName, paramValue] = Object.entries(params)[index]
                        const [controlName, controlValue]  =  control;
                        const handleSlideControl = ({ target }) => {
                          const newControls = { ...controls, [controlName]: target.value }
                          socket.emit('controlDevice', { id: deviceId, newControls });
                        };
                        return (
                          < ParameterConsole 
                            key={index}
                            handleSlideControl={handleSlideControl}
                            offMode={offMode}
                            paramName={paramName}
                            paramValue={paramValue}
                            controlValue={controlValue}
                          />
                        )
                      })
                    }
                    <SwitchOnOff 
                      offMode={offMode}
                      onChange={handleSwichOnOff}
                    /> 
                  </Grid>
                </Grid>
              </Grid>
            )
          })
        }
      </Grid>
    </Box>    
  );
}

export default Dashboard;