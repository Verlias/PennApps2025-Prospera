// Replace with your Nessie API key

// Customer ID (provided)
const customerId = "66eede179683f20dd5189f63";

// Base URL for Nessie API
const baseUrl = "http://api.nessieisreal.com";

// Define the endpoint for fetching transactions
const url = `${baseUrl}/accounts/${customerId}/purchases?key=${apiKey}`;

// Function to fetch transactions for the given customer ID
async function fetchTransactions() {
    try {
        // Make the GET request to the API
        const response = await fetch(url);

        // Check if the request was successful
        if (response.ok) {
            const transactions = await response.json();
            return transactions;
        } else {
            console.error(`Failed to fetch transactions. Status: ${response.status}`);
            return [];
        }
    } catch (error) {
        console.error("Error fetching transactions:", error);
        return [];
    }
}

// Function to group and sum transactions by date
function groupAndSumTransactions(transactions) {
    const dateSums = {};

    // Loop through each transaction
    transactions.forEach(transaction => {
        const date = transaction.purchase_date;
        const amount = transaction.amount;

        // If the date already exists in the dateSums, add the amount
        if (dateSums[date]) {
            dateSums[date] += amount;
        } else {
            // Otherwise, initialize the date with the current amount
            dateSums[date] = amount;
        }
    });

    const result = Object.keys(dateSums).map(date => {
        // Round the total sum to two decimal places
        return { date: date, totalSum: parseFloat(dateSums[date].toFixed(2)) };
    });

    // Sort the array by date (oldest to newest)
    result.sort((a, b) => new Date(a.date) - new Date(b.date));

    return result;
}

// Main function to get the transactions and group/sum them by date
async function getGroupedTransactions() {
    const transactions = await fetchTransactions();

    if (transactions && transactions.length > 0) {
        // Group and sum the transactions by date
        const groupedTransactions = groupAndSumTransactions(transactions);

        // Output the result
        console.log(groupedTransactions);
    } else {
        console.log("No transactions found.");
    }
}

// Call the main function to execute the process
getGroupedTransactions();