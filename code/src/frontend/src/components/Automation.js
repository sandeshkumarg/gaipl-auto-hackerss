import React, { useState } from 'react';
import { Container, Grid, Paper, Typography, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import AutomationChatbotWidget from './AutomationChatbotWidget';

const Automation = () => {
  const [open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState(null);
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Backup Database', schedule: 'Daily at 2 AM', status: 'Active' },
    { id: 2, name: 'Generate Reports', schedule: 'Weekly on Monday', status: 'Active' },
  ]);
  const [newTask, setNewTask] = useState({ name: '', schedule: '', status: 'Active' });

  const handleClickOpen = (content) => {
    setDialogContent(content);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDialogContent(null);
  };

  const handleSave = () => {
    if (dialogContent === 'Add Task') {
      setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
    }
    setOpen(false);
    setDialogContent(null);
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
            <Button variant="contained" color="primary" onClick={() => handleClickOpen('Add Task')}>
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
            <Button variant="contained" color="primary" onClick={() => handleClickOpen('Create Workflow')}>
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
            <Button variant="contained" color="primary" onClick={() => handleClickOpen('Add Integration')}>
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
            <Button variant="contained" color="primary" onClick={() => handleClickOpen('Configure Notifications')}>
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
            <Button variant="contained" color="primary" onClick={() => handleClickOpen('Generate Report')}>
              Generate Report
            </Button>
            {/* Add more functionalities for reporting and analytics as needed */}
          </Paper>
        </Grid>
      </Grid>
      {/* Add Task Dialog */}
      <AutomationChatbotWidget />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{dialogContent}</DialogTitle>
        <DialogContent>
          {dialogContent === 'Add Task' && (
            <>
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
            </>
          )}
          {dialogContent === 'Create Workflow' && (
            <>
              <DialogContentText>
                To create a new workflow, please enter the workflow details here.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                label="Workflow Name"
                fullWidth
              />
              <TextField
                margin="dense"
                label="Description"
                fullWidth
              />
            </>
          )}
          {dialogContent === 'Add Integration' && (
            <>
              <DialogContentText>
                To add a new integration, please enter the integration details here.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                label="Integration Name"
                fullWidth
              />
              <TextField
                margin="dense"
                label="Description"
                fullWidth
              />
            </>
          )}
          {dialogContent === 'Configure Notifications' && (
            <>
              <DialogContentText>
                To configure notifications, please enter the notification details here.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                label="Notification Name"
                fullWidth
              />
              <TextField
                margin="dense"
                label="Description"
                fullWidth
              />
            </>
          )}
          {dialogContent === 'Generate Report' && (
            <>
              <DialogContentText>
                To generate a report, please enter the report details here.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                label="Report Name"
                fullWidth
              />
              <TextField
                margin="dense"
                label="Description"
                fullWidth
              />
            </>
          )}
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