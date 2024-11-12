// PieChartComponent.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import * as echarts from 'echarts';

const PieChartComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/posts')
      .then(response => {
        setData(response.data.map(item => ({ name: item.title, value: item.value })));
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    if (data.length) {
      const chartDom = document.getElementById('pie-chart');
      const myChart = echarts.init(chartDom);
      const option = {
        title: { text: 'Post Data Pie Chart', left: 'center' },
        tooltip: { trigger: 'item' },
        legend: { bottom: '5%', left: 'center' },
        series: [{ type: 'pie', radius: '50%', data }],
      };
      
      myChart.setOption(option);
      return () => { myChart.dispose(); };
    }
  }, [data]);

  return <Box id="pie-chart" sx={{ height: 200 }} />;
};

export default PieChartComponent;
