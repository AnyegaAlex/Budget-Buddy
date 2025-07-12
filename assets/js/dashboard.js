document.addEventListener('DOMContentLoaded', function() {
  // Initialize dashboard charts
  initDashboardCharts();
  
  // Mobile sidebar toggle
  const sidebarToggle = document.createElement('button');
  sidebarToggle.className = 'mobile-sidebar-toggle btn btn-icon';
  sidebarToggle.innerHTML = '<i class="fas fa-bars"></i>';
  sidebarToggle.style.position = 'fixed';
  sidebarToggle.style.bottom = '20px';
  sidebarToggle.style.right = '20px';
  sidebarToggle.style.zIndex = '80';
  sidebarToggle.style.backgroundColor = 'var(--primary)';
  sidebarToggle.style.color = 'white';
  sidebarToggle.style.boxShadow = 'var(--shadow-lg)';
  
  document.body.appendChild(sidebarToggle);
  
  const dashboardSidebar = document.querySelector('.dashboard-sidebar');
  
  sidebarToggle.addEventListener('click', function() {
    dashboardSidebar.classList.toggle('active');
  });
  
  // Close sidebar when clicking on a link
  document.querySelectorAll('.dashboard-sidebar a').forEach(link => {
    link.addEventListener('click', () => {
      dashboardSidebar.classList.remove('active');
    });
  });
  
  // Sample transaction filtering
  const transactionFilter = document.createElement('div');
  transactionFilter.className = 'transaction-filter';
  transactionFilter.innerHTML = `
    <button class="filter-btn active" data-filter="all">All</button>
    <button class="filter-btn" data-filter="income">Income</button>
    <button class="filter-btn" data-filter="expense">Expenses</button>
  `;
  
  const transactionsSection = document.querySelector('.transactions-section .section-header');
  transactionsSection.appendChild(transactionFilter);
  
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      const filter = this.dataset.filter;
      const transactions = document.querySelectorAll('.transaction');
      
      transactions.forEach(transaction => {
        if (filter === 'all') {
          transaction.style.display = 'flex';
        } else {
          const isIncome = transaction.querySelector('.transaction-amount').classList.contains('positive');
          if ((filter === 'income' && isIncome) || (filter === 'expense' && !isIncome)) {
            transaction.style.display = 'flex';
          } else {
            transaction.style.display = 'none';
          }
        }
      });
    });
  });
});

function initDashboardCharts() {
  // Budget Chart
  const budgetCtx = document.getElementById('budgetChart');
  if (budgetCtx) {
    new Chart(budgetCtx, {
      type: 'bar',
      data: {
        labels: ['Housing', 'Food', 'Transport', 'Entertainment', 'Utilities', 'Savings'],
        datasets: [{
          label: 'Budgeted',
          data: [1200, 600, 400, 300, 250, 500],
          backgroundColor: '#4361ee',
          borderRadius: 4
        }, {
          label: 'Actual',
          data: [1200, 650, 420, 350, 230, 450],
          backgroundColor: '#4cc9f0',
          borderRadius: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              drawBorder: false
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            callbacks: {
              afterLabel: function(context) {
                const budgeted = context.dataset.data[context.dataIndex];
                const actual = context.chart.data.datasets[1].data[context.dataIndex];
                const difference = actual - budgeted;
                const percent = ((difference / budgeted) * 100).toFixed(1);
                
                if (difference > 0) {
                  return `Over budget by $${Math.abs(difference)} (${percent}%)`;
                } else if (difference < 0) {
                  return `Under budget by $${Math.abs(difference)} (${percent}%)`;
                } else {
                  return 'On budget';
                }
              }
            }
          }
        }
      }
    });
  }
}