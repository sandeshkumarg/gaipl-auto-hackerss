import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { styled } from '@mui/system';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MonitorIcon from '@mui/icons-material/Monitor';
import ReportIcon from '@mui/icons-material/Report';
import SettingsIcon from '@mui/icons-material/Settings';
import BuildIcon from '@mui/icons-material/Build';
import { Link } from 'react-router-dom';

const DrawerStyled = styled(Drawer)(({ theme }) => ({
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 240,
    backgroundColor: '#072557',
    color: '#ffffff',
  },
}));


const ListItemStyled = styled(ListItem)(({ theme }) => ({
  '&:hover': {
    backgroundColor: '#a1c4fd', // Lighter color
  },
  '&.Mui-selected': {
    backgroundColor: '#2a2a40', // Highlight color
    '&:hover': {
      backgroundColor: '#2a2a40', // Same highlight color on hover
    },
  },
}));

const ListItemIconStyled = styled(ListItemIcon)(({ theme }) => ({
  color: 'black'
}));

const ListItemTextStyled = styled(ListItemText)(({ theme }) => ({
  fontWeight: 'bold',
  color: 'white'
}));

const Sidebar = () => {
  return (
    <DrawerStyled variant="permanent">
      <List>
        <ListItemStyled button component={Link} to="/">
          <ListItemIconStyled><DashboardIcon /></ListItemIconStyled>
          <ListItemTextStyled primary="Dashboard" />
        </ListItemStyled>
        <ListItemStyled button component={Link} to="/monitoring">
          <ListItemIconStyled><MonitorIcon /></ListItemIconStyled>
          <ListItemTextStyled primary="Monitoring" />
        </ListItemStyled>
        <ListItemStyled button component={Link} to="/incident">
          <ListItemIconStyled><ReportIcon /></ListItemIconStyled>
          <ListItemTextStyled primary="Incident Management" />
        </ListItemStyled>
        <ListItemStyled button component={Link} to="/config-management">
          <ListItemIconStyled><SettingsIcon /></ListItemIconStyled>
          <ListItemTextStyled primary="Config Management" />
        </ListItemStyled>
        <ListItemStyled button component={Link} to="/reporting">
          <ListItemIconStyled><ReportIcon /></ListItemIconStyled>
          <ListItemTextStyled primary="Reporting" />
        </ListItemStyled>
        <ListItemStyled button component={Link} to="/automation">
          <ListItemIconStyled><BuildIcon /></ListItemIconStyled>
          <ListItemTextStyled primary="Automation" />
        </ListItemStyled>
      </List>
    </DrawerStyled>
  );
};

export default Sidebar;