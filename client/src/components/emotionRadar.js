import Chart from 'chart.js/auto';

const createEmotionRadarChart = (canvasElement, emotionData) => {
    return new Chart(canvasElement, {
    type: 'radar',
    data: {
      labels: ['Happiness', 'Neutral', 'Sadness', 'Anger', 'Disgust', 'Fear', 'Surprise'],
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
          suggestedMin: 0,
          suggestedMax: 100
        }
      }
    }
  });
};

export default createEmotionRadarChart;
