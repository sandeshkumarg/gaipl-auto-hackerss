import React, { useState } from 'react';
import { Container, Grid, Paper, Typography, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, LinearProgress, Chip } from '@mui/material';
import AutomationChatbotWidget from './chatbot/AutomationChatbotWidget';

const Automation = () => {
  const [open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState(null);
  const [tasks, setTasks] = useState([
    { id: 1, name: 'Backup Database', schedule: 'Daily at 2 AM', status: 'Active', info: 'Backup of main database', completion: 75 },
    { id: 2, name: 'Generate Reports', schedule: 'Weekly on Monday', status: 'Active', info: 'Generate weekly sales reports', completion: 50 },
    { id: 3, name: 'System Update', schedule: 'Monthly on 1st', status: 'Completed', info: 'Update system software', completion: 100 },
    { id: 4, name: 'Data Sync', schedule: 'Hourly', status: 'In Progress', info: 'Sync data between servers', completion: 30 },
    { id: 5, name: 'Security Scan', schedule: 'Daily at 3 AM', status: 'Scheduled', info: 'Perform security scan', completion: 0 },
    { id: 6, name: 'Cleanup Logs', schedule: 'Weekly on Sunday', status: 'Cancelled', info: 'Cleanup old logs', completion: 0 },
    { id: 7, name: 'Deploy Application', schedule: 'On Demand', status: 'Error', info: 'Deploy new application version', completion: 0 },
  ]);
  const [workflows, setWorkflows] = useState([
    { id: 1, name: 'Onboarding Workflow', status: 'Active', description: 'Automate employee onboarding process' },
    { id: 2, name: 'Offboarding Workflow', status: 'Completed', description: 'Automate employee offboarding process' },
  ]);
  const [integrations, setIntegrations] = useState([
    { id: 1, name: 'Salesforce Integration', status: 'Active', description: 'Integrate with Salesforce CRM' },
    { id: 2, name: 'Slack Integration', status: 'Error', description: 'Integrate with Slack for notifications' },
  ]);
  const [notifications, setNotifications] = useState([
    { id: 1, name: 'Email Alerts', status: 'Active', description: 'Send email alerts for critical issues' },
    { id: 2, name: 'SMS Alerts', status: 'Scheduled', description: 'Send SMS alerts for high priority issues' },
  ]);
  const [reports, setReports] = useState([
    { id: 1, name: 'Monthly Sales Report', status: 'Completed', description: 'Generate monthly sales report' },
    { id: 2, name: 'Weekly Performance Report', status: 'In Progress', description: 'Generate weekly performance report' },
  ]);
  const [newTask, setNewTask] = useState({ name: '', schedule: '', status: 'Active', info: '', completion: 0 });

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
      default:
        return 'gray';
    }
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
                    <TableCell>Information</TableCell>
                    <TableCell>% of Completion</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell>{task.id}</TableCell>
                      <TableCell>{task.name}</TableCell>
                      <TableCell>{task.schedule}</TableCell>
                      <TableCell>
                        <Chip
                          label={task.status}
                          style={{
                            backgroundColor: getStatusColor(task.status),
                            color: 'white',
                          }}
                        />
                      </TableCell>
                      <TableCell>{task.info}</TableCell>
                      <TableCell>
                        <LinearProgress variant="determinate" value={task.completion} />
                        {task.completion}%
                      </TableCell>
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
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {workflows.map((workflow) => (
                    <TableRow key={workflow.id}>
                      <TableCell>{workflow.id}</TableCell>
                      <TableCell>{workflow.name}</TableCell>
                      <TableCell>
                        <Chip
                          label={workflow.status}
                          style={{
                            backgroundColor: getStatusColor(workflow.status),
                            color: 'white',
                          }}
                        />
                      </TableCell>
                      <TableCell>{workflow.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {integrations.map((integration) => (
                    <TableRow key={integration.id}>
                      <TableCell>{integration.id}</TableCell>
                      <TableCell>{integration.name}</TableCell>
                      <TableCell>
                        <Chip
                          label={integration.status}
                          style={{
                            backgroundColor: getStatusColor(integration.status),
                            color: 'white',
                          }}
                        />
                      </TableCell>
                      <TableCell>{integration.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {notifications.map((notification) => (
                    <TableRow key={notification.id}>
                      <TableCell>{notification.id}</TableCell>
                      <TableCell>{notification.name}</TableCell>
                      <TableCell>
                        <Chip
                          label={notification.status}
                          style={{
                            backgroundColor: getStatusColor(notification.status),
                            color: 'white',
                          }}
                        />
                      </TableCell>
                      <TableCell>{notification.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>{report.id}</TableCell>
                      <TableCell>{report.name}</TableCell>
                      <TableCell>
                        <Chip
                          label={report.status}
                          style={{
                            backgroundColor: getStatusColor(report.status),
                            color: 'white',
                          }}
                        />
                      </TableCell>
                      <TableCell>{report.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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
                To add a new task, please enter the task name, schedule, and other details here.
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
              <TextField
                margin="dense"
                label="Information"
                fullWidth
                value={newTask.info}
                onChange={(e) => setNewTask({ ...newTask, info: e.target.value })}
              />
              <TextField
                margin="dense"
                label="% of Completion"
                type="number"
                fullWidth
                value={newTask.completion}
                onChange={(e) => setNewTask({ ...newTask, completion: e.target.value })}
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