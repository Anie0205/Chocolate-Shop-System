document.addEventListener('DOMContentLoaded', async () => {
    let web3;

    // Connect to MetaMask
    async function connectToMetaMask() {
        if (window.ethereum) {
            try {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                console.log('Connected to MetaMask!');
                document.querySelector('.chocolate-details').style.display = 'block';
                web3 = new Web3(window.ethereum);
            } catch (error) {
                console.error(error);
            }
        } else {
            console.error('MetaMask is not installed!');
        }
    }

    // Get Chocolate Details
    async function getChocolateDetails() {
        const chocolateId = document.getElementById('chocolateId').value;

        if (!chocolateId) {
            alert('Please enter a valid Chocolate ID');
            return;
        }

        // Here you can make a request to your backend to get chocolate details
        // Replace the placeholder with your actual backend URL
        const backendUrl = 'YOUR_BACKEND_URL_HERE';

        try {
            const response = await fetch(`${backendUrl}/chocolates/${chocolateId}`);
            const data = await response.json();
            displayChocolateDetails(data);
        } catch (error) {
            console.error(error);
            alert('Failed to get chocolate details from the backend');
        }
    }

    // Display Chocolate Details
    function displayChocolateDetails(details) {
        const chocolateDetailsDiv = document.getElementById('chocolateDetails');
        chocolateDetailsDiv.innerHTML = `
            <p><strong>Name:</strong> ${details.name}</p>
            <p><strong>Description:</strong> ${details.description}</p>
            <p><strong>Price:</strong> ${details.price} ETH</p>
            <p><strong>Available:</strong> ${details.available ? 'Yes' : 'No'}</p>
        `;
    }

    // Event listeners
    document.getElementById('connectButton').addEventListener('click', connectToMetaMask);
    document.getElementById('getDetailsButton').addEventListener('click', getChocolateDetails);
});
