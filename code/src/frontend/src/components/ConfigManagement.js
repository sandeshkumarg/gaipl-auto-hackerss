import React, { useState } from 'react';
import { Container, Grid, Paper, Typography, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Chip } from '@mui/material';
import ConfigManagementChatbotWidget from './chatbot/ConfigManagementChatbotWidget';

const ConfigManagement = () => {
  const [open, setOpen] = useState(false);
  const [configurations, setConfigurations] = useState([
    { id: 1, name: 'Database Config', version: 'v1.0', status: 'Active' },
    { id: 2, name: 'API Config', version: 'v1.2', status: 'Active' },
    { id: 3, name: 'Web Server Config', version: 'v2.0', status: 'Completed' },
    { id: 4, name: 'Load Balancer Config', version: 'v1.1', status: 'In Progress' },
    { id: 5, name: 'Cache Config', version: 'v1.0', status: 'Scheduled' },
    { id: 6, name: 'Firewall Config', version: 'v1.3', status: 'Cancelled' },
    { id: 7, name: 'DNS Config', version: 'v1.0', status: 'Error' },
  ]);
  const [changeRequests, setChangeRequests] = useState([
    { id: 1, name: 'Update Database Config', status: 'Pending' },
    { id: 2, name: 'Upgrade API Version', status: 'Approved' },
    { id: 3, name: 'Modify Firewall Rules', status: 'In Progress' },
    { id: 4, name: 'Add New Cache Layer', status: 'Completed' },
    { id: 5, name: 'Remove Deprecated APIs', status: 'Cancelled' },
  ]);
  const [complianceRecords, setComplianceRecords] = useState([
    { id: 1, name: 'Database Compliance', status: 'Compliant' },
    { id: 2, name: 'API Compliance', status: 'Non-Compliant' },
    { id: 3, name: 'Web Server Compliance', status: 'Compliant' },
    { id: 4, name: 'Load Balancer Compliance', status: 'Non-Compliant' },
  ]);
  const [deploymentHistory, setDeploymentHistory] = useState([
    { id: 1, name: 'Database Deployment', date: '2025-03-01' },
    { id: 2, name: 'API Deployment', date: '2025-03-02' },
    { id: 3, name: 'Web Server Deployment', date: '2025-03-03' },
    { id: 4, name: 'Load Balancer Deployment', date: '2025-03-04' },
    { id: 5, name: 'Cache Deployment', date: '2025-03-05' },
  ]);
  const [newConfig, setNewConfig] = useState({ name: '', version: '', status: 'Active' });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setConfigurations([...configurations, { ...newConfig, id: configurations.length + 1 }]);
    setOpen(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'green';
      case 'In Progress':
        return 'blue';
      case 'Scheduled':
        return 'orange';
      case 'Cancelled':
        return 'red';
      case 'Error':
        return 'purple';
      case 'Pending':
        return 'yellow';
      case 'Approved':
        return 'lightgreen';
      case 'Compliant':
        return 'green';
      case 'Non-Compliant':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Config and Change Management
      </Typography>
      <Grid container spacing={3}>
        {/* Configuration Management */}
        <Grid item xs={12}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Configuration Management
            </Typography>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
              Add Configuration
            </Button>
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Version</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {configurations.map((config) => (
                    <TableRow key={config.id}>
                      <TableCell>{config.id}</TableCell>
                      <TableCell>{config.name}</TableCell>
                      <TableCell>{config.version}</TableCell>
                      <TableCell>
                        <Chip
                          label={config.status}
                          style={{
                            backgroundColor: getStatusColor(config.status),
                            color: 'white',
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        {/* Change Management */}
        <Grid item xs={12}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Change Management
            </Typography>
            <Button variant="contained" color="primary">
              Create Change Request
            </Button>
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {changeRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>{request.id}</TableCell>
                      <TableCell>{request.name}</TableCell>
                      <TableCell>
                        <Chip
                          label={request.status}
                          style={{
                            backgroundColor: getStatusColor(request.status),
                            color: 'white',
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        {/* Compliance Tracking */}
        <Grid item xs={12}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Compliance Tracking
            </Typography>
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {complianceRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{record.id}</TableCell>
                      <TableCell>{record.name}</TableCell>
                      <TableCell>
                        <Chip
                          label={record.status}
                          style={{
                            backgroundColor: getStatusColor(record.status),
                            color: 'white',
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        {/* Deployment History */}
        <Grid item xs={12}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Deployment History
            </Typography>
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {deploymentHistory.map((deployment) => (
                    <TableRow key={deployment.id}>
                      <TableCell>{deployment.id}</TableCell>
                      <TableCell>{deployment.name}</TableCell>
                      <TableCell>{deployment.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
      {/* Add Configuration Dialog */}
      <ConfigManagementChatbotWidget />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Configuration</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new configuration, please enter the configuration name and version here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Configuration Name"
            fullWidth
            value={newConfig.name}
            onChange={(e) => setNewConfig({ ...newConfig, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Version"
            fullWidth
            value={newConfig.version}
            onChange={(e) => setNewConfig({ ...newConfig, version: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ConfigManagement;