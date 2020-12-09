import Chart from 'chart.js'
import ChartStacked100 from 'chartjs-plugin-stacked100'
import ChartDataLabels from 'chartjs-plugin-datalabels'

Chart.plugins.unregister(ChartDataLabels)

export const myPlugins = [ChartStacked100, ChartDataLabels]

export const chartOptions = {
  plugins: {
    stacked100: { enable: true, replaceTooltipLabel: false },
    datalabels: {
      formatter: (_value, context) => {
        const data = context.chart.data
        const { datasetIndex, dataIndex } = context
        return `${data.calculatedData[datasetIndex][dataIndex].toFixed()}%`
      }
    }
  },
  maintainAspectRatio: false,
  layout: {
    padding: {
      left: 8,
      right: 10,
      top: 0,
      bottom: 0
    }
  },
  title: { display: false },
  tooltips: { enabled: false },
  legend: { display: false },
  scales: {
    xAxes: [
      {
        display: false,
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ],
    yAxes: [
      {
        display: false,
        gridLines: {
          display: false,
          drawBorder: false
        }
      }
    ]
  }
}
