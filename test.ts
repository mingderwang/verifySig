import { ethers } from 'ethers';

// Step 1: Set up a wallet (use your private key)
const privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"; // Replace with your private key
const wallet = new ethers.Wallet(privateKey);

// Step 2: Hash the message to be signed (message should be in bytes32 format)
const message = "Hello, world!";
const messageHash = ethers.utils.id(message); // Equivalent to keccak256 hash
console.log(messageHash)

// Step 3: Sign the message hash
async function signMessage() {
    const signature = await wallet.signMessage(ethers.utils.arrayify(messageHash));
    console.log("Signature:", signature);
}

signMessage();

