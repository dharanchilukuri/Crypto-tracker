import React from 'react';
import { useSelector } from 'react-redux'; 
import { Chart as ChartJS, CategoryScale, LinearScale, TimeScale, Tooltip, Title, Legend } from 'chart.js';
import { CandlestickController, CandlestickElement } from 'chartjs-chart-financial';
import 'chartjs-adapter-date-fns';
import { Chart } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  TimeScale, 
  Tooltip, 
  Title, 
  Legend, 
  CandlestickController, 
  CandlestickElement
);

const ChartComponent = () => {
  const candlestickData = useSelector((state) => state.crypto.candlestickData);

  if (!candlestickData || !Array.isArray(candlestickData)) {
    return <div>No data available</div>;
  }

  const candlestickDataset = {
    label: 'Candlestick Data',
    data: candlestickData.map(candle => ({
      x: candle.time,
      o: candle.open,
      h: candle.high,
      l: candle.low,
      c: candle.close,
    })),
    borderColor: '#234',
    backgroundColor: 'rgba(60, 60, 60, 0.3)',
    barThickness: 10,
  };

  const data = {
    datasets: [candlestickDataset],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'minute',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price (USD)'
        },
        beginAtZero: false,
        min:2377,
      },
    },
  };

  return (
    <div style={styles.chartContainer}>
      <div style={styles.chartWrapper}>
        <Chart 
          type='candlestick' 
          data={data} 
          options={options} 
        />
      </div>
    </div>
  );
};

// CSS styles for centering and resizing the chart
const styles = {
  chartContainer: {
    display: 'flex',
    justifyContent: 'center', // Center the chart horizontally
    alignItems: 'center', // Center the chart vertically
    height: '100vh', // Full height of the viewport
  },
  chartWrapper: {
    width: '80vw', // Set the width to 80% of the viewport width
    height: '70vh', // Set the height to 70% of the viewport height
  }
};

export default ChartComponent;
