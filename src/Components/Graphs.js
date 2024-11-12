// GraphsPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Typography, Box } from '@mui/material';
import PieChartComponent from './PieChartComponent';
import BarChartComponent from './BarChartComponent';
import MapComponent from './MapComponent';
import DataTableComponent from './DataTableComponent';

const GraphsPage = () => {
  const [postsData, setPostsData] = useState([]);
  const [yearsData, setYearsData] = useState([]);

  // Fetch Posts Data
  useEffect(() => {
    axios.get('http://localhost:5000/posts')
      .then(response => setPostsData(response.data))
      .catch(error => console.error('Error fetching posts data:', error));
  }, []);

  // Fetch Years Data
  useEffect(() => {
    axios.get('http://localhost:5000/years')
      .then(response => setYearsData(response.data))
      .catch(error => console.error('Error fetching years data:', error));
  }, []);

  return (
    <Box sx={{ padding: 3, display: 'flex', flexDirection: 'row' }}>
      {/* Left side (50%): Data visualization components */}
      <Box sx={{ width: '50%', paddingRight: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Data Visualization Dashboard
        </Typography>
        
        <Grid container spacing={4}>
          {/* Top Left: Pie Chart */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" align="center" gutterBottom>
              
            </Typography>
            <PieChartComponent />
          </Grid>

          {/* Top Right: Bar Chart */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" align="center" gutterBottom>
              
            </Typography>
            <BarChartComponent />
          </Grid>

          {/* Bottom: Data Tables (side-by-side) */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" align="center" gutterBottom>
             
            </Typography>
            <DataTableComponent title="Posts Data" data={postsData} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" align="center" gutterBottom>
              
            </Typography>
            <DataTableComponent title="Years Data" data={yearsData} />
          </Grid>
        </Grid>
      </Box>

      {/* Right side (50%): Map */}
      <Box sx={{ width: '50%', paddingLeft:0 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Map (Islamabad)
        </Typography>
        <MapComponent />
      </Box>
    </Box>
  );
};

export default GraphsPage;
