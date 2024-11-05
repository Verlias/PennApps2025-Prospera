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
async function fetchMerchants() {
    try {
        // Make the GET request to the API
        const response = await fetch("http://api.nessieisreal.com/merchants?key=48cf691d70b7d36ecc00e312b3598cd5");

        // Check if the request was successful
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



// Function to find merchant categories based on merchant_id
function getMerchantCategories(merchantId, merchants) {
    const merchant = merchants.find(m => m._id === merchantId);
    return merchant && Array.isArray(merchant.category) ? merchant.category : []; // Ensure it returns an array
}

// Function to group and sum transactions by category
function groupAndSumTransactionsByCategory(transactions, merchants) {
    const categorySums = {};

    // Loop through each transaction
    transactions.forEach(transaction => {
        const merchantId = transaction.merchant_id;
        const amount = transaction.amount;

        // Get the categories for the merchant
        const categories = getMerchantCategories(merchantId, merchants);

        // Loop through each category and sum the transaction amount
        categories.forEach(category => {
            if (categorySums[category]) {
                categorySums[category] += amount;
            } else {
                // Initialize the category with the current amount
                categorySums[category] = amount;
            }
        });
    });

    // Convert categorySums object into an array
    const result = Object.keys(categorySums).map(category => {
        return { category: category, totalSum: parseFloat(categorySums[category].toFixed(2)) };
    });

    return result;
}

// Main function to get the transactions and group/sum them by category
async function getGroupedTransactionsByCategory() {
    const transactions = await fetchTransactions();
    const merchants = await fetchMerchants();

    if (transactions && transactions.length > 0) {
        // Group and sum the transactions by category
        const groupedTransactions = groupAndSumTransactionsByCategory(transactions, merchants);

        // Output the result
        console.log(groupedTransactions);
    } else {
        console.log("No transactions found.");
    }
}

// Call the main function to execute the process
getGroupedTransactionsByCategory();