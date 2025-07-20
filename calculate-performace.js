export function calculateDailyRealPerformance(dailyInvestedAmounts, paidAmounts) {
  // Hilfsfunktion, um Datum als String im Format YYYY-MM-DD zu bekommen
  function formatDate(date) {
    return date.toISOString().slice(0, 10);
  }

  // Alle Tage zwischen minDate und maxDate generieren
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

  // Wert am jeweiligen Tag finden (letzten bekannten Wert übernehmen)
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

  // Ermitteln von min und max Datum aus beiden Arrays
  const allDates = [
    ...dailyInvestedAmounts.map(d => d.date),
    ...paidAmounts.map(p => p.date)
  ];
  const minDate = allDates.reduce((a, b) => (a < b ? a : b));
  const maxDate = allDates.reduce((a, b) => (a > b ? a : b));

  // Berechnung der realen Performance pro Tag
  const result = getAllDates(minDate, maxDate).map(date => {
    const investedValue = getValueAtDate(date, dailyInvestedAmounts);
    const paidValue = getValueAtDate(date, paidAmounts);
    return {
      date,
      realPerformance: investedValue - paidValue,
      value: dailyInvestedAmounts.at(-1).value + (investedValue - paidValue)
    };
  });

  return result;
}
