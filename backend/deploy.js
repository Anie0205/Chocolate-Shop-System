const ethers = require("ethers");
const fs = require("fs-extra");


async function main() {
    const provider = new ethers.JsonRpcProvider(
      "https://eth-sepolia.g.alchemy.com/v2/Bn6CZfN_gOwBiWVZ_HVKtwgjrDtqS7N7"

    );

    const wallet = new ethers.Wallet(
      "3328e9a2f7a37a7271454987b545a42e0925a1fca573cdba24d90857ecbae2fb",
      provider
    );
    
    const abi = fs.readFileSync("./_ChocolateShop_sol_ChocolateShop.abi", "utf8"); 
    const binary = fs.readFileSync("./_ChocolateShop_sol_ChocolateShop.bin", "utf8"); 

    const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
    console.log("Contract is deploying...");
    const gasLimit = 6721975;
    
    const contract = await contractFactory.deploy({
      gasLimit: gasLimit
  });;
    console.log(contract);
    console.log("Contract deployed! - Ananya Verma 1RVU22CSE024");
    const conAddress = await contract.getAddress();
    console.log("Contract address:", conAddress);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });