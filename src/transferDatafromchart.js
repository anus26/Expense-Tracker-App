export const transformDataForPieChart = (visits, field) => {
  if (!Array.isArray(visits)) return { labels: [], datasets: [{ data: [] }] };

  const count = {};
  visits.forEach((v) => {
    const key = v[field];
    count[key] = (count[key] || 0) + 1;
  });

  return {
    labels: Object.keys(count),
    datasets: [{
      data: Object.values(count),
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8e44ad', '#2ecc71'],
    }],
  };
};