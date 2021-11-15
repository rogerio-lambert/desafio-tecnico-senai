import React, { useEffect, useState } from 'react';
const { io } = require("socket.io-client");
require('dotenv').config();
const socketServerUrl = process.env.SOCKET_SERVER || 'http://localhost:3001';
console.log(socketServerUrl)
const socket = io(socketServerUrl);

function Dashboard(props) {
  const [onlineDevices, setOnlineDevices] = useState({});

  useEffect(() => {
    socket.emit('newDashboard');
    console.log('entro no didmount');
  }, []);

  useEffect(() => {
    socket.on('loadDevices', ({ devices }) => {
      setOnlineDevices(devices);
      console.log('estes são os dispositivos online', devices);
    })
    socket.on('updateDashboard', ({ id, params, controls }) => {
      console.log('updateDashboard para o dispositivo ',  id)
      const onlineDevicesUpdated = { ...onlineDevices };
      onlineDevicesUpdated[id] = { ...onlineDevicesUpdated[id], params, controls };
      setOnlineDevices(onlineDevicesUpdated);
    })
  },[onlineDevices]);

  return (
    <section>
      <h1>Dashboard</h1>
      {
        Object.entries(onlineDevices).map((device) => {
          const { params, controls, offMode } = device[1];
          const deviceId = device[0];
          return (
            <fieldset key={deviceId}>
              {`dispositivo id: ${deviceId}`}
              {
                Object.entries(params).map((parameter, index) => (
                  <fieldset htmlFor="" key={index}>
                    <legend>{parameter[0]}</legend>
                    <label htmlFor="value">value</label>
                    <input 
                      type="text"
                      name="value"
                      id=""
                      value={offMode ? '---' : parameter[1]}
                    />
                    <label htmlFor="control">control</label>
                    <input 
                      type="number"
                      name="control"
                      id=""
                      value={Object.values(controls)[index]}
                      disabled={offMode}
                      onChange={({ target }) => {
                        const controlName = Object.keys(controls)[index];
                        const controlValue = target.value;
                        const newControls =  { ...controls, [controlName]: controlValue };
                        socket.emit('controlDevice', { id: deviceId, newControls });
                      }}
                    />
                  </fieldset>
                ))
              }
            </fieldset>
          )
        })
      }
    </section>
  );
}

export default Dashboard;