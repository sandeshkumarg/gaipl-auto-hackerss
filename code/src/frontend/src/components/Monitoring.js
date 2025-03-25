import React from 'react';
import { Container, Grid, Paper, Typography } from '@mui/material';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  PointElement
} from 'chart.js';
import MonitoringChatbotWidget from './MonitoringChatbotWidget';

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  PointElement
);

const Monitoring = () => {
  const cpuUsageData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'CPU Usage',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  };

  const memoryUsageData = {
    labels: ['Used', 'Free'],
    datasets: [
      {
        label: 'Memory Usage',
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB'],
        data: [300, 50]
      }
    ]
  };

  const diskIOData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Disk I/O',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(153,102,255,0.4)',
        borderColor: 'rgba(153,102,255,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(153,102,255,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(153,102,255,1)',
        pointHoverBorderColor: 'rgba220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  };

  const networkTrafficData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Network Traffic',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(255,159,64,0.4)',
        borderColor: 'rgba(255,159,64,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(255,159,64,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(255,159,64,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  };

  const activeUsersData = {
    labels: ['Active', 'Inactive'],
    datasets: [
      {
        label: 'Active Users',
        backgroundColor: ['#FFCE56', '#FF6384'],
        hoverBackgroundColor: ['#FFCE56', '#FF6384'],
        data: [200, 100]
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
        Monitoring
      </Typography>
      <Grid container spacing={3}>
        {/* CPU Usage */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper style={{ padding: '20px', height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              CPU Usage
            </Typography>
            <div style={{ height: '300px' }}>
              <Line data={cpuUsageData} options={options} />
            </div>
          </Paper>
        </Grid>
        {/* Memory Usage */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper style={{ padding: '20px', height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Memory Usage
            </Typography>
            <div style={{ height: '300px' }}>
              <Doughnut data={memoryUsageData} options={options} />
            </div>
          </Paper>
        </Grid>
        {/* Disk I/O */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper style={{ padding: '20px', height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Disk I/O
            </Typography>
            <div style={{ height: '300px' }}>
              <Line data={diskIOData} options={options} />
            </div>
          </Paper>
        </Grid>
        {/* Network Traffic */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper style={{ padding: '20px', height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Network Traffic
            </Typography>
            <div style={{ height: '300px' }}>
              <Line data={networkTrafficData} options={options} />
            </div>
          </Paper>
        </Grid>
        {/* Active Users */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper style={{ padding: '20px', height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Active Users
            </Typography>
            <div style={{ height: '300px' }}>
              <Doughnut data={activeUsersData} options={options} />
            </div>
          </Paper>
        </Grid>
        {/* Add more widgets as needed */}
      </Grid>
      <MonitoringChatbotWidget />
    </Container>
  );
};

export default Monitoring;