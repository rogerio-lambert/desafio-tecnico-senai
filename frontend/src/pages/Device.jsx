import React, { useEffect, useState } from 'react';
const { io } = require("socket.io-client");
const socket = io('http://localhost:3001');

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
    socket.on('createId', ({ id }) => setDeviceId(id));
    socket.on('switchOnOff', ({ id, offMode: newPosition }) => {
      id === deviceId && switchOffMode(newPosition);
    });
  }, [controls, deviceId, offMode, params]);

  return (
    <section>
      <h1>{ `Dispositivo id: ${deviceId}` }</h1> 
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
                const paramName = parameter[0];
                const controlValue = target.value;
                setControls({ ...controls, [controlName]: controlValue });
                setParameters({ ...params, [paramName]:  gain[index]*controlValue });
                socket.emit('updateDashboard', { params, controls })
              }}
            />
          </fieldset>
        ))
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