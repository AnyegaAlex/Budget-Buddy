document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on a page with a chart
  const chartElement = document.getElementById('expenseChart');
  if (!chartElement) return;
  
  // Sample data for the chart
  const ctx = chartElement.getContext('2d');
  const expenseChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Housing', 'Transportation', 'Food', 'Entertainment', 'Utilities', 'Savings'],
      datasets: [{
        data: [1200, 500, 600, 200, 300, 400],
        backgroundColor: [
          '#4361ee',
          '#3f37c9',
          '#4895ef',
          '#4cc9f0',
          '#f72585',
          '#7209b7'
        ],
        borderWidth: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      cutout: '70%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 20,
            usePointStyle: true,
            pointStyle: 'circle'
          }
        }
      },
      animation: {
        animateScale: true,
        animateRotate: true
      }
    }
  });
  
  // Make chart responsive on window resize
  window.addEventListener('resize', function() {
    expenseChart.resize();
  });
});