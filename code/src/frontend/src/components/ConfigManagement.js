import React, { useState } from 'react';
import { Container, Grid, Paper, Typography, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const ConfigManagement = () => {
  const [open, setOpen] = useState(false);
  const [configurations, setConfigurations] = useState([
    { id: 1, name: 'Database Config', version: 'v1.0', status: 'Active' },
    { id: 2, name: 'API Config', version: 'v1.2', status: 'Active' },
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
                      <TableCell>{config.status}</TableCell>
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
            {/* Add more functionalities for change management as needed */}
          </Paper>
        </Grid>
      </Grid>
      {/* Add Configuration Dialog */}
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