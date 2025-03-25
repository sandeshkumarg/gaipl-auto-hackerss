import React, { useState } from 'react';
import { Container, Grid, Paper, Typography, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import AutomationChatbotWidget from './AutomationChatbotWidget';

const Automation = () => {
  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Backup Database', schedule: 'Daily at 2 AM', status: 'Active' },
    { id: 2, name: 'Generate Reports', schedule: 'Weekly on Monday', status: 'Active' },
  ]);
  const [newTask, setNewTask] = useState({ name: '', schedule: '', status: 'Active' });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
    setOpen(false);
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Automation using MCP
      </Typography>
      <Grid container spacing={3}>
        {/* Task Automation */}
        <Grid item xs={12}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Task Automation
            </Typography>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
              Add Task
            </Button>
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Schedule</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>{task.id}</TableCell>
                      <TableCell>{task.name}</TableCell>
                      <TableCell>{task.schedule}</TableCell>
                      <TableCell>{task.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        {/* Workflow Management */}
        <Grid item xs={12}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Workflow Management
            </Typography>
            <Button variant="contained" color="primary">
              Create Workflow
            </Button>
            {/* Add more functionalities for workflow management as needed */}
          </Paper>
        </Grid>
        {/* Integration with Other Systems */}
        <Grid item xs={12}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Integration with Other Systems
            </Typography>
            <Button variant="contained" color="primary">
              Add Integration
            </Button>
            {/* Add more functionalities for integration as needed */}
          </Paper>
        </Grid>
        {/* Notification and Alerts */}
        <Grid item xs={12}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Notification and Alerts
            </Typography>
            <Button variant="contained" color="primary">
              Configure Notifications
            </Button>
            {/* Add more functionalities for notifications and alerts as needed */}
          </Paper>
        </Grid>
        {/* Reporting and Analytics */}
        <Grid item xs={12}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Reporting and Analytics
            </Typography>
            <Button variant="contained" color="primary">
              Generate Report
            </Button>
            {/* Add more functionalities for reporting and analytics as needed */}
          </Paper>
        </Grid>
      </Grid>
      {/* Add Task Dialog */}
      <AutomationChatbotWidget />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add a new task, please enter the task name and schedule here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Task Name"
            fullWidth
            value={newTask.name}
            onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Schedule"
            fullWidth
            value={newTask.schedule}
            onChange={(e) => setNewTask({ ...newTask, schedule: e.target.value })}
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

export default Automation;