import {CAPITALONE_KEY} from "../../keys.js";

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
    data.forEach(({ date, totalSum }) => {
        const [year, month, _] = date.split('-');

        if(month !== curr_mon){
            grouped.push([...temp])
            temp = [];
            curr_mon = month;
        }

        temp.push([months[parseInt(month)], totalSum]);
    });

    if(temp.length) grouped.push([...temp])

    return grouped;
}

async function getMerchantNames(merchantIds) {
    const merchantNames = [];
    const baseUrl = "http://api.nessieisreal.com";

    for (const item of merchantIds) {
        const response = await fetch(`${baseUrl}/merchants/${item.merchant_id}?key=${CAPITALONE_KEY}`);
        const merchantData = await response.json();
        if (merchantData.name) {
            merchantNames.push({...merchantData, time: new Date(item.purchase_date), price: item.amount});
        }
    }

    return merchantNames;
}

export async function getLastThreeMerchantNames(transactions) {
    const today = new Date();

    const validTransactions = transactions
        .filter(transaction => new Date(transaction.purchase_date) <= today)
        .sort((a, b) => new Date(b.purchase_date) - new Date(a.purchase_date))
        .slice(0, 3);

    const merchantNames = await getMerchantNames(validTransactions);
    return merchantNames;
}


async function fetchMerchants() {
    try {
        const response = await fetch("http://api.nessieisreal.com/merchants?key=" + CAPITALONE_KEY);

        if (response.ok) {
            const merchants = await response.json();
            return merchants;
        } else {
            console.error("Failed to fetch transactions. Status: ${response.status}");
            return [];
        }
    } catch (error) {
        console.error("Error fetching transactions:", error);
        return [];
    }
}

function getMerchantCategories(merchantId, merchants) {
    const merchant = merchants.find(m => m._id === merchantId);
    return merchant && Array.isArray(merchant.category) ? merchant.category : [];
}

function groupAndSumTransactionsByCategory(transactions, merchants) {
    const categorySums = {};

    transactions.forEach(transaction => {
        const merchantId = transaction.merchant_id;
        const amount = transaction.amount;

        const categories = getMerchantCategories(merchantId, merchants);

        categories.forEach(category => {
            if (categorySums[category]) {
                categorySums[category] += amount;
            } else {
                categorySums[category] = amount;
            }
        });
    });

    const result = Object.keys(categorySums).map(category => {
        return { category: category, totalSum: parseFloat(categorySums[category].toFixed(2)) };
    });

    return result;
}

export async function getGroupedTransactionsByCategory(transactions) {
    const merchants = await fetchMerchants();

    if (transactions && transactions.length > 0) {
        const groupedTransactions = groupAndSumTransactionsByCategory(transactions, merchants);

        return groupedTransactions;
    }
}

export const formatGroupedTransactions = (grouped) => {
    if(!grouped) return;
    let res = [];
    const sum = grouped.reduce((acc, curr) => acc + curr.totalSum, 0);
    let other = 0;
    for(const {category, totalSum} of grouped) {
        if(totalSum/sum < 0.08) {
            other += totalSum/sum;
        } else res.push({label: category, value: (totalSum / sum * 100).toFixed(1)});
    }
    res.push({label: "other", value: (other * 100).toFixed()});
    return res;
}

export const further_group = (grouped) => {
    let ref = {
        "Electronics": "Non Essentials",
        "badstuff": "Non Essentials",
        "furniture_store": "Non Essentials",
        "electronics_store": "Non Essentials",
        "sdaf": "Non Essentials",
        "home_goods_store": "Non Essentials",
        "point_of_interest": "Non Essentials",
        "store": "Non Essentials",
        "book_store": "Non Essentials",
        "bar": "Food",
        "restaurant": "Food",
        "food": "Food",
        "Food": "Food",
        "meal_takeaway": "Food",
        "establishment": "Utility",
        "lodging": "Utility",
        "car_repair": "Utility",
        "health": "Utility",
        "hardware_store": "Utility",
        "pharmacy": "Utility",
        "bill": "Utility",
        "test": "Utility"
    }
    let res = {"Non Essentials": 0, "Utility": 0, "Food": 0};

    for(const {category, totalSum} of grouped) {
        if(ref[category]) {
            res[ref[category]] += totalSum;
        } else {
            res["Utility"] += totalSum;
        }
    }

    return res;
}