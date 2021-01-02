export const myPlugins = []

export const chartOptions = {
  plugins: {
    datalabels: { enabled: false }
  },
  maintainAspectRatio: false,
  layout: {
    padding: {
      left: 0,
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
        display: true,
        type: 'time',
        distribution: 'linear',
        time: {
          unit: 'day'
        },
        ticks: {
          source: 'data'
        }
      }
    ],
    yAxes: [
      {
        display: true,
        ticks: {
          beginAtZero: true,
          autoSkip: true,
          callback: function(label) {
            if (Math.floor(label) === label) {
              return label
            }
          }
        }
      }
    ]
  }
}
