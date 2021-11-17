const updateDashboardListener = (socket, onlineDevices, setOnlineDevices) => {
  socket.removeAllListeners('updateDashboard');
  socket.on('updateDashboard', ({ id, params, controls }) => {
    const onlineDevicesUpdated = { ...onlineDevices };
    onlineDevicesUpdated[id] = { ...onlineDevicesUpdated[id], params, controls };
    setOnlineDevices(onlineDevicesUpdated);
  })
};
const loadDevicesListener = (socket, setOnlineDevices) => {
  socket.removeAllListeners('loadDevices');
  socket.on('loadDevices', ({ devices }) => {
    setOnlineDevices(devices);
  })
};
const switchOnOffListener = (socket, onlineDevices, setOnlineDevices) => {
  socket.removeAllListeners('switchOnOff');
  socket.on('switchOnOff', ({ id, offMode }) => {
    const onlineDevicesUpdated = { ...onlineDevices };
    onlineDevicesUpdated[id] = { ...onlineDevicesUpdated[id], offMode};
    setOnlineDevices(onlineDevicesUpdated);
  })
};

module.exports = {
  updateDashboardListener,
  loadDevicesListener,
  switchOnOffListener,
}