import Chart from 'chart.js';

function createChart(data) {
    const ctx = document.getElementById('myChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.labels, // e.g., ['Jan', 'Feb', 'Mar']
            datasets: [{
                label: 'Active Users',
                data: data.values, // e.g., [10, 20, 30]
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            }],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
} 