// Replace with your Nessie API key

// Customer ID (provided)
const customerId = "66eede179683f20dd5189f63";

// Base URL for Nessie API
const baseUrl = "http://api.nessieisreal.com";

// Define the endpoint for fetching transactions
const url = `${baseUrl}/accounts/66ef454a9683f20dd518a575/purchases?key=${apiKey}`;

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

// Helper function to fetch the merchant names based on merchant IDs
async function getMerchantNames(merchantIds) {
    const merchantNames = [];

    for (const id of merchantIds) {
        const response = await fetch(`${baseUrl}/merchants/${id}?key=${apiKey}`);
        const merchantData = await response.json();
        if (merchantData.name) {
            merchantNames.push(merchantData.name);
        }
    }

    return merchantNames;
}

// Function to return the last 3 merchant_ids of the most recent transactions
async function getLastThreeMerchantNames() {
    // Get today's date
    const today = new Date();

    // Fetch transactions
    const transactions = await fetchTransactions(); // Add 'await' here

    // Parse the purchase_date as Date objects and filter out future transactions
    const validTransactions = transactions
        .filter(transaction => new Date(transaction.purchase_date) <= today)
        .sort((a, b) => new Date(b.purchase_date) - new Date(a.purchase_date)) // Sort by date (newest to oldest)
        .slice(0, 3); // Get the most recent 3 transactions

    // Extract the merchant IDs from the last 3 transactions
    const lastThreeMerchantIds = validTransactions.map(transaction => transaction.merchant_id);

    // Fetch and return merchant names based on merchant IDs
    const merchantNames = await getMerchantNames(lastThreeMerchantIds);
    return merchantNames;
}

// Call the function and log the result
getLastThreeMerchantNames()
    .then(merchantNames => {
        console.log("Last 3 Merchant Names:", merchantNames);
    })
    .catch(error => {
        console.error("Error fetching merchant names:", error);
    });