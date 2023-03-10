import contractABI from "./abi.js";

// Contract: 0x8EDD97Fc1665B7426a160463927694B37c4421b2

window.onload = () => {
  connectMetamask.classList.remove("hidden");
};

let account;
let contractInstance;
const ABI = contractABI;
const CONTRACT = "0xac084F5db68ee0Ba80AeCA734DA9AFD128F864d7";

const userWallet = document.querySelector(".user-acc");
const mintButton = document.querySelector(".mint-button");
const container = document.querySelector(".cont");
const connectMetamask = document.querySelector(".metamask");

(async () => {})();

connectMetamask.addEventListener("click", async () => {
  //Check if metamask is installed
  if (window.ethereum) {
    //Request current user
    await window.ethereum.send("eth_requestAccounts");

    //Initialize web3 class
    window.web3 = new Web3(window.ethereum);

    //Get array of accounts
    const accounts = await web3.eth.getAccounts();

    //Select first account
    account = accounts[0];

    //Display user wallet
    userWallet.textContent = account;
    container.classList.remove("hidden");
    mintButton.classList.remove("hidden");
    connectMetamask.classList.add("hidden");

    //Instantiate contract instance
    contractInstance = new web3.eth.Contract(ABI, CONTRACT);
  }
});

const mintNFT = async () => {
  // Amount minted
  let value;

  //Request amount minuted
  value = await contractInstance.methods.CURRENT_SUPPLY().call();

  //If cap is reached abort mint
  if (value === "5") {
    alert("Mint cap reached");
    return;
  }

  //Mint NFT
  await contractInstance.methods
    .mint()
    .send({ from: account, value: "1000000000000000" });
};

mintButton.addEventListener("click", mintNFT);
