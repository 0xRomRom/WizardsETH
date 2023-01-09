import contractABI from "./abi.js";

// Contract: 0x8EDD97Fc1665B7426a160463927694B37c4421b2

window.onload = () => {};

let account;
let contractInstance;
const ABI = contractABI;
const CONTRACT = "0xe4d410eeAaB6597194223127D6c59b929f696aea";

const userWallet = document.querySelector(".user-acc");
const mintButton = document.querySelector(".mint-button");

(async () => {
  if (window.ethereum) {
    //User sign in to Metamask and store wallet address
    await window.ethereum.send("eth_requestAccounts");
    window.web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    account = accounts[0];
    userWallet.textContent = account;

    //Instantiate contract instance
    contractInstance = new web3.eth.Contract(ABI, CONTRACT);
  }
})();

const mintNFT = async () => {
  let value;
  value = await contractInstance.methods.CURRENT_SUPPLY().call();
  if (value === "5") {
    alert("Mint cap reached");
    return;
  }
  await contractInstance.methods
    .mint()
    .send({ from: account, value: "1000000000000000" });
};

mintButton.addEventListener("click", mintNFT);
