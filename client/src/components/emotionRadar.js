import Chart from 'chart.js/auto';

const createEmotionRadarChart = (canvasElement, emotionData) => {
  return new Chart(canvasElement, {
    type: 'radar',
    data: {
      labels: ['Neutral', 'Sadness', 'Anger', 'Disgust', 'Fear', 'Surprise', 'Happiness'],
      datasets: [{
        label: 'Emotions',
        data: emotionData,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        r: {
          angleLines: {
            display: false
          },
          ticks: {
            display: false,
            stepSize: 20 // number of grid lines
          },
          suggestedMin: 0,
          suggestedMax: 100,
          pointLabels: {
            display: true // emotion labels displayed
          },
        //   grid: {
        //     circular: false
        //   }
        }
      },
      plugins: {
        legend: {
          display: false // This ensures that the legend is not displayed
        }
      }
    }
    
});
};

export default createEmotionRadarChart;