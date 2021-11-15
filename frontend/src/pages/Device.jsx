import React, { useEffect, useState } from 'react';

const { io } = require("socket.io-client");
require('dotenv').config();

const socketServerUrl = process.env.SOCKET_SERVER || 'http://localhost:3001';
console.log(socketServerUrl)
const socket = io(socketServerUrl);

function Device(props) {
  const [controls, setControls] = useState({
    control1: 0,
    control2: 0,
  });
  const [params, setParameters] = useState({
    parameter1: 0,
    parameter2: 0,
  });
  const [offMode, switchOffMode] = useState(false);
  const [deviceId, setDeviceId] = useState();
  const gain = [35.32, 64.47];

  useEffect(() => {
    socket.emit('newDevice', { params, controls, offMode });
  }, []);

  useEffect(() => {
    socket.on('createId', ({ id }) => setDeviceId(id));
    socket.on('switchOnOff', ({ id, offMode: newPosition }) => {
      id === deviceId && switchOffMode(newPosition);
    });
    socket.on('controlDevice', ({ newControls, id }) => {
      if (id === deviceId) {
        setControls(newControls);
        socket.emit('updateDashboard', { id: deviceId, params, controls })
      }
    });
  }, [controls, deviceId, offMode, params]);

  return (
    <section>
      <h1>{ `Dispositivo id: ${deviceId}` }</h1> 
      {
        Object.entries(controls).map((control, index) => {
          const [paramName, paramValue] = Object.entries(params)[index]
          const [controlName, controlValue]  =  control;
          return (<fieldset htmlFor="" key={index}>
              <legend>{paramName}</legend>
              <label htmlFor="value">value</label>
              <input 
                type="text"
                name="value"
                id=""
                value={offMode ? '---' : paramValue}
              />
              <label htmlFor="control">control</label>
              <input 
                type="number"
                name="control"
                id=""
                value={Object.values(controls)[index]}
                disabled={offMode}
                onChange={({ target }) => {
                  setParameters({ ...params, [paramName]:  gain[index] * controlValue });
                  setControls({ ...controls, [controlName]: target.value });
                  socket.emit('updateDashboard', { id: deviceId, params, controls })
                }}
              />
            </fieldset>)
        })
      }
      <label htmlFor="on-off">
        ligar/desligar       
        <input 
          type="checkbox"
          name="on-off" 
          id=""
          checked={!offMode}
          onChange={({ target: { checked }}) => {
            socket.emit('switchOnOff', { id: deviceId, offMode: !offMode })
            switchOffMode(!checked);
          }}
        />
      </label>

             
    </section>
  );
}

export default Device;

// const [param1, setParam1] = useState(0);
// const [param2, setParam2] = useState(0);
// const [control1, setControl1] = useState(0);
// const [control2, setcontrol2] = useState(0);