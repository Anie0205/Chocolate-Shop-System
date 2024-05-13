const contractAddress = '0x4588cFb08303C90076F9a31e49968cEbb2541AE0';
const contractABI = [{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"string","name":"_name","type":"string"},{"internalType":"string","name":"_description","type":"string"},{"internalType":"uint256","name":"_price","type":"uint256"}],"name":"addChocolate","outputs":[{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"chocolates","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"description","type":"string"},{"internalType":"uint256","name":"price","type":"uint256"},{"internalType":"bool","name":"available","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"getChocolateDetails","outputs":[{"internalType":"string","name":"","type":"string"},{"internalType":"string","name":"","type":"string"},{"internalType":"uint256","name":"","type":"uint256"},{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"bool","name":"_available","type":"bool"}],"name":"updateAvailability","outputs":[],"stateMutability":"nonpayable","type":"function"}];

async function connect() {
    try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log('Wallet connected');
        loadVotes();
    } catch (error) {
        console.error('Error connecting wallet:', error);
    }
}

async function getChocolateDetails() {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const chocolateIdInput = document.getElementById('chocolateId');
    const chocolateId = chocolateIdInput.value.trim();
    try {
      const details = await contract.methods.getChocolateDetails(chocolateId).call();
      displayChocolateDetails(details);
    } catch (error) {
      console.error(error);
      alert('Failed to get chocolate details');
    }
  }

  function displayChocolateDetails(details) {
    const chocolateDetailsDiv = document.getElementById('chocolateDetails');
   chocolateDetailsDiv.innerHTML = `
      <p><strong>Name:</strong> ${details[0]}</p>
      <p><strong>Description:</strong> ${details[1]}</p>
      <p><strong>Price:</strong> ${details[2]} ETH</p>
      <p><strong>Available:</strong> ${details[3]? 'Yes' : 'No'}</p>
    `;
  }

async function addChocolate() {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const idInput = document.getElementById('chocolateId');
    const id = idInput.value.trim();
    const name = prompt('Enter Chocolate Name:');
    const description = prompt('Enter Chocolate Description:');
    const price = prompt('Enter Chocolate Price:');
  
    if (!id || !name || !description || !price) {
      alert('Please fill in all fields!');
      return;
    }
  
    try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        const from = accounts[0];
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        await contract.methods.addChocolate(id,name,description,price).send({ from });
        console.log('added chocolate');
        //if req call a function to display enetered values
        alert('Chocolate added successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to add chocolate');
    }
  }

    async function updateAvailability() {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(contractABI, contractAddress);
    const idInput = document.getElementById('chocolateId');
    const id = idInput.value.trim();
    var availabilitySelect = document.getElementById("availability");
    var selectedValue = availabilitySelect.options[availabilitySelect.selectedIndex].value;
    var available = selectedValue === "yes" ? true : false;

    if (!id) {
      alert('Please enter a valid chocolate ID!');
      return;
    }
    
    try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3.eth.getAccounts();
        const from = accounts[0];
        const contract = new web3.eth.Contract(contractABI, contractAddress);
        await contract.methods.updateAvailability(id,available).send({ from });
        console.log('updated chocolate availability');
        alert('Availability updated successfully');
    } catch (error) {
      console.error(error);
      alert('Failed to update availability');
    }
  }