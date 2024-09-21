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
