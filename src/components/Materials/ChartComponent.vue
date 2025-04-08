<script setup>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  PointElement,  // Import PointElement
  CategoryScale,
  LinearScale
} from 'chart.js';
import { Bar, Line } from 'vue-chartjs';

ChartJS.register(Title, Tooltip, Legend, BarElement, LineElement, PointElement, CategoryScale, LinearScale);  // Register PointElement

const { data, xKey, yKey, chartType, labelText } = defineProps({
  data: Array,
  xKey: String,
  yKey: String,
  chartType: {
    type: String,
    default: 'bar', // Default is bar chart
    validator: value => ['bar', 'line'].includes(value), // Allow only bar or line
  },
  labelText: String
});

const chartData = {
  labels: data.map(d => d[xKey]),
  datasets: [
    {
      label: labelText || 'Default Label',
      backgroundColor: '#D6D6D6D0',
      borderColor: '#D6D6D6D0',
      borderWidth: 2,                  // Border thickness
      hoverBackgroundColor: '#66BB6A', // On hover fill
      hoverBorderColor: '#2E7D32',
      data: data.map(d => d[yKey]),
    }
  ]
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      ticks: {
        color: '#FFFFFF', // White axis labels
        font: {
          size: 14,
          weight: 'bold',
        }
      },
      grid: {
        color: '#444444', // Dark grid lines
      }
    },
    y: {
      ticks: {
        color: '#FFFFFF',
        font: {
          size: 14,
          weight: 'bold',
        }
      },
      grid: {
        color: '#444444',
      }
    }
  },
  plugins: {
    legend: {
      labels: {
        color: '#FFFFFF',
        font: {
          size: 16,
          weight: 'bold'
        }
      }
    },
    tooltip: {
      backgroundColor: '#222222',
      titleColor: '#FFFFFF',
      bodyColor: '#CCCCCC',
    }
  }
};
</script>

<template>
  <div style="height: 300px; width: 100%;">
    <!-- Dynamically choose between Bar and Line chart based on chartType prop -->
    <component
      :is="chartType === 'bar' ? Bar : Line"
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>
