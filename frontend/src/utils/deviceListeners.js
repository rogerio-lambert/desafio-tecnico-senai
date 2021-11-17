const createIdListener = (socket, setDeviceId, params, controls, offMode) => {
  socket.on('createId', ({ id }) => {
    setDeviceId(id);
    socket.emit('newDevice', { id, params, controls, offMode });
  });
};

const switchOnOffListener = (socket, deviceId, switchOffMode) => {
  socket.removeAllListeners('switchOnOff');
  socket.on('switchOnOff', ({ id, offMode: newPosition }) => {
    id === deviceId && switchOffMode(newPosition);
  });
};

const controlDeviceListener = (socket, deviceId, setControls, gain, params, setParameters) => {
  socket.removeAllListeners('controlDevice');
  socket.on('controlDevice', ({ newControls, id }) => {
    if (id === deviceId) {
      setControls(newControls);
      const newParams = {};
      Object.keys(params).forEach((paramName, index) => {
        const controlValue = Object.values(newControls)[index]
        newParams[paramName] = controlValue * gain[index];
      });
      setParameters(newParams);
      socket.emit('updateDashboard', { id: deviceId, params: newParams, controls: newControls });
    }
  });
};

module.exports = {
  createIdListener,
  switchOnOffListener,
  controlDeviceListener,
};