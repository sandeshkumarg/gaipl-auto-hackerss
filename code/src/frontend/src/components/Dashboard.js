import React from 'react';
import { Container, Grid, Paper, Typography, Card, CardContent } from '@mui/material';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
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

const Dashboard = () => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/incident-details');
  };

  const incidentsResolvedData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Incidents Resolved',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  };

  const incidentsLoggedData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Incidents Logged',
        backgroundColor: 'rgba(255,99,132,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [75, 69, 90, 91, 66, 65, 50]
      }
    ]
  };

  const mttrData = {
    labels: ['Incident 1', 'Incident 2', 'Incident 3', 'Incident 4', 'Incident 5'],
    datasets: [
      {
        label: 'Average MTTR (hours)',
        backgroundColor: 'rgba(153,102,255,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [2, 3, 1.5, 4, 2.5]
      }
    ]
  };

  const topSeverityIncidentsData = {
    labels: ['Severity 1', 'Severity 2', 'Severity 3'],
    datasets: [
      {
        label: 'Top 3 Severity Incidents',
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        data: [10, 20, 30]
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
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Number of Incidents Resolved */}
        <Grid item xs={12} md={6} lg={4}>
          <Card onClick={handleCardClick} style={{ cursor: 'pointer' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Incidents Resolved
              </Typography>
              <Typography variant="h4">
                120
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Number of Incidents Logged */}
        <Grid item xs={12} md={6} lg={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Incidents Logged
              </Typography>
              <Typography variant="h4">
                150
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Incidents Resolved in Graph */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper style={{  height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Incidents Resolved
            </Typography>
            <div style={{ height: '300px' }}>
              <Bar data={incidentsResolvedData} options={options} />
            </div>
          </Paper>
        </Grid>
        {/* Incidents Logged in Graph */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper style={{  height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Incidents Logged
            </Typography>
            <div style={{ height: '300px' }}>
              <Bar data={incidentsLoggedData} options={options} />
            </div>
          </Paper>
        </Grid>
        {/* Average MTTR for each Incident */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper style={{  height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Average MTTR
            </Typography>
            <div style={{ height: '300px' }}>
              <Line data={mttrData} options={options} />
            </div>
          </Paper>
        </Grid>
        {/* Incidents with Top 3 Severity */}
        <Grid item xs={12} md={6} lg={4}>
          <Paper style={{  height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Top 3 Severity Incidents
            </Typography>
            <div style={{ height: '300px' }}>
              <Pie data={topSeverityIncidentsData} options={options} />
            </div>
          </Paper>
        </Grid>
        {/* Add more widgets as needed */}
      </Grid>
    </Container>
  );
};

export default Dashboard;