const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export function dateDifference(date1, date2, unit = 'days') {
    const diffInMs = Math.abs(date2 - date1);
    const msInMinute = 60 * 1000;
    const msInHour = msInMinute * 60;
    const msInDay = msInHour * 24;

    switch (unit) {
        case 'minutes':
            return Math.floor(diffInMs / msInMinute);
        case 'hours':
            return Math.floor(diffInMs / msInHour);
        case 'days':
            return Math.floor(diffInMs / msInDay);
        default:
            return diffInMs;
    }
}

function groupAndSumTransactions(transactions) {
    const dateSums = {};

    transactions.forEach(transaction => {
        const date = transaction.purchase_date;
        const amount = transaction.amount;

        if (dateSums[date]) {
            dateSums[date] += amount;
        } else {
            dateSums[date] = amount;
        }
    });

    const result = Object.keys(dateSums).map(date => {
        return { date: date, totalSum: parseFloat(dateSums[date].toFixed(2)) };
    });

    result.sort((a, b) => new Date(a.date) - new Date(b.date));

    return result;
}

export function getGroupedTransactions(transactions) {

    if (transactions && transactions.length > 0) {
        return groupSumsByMonth(groupAndSumTransactions(transactions));
    }
}

function groupSumsByMonth(data) {
    const grouped = [];

    let temp = [];
    let curr_mon = "00";
    // Iterate through the data
    data.forEach(({ date, totalSum }) => {
        // Extract the year and month (YYYY-MM format)
        const [year, month, _] = date.split('-');

        if(month !== curr_mon){
            grouped.push([...temp])
            temp = [];
            curr_mon = month;
        }

        temp.push([months[parseInt(month)], totalSum]);
    });

    if(temp.length) grouped.push([...temp])

    // Convert the grouped object into an array of arrays
    return grouped;
}
