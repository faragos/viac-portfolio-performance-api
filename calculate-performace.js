export function calculateDailyRealPerformance(dailyInvestedAmounts, paidAmounts) {
  function formatDate(date) {
    return date.toISOString().slice(0, 10);
  }

  function getAllDates(minDate, maxDate) {
    const dates = [];
    let current = new Date(minDate);
    const last = new Date(maxDate);
    while (current <= last) {
      dates.push(formatDate(current));
      current.setDate(current.getDate() + 1);
    }
    return dates;
  }

  function getValueAtDate(date, arr) {
    const sorted = arr.slice().sort((a, b) => a.date.localeCompare(b.date));
    let value = 0;
    for (const item of sorted) {
      if (item.date <= date) {
        value = item.value;
      } else {
        break;
      }
    }
    return value;
  }

  const allDates = [
    ...dailyInvestedAmounts.map(d => d.date),
    ...paidAmounts.map(p => p.date)
  ];
  const minDate = allDates.reduce((a, b) => (a < b ? a : b));
  const maxDate = allDates.reduce((a, b) => (a > b ? a : b));

  let summedInvestments = dailyInvestedAmounts.at(-1).value

  const result = getAllDates(minDate, maxDate).map(date => {
    const investedValue = getValueAtDate(date, dailyInvestedAmounts);
    const paidValue = getValueAtDate(date, paidAmounts);
    
    const performanceOnInitalInvestment = summedInvestments + (investedValue - paidValue) 
    return {
      date,
      realPerformance: investedValue - paidValue,
      investedValue: investedValue,
      todaysValue: summedInvestments + (investedValue - paidValue),
      relativePerformance: (1 / summedInvestments * performanceOnInitalInvestment),
    };
  });

  return result;
}
