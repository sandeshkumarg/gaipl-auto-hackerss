import React, { useState } from 'react';
import { Container, Grid, Paper, Typography, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  PointElement
} from 'chart.js';
import ReportingChatbotWidget from './chatbot/ReportingChatbotWidget';
import { incidents } from './feed/data';

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);

const Reporting = () => {
  const [open, setOpen] = useState(false);
  const [reports, setReports] = useState([
    { id: 1, name: 'System Performance Report', date: '2025-03-01' },
    { id: 2, name: 'Incident Report', date: '2025-03-02' },
  ]);
  const [newReport, setNewReport] = useState({ name: '', date: '' });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    setReports([...reports, { ...newReport, id: reports.length + 1 }]);
    setOpen(false);
  };

  const systemPerformanceData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'System Performance',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  };

  const incidentData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Incidents',
        backgroundColor: 'rgba(255,99,132,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [75, 69, 90, 91, 66, 65, 50]
      }
    ]
  };

  const incidentTrendsData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Incident Trends',
        backgroundColor: 'rgba(54,162,235,0.2)',
        borderColor: 'rgba(54,162,235,1)',
        borderWidth: 1,
        data: [10, 20, 30, 40, 50, 60, 70]
      }
    ]
  };

  const systemUptimeData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'System Uptime (%)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        data: [99.9, 99.8, 99.7, 99.9, 99.8, 99.9, 99.7]
      }
    ]
  };

  const userActivityData = {
    labels: ['Active', 'Inactive'],
    datasets: [
      {
        label: 'User Activity',
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB'],
        data: [300, 50]
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Reporting
      </Typography>
      <Grid container spacing={3}>
        {/* Report Generation */}
        <Grid item xs={12}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Generate Report
            </Typography>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
              Generate Report
            </Button>
          </Paper>
        </Grid>
        {/* Report Viewing */}
        <Grid item xs={12}>
          <Paper style={{ padding: '20px' }}>
            <Typography variant="h6" gutterBottom>
              View Reports
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
                  {reports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>{report.id}</TableCell>
                      <TableCell>{report.name}</TableCell>
                      <TableCell>{report.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
        {/* System Performance Report */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '20px', height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              System Performance Report
            </Typography>
            <div style={{ height: '300px' }}>
              <Bar data={systemPerformanceData} options={options} />
            </div>
          </Paper>
        </Grid>
        {/* Incident Report */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '20px', height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Incident Report
            </Typography>
            <div style={{ height: '300px' }}>
              <Line data={incidentData} options={options} />
            </div>
          </Paper>
        </Grid>
        {/* Incident Trends */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '20px', height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Incident Trends
            </Typography>
            <div style={{ height: '300px' }}>
              <Line data={incidentTrendsData} options={options} />
            </div>
          </Paper>
        </Grid>
        {/* System Uptime */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '20px', height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              System Uptime
            </Typography>
            <div style={{ height: '300px' }}>
              <Line data={systemUptimeData} options={options} />
            </div>
          </Paper>
        </Grid>
        {/* User Activity */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: '20px', height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              User Activity
            </Typography>
            <div style={{ height: '300px' }}>
              <Doughnut data={userActivityData} options={options} />
            </div>
          </Paper>
        </Grid>
        {/* Add more widgets as needed */}
      </Grid>
      {/* Generate Report Dialog */}
      <ReportingChatbotWidget incidents={incidents} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Generate Report</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To generate a new report, please enter the report name and date here.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Report Name"
            fullWidth
            value={newReport.name}
            onChange={(e) => setNewReport({ ...newReport, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Date"
            type="date"
            fullWidth
            value={newReport.date}
            onChange={(e) => setNewReport({ ...newReport, date: e.target.value })}
            InputLabelProps={{
              shrink: true,
            }}
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

export default Reporting;