// BarChartComponent.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import * as echarts from 'echarts';

const BarChartComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/years')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    if (data.length) {
      const chartDom = document.getElementById('bar-chart');
      const myChart = echarts.init(chartDom);
      const option = {
        title: { text: 'Yearly Data Bar Chart', left: 'center' },
        xAxis: { type: 'category', data: data.map(item => item.title) },
        yAxis: { type: 'value' },
        series: [{ data: data.map(item => item.someValueField), type: 'bar', color: '#3398DB' }]
      };
      myChart.setOption(option);
      return () => { myChart.dispose(); };
    }
  }, [data]);

  return <Box id="bar-chart" sx={{ height: 200 }} />;
};

export default BarChartComponent;
