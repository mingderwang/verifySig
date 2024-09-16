import { ethers, hashMessage } from 'ethers';

const privateKey = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"; // Replace with your private key
const wallet = new ethers.Wallet(privateKey);

const message = "Hello, world!";
const messageHash = hashMessage(message); // Equivalent to keccak256 hash
console.log(messageHash)

async function signMessage() {
    const signature = await wallet.signMessage(ethers.getBytes(messageHash));
    console.log("Signature:", signature);
}

signMessage();

