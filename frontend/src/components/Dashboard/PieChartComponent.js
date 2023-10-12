import React from 'react'
import { Pie } from 'react-chartjs-2'
import {
  Chart,
  ArcElement,
  CategoryScale,
  Legend,
  Title,
  Tooltip,
} from 'chart.js'

// Register the necessary Chart.js components
Chart.register(ArcElement, CategoryScale, Legend, Title, Tooltip)

const PieChartComponent = ({ data }) => {
  const categories = data.categoryReachObject.map((obj) => obj.category)
  const reachCounts = data.categoryReachObject.map((obj) => obj.reach_count)

  const chartData = {
    labels: categories,
    datasets: [
      {
        data: reachCounts,
        backgroundColor: [
          '#F47A1F',
          '#FDBB2F',
          '#377B2B',
          '#7AC142',
          '#007CC3',
          '#00529B',
          '#FF3385',
          '#FF8F33',
          '#33FFF6',
        ],
      },
    ],
  }

  const options = {
    plugins: {
      legend: {
        position: 'right',
        labels: {
          generateLabels: (chart) => {
            const labels = chart.data.labels
            const datasets = chart.data.datasets

            if (datasets.length === 0) {
              return []
            }

            const data = datasets[0].data
            return labels.map((label, index) => {
              return {
                text: `${label} (${data[index]})`,
                fillStyle: datasets[0].backgroundColor[index],
                strokeStyle: datasets[0].borderColor
                  ? datasets[0].borderColor[index]
                  : undefined,
                lineWidth: datasets[0].borderWidth
                  ? datasets[0].borderWidth[index]
                  : 0,
                hidden: isNaN(data[index]) || data[index] === 0,
                index: index,
              }
            })
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || ''
            const value = context.parsed
            return `${label}: ${value}`
          },
        },
      },
    },
  }

  return (
    <div className="p-4">
      <Pie data={chartData} options={options} />
    </div>
  )
}

export default PieChartComponent
