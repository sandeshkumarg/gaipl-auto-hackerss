import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MonitorIcon from '@mui/icons-material/Monitor';
import ReportIcon from '@mui/icons-material/Report';
import SettingsIcon from '@mui/icons-material/Settings';
import BuildIcon from '@mui/icons-material/Build';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Drawer variant="permanent">
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon><DashboardIcon /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/monitoring">
          <ListItemIcon><MonitorIcon /></ListItemIcon>
          <ListItemText primary="Monitoring" />
        </ListItem>
        <ListItem button component={Link} to="/incident">
          <ListItemIcon><ReportIcon /></ListItemIcon>
          <ListItemText primary="Incident Management" />
        </ListItem>
        <ListItem button component={Link} to="/config-management">
          <ListItemIcon><SettingsIcon /></ListItemIcon>
          <ListItemText primary="Config Management" />
        </ListItem>
        <ListItem button component={Link} to="/reporting">
          <ListItemIcon><ReportIcon /></ListItemIcon>
          <ListItemText primary="Reporting" />
        </ListItem>
        <ListItem button component={Link} to="/automation">
          <ListItemIcon><BuildIcon /></ListItemIcon>
          <ListItemText primary="Automation" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;