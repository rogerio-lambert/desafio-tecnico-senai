import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useHistory } from 'react-router-dom'

function ButtonHome({ href, title, icon }) {
  const history = useHistory();
  return (
  <ListItem disablePadding>
    <ListItemButton
      onClick={() => history.push(href)}
      sx={{
        backgroundColor:'secondary'
      }}
    >
      <ListItemIcon>
        {icon}
      </ListItemIcon>
      <ListItemText primary={title} />
    </ListItemButton>
  </ListItem>
  );
}

export default ButtonHome;