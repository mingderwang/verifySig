import { id, ethers, Wallet, Contract, Signature } from 'ethers';
const contractAddress = "0xf554DA5e35b2e40C09DDB481545A395da1736513";
const contract = new Contract(contractAddress, [
  "function recoverStringFromCompact(string message, (bytes32 r, bytes32 yParityAndS) sig) pure returns (address)",
  "function recoverStringFromExpanded(string message, (uint8 v, bytes32 r, bytes32 s) sig) pure returns (address)",
  "function recoverStringFromVRS(string message, uint8 v, bytes32 r, bytes32 s) pure returns (address)",
  "function recoverStringFromRaw(string message, bytes sig) pure returns (address)",
  "function recoverHashFromCompact(bytes32 hash, (bytes32 r, bytes32 yParityAndS) sig) pure returns (address)"
], new ethers.InfuraProvider("sepolia"));

// The Signer; it does not need to be connected to a Provider to sign
const signer = new Wallet(id("foobar"));
console.log('signer: ' + signer.address)

// Our message
const message = "Hello World";
console.log('message: ' + message)

// The raw signature; 65 bytes
const rawSig = await signer.signMessage(message);
// '0xa617d0558818c7a479d5063987981b59d6e619332ef52249be8243572ef1086807e381afe644d9bb56b213f6e08374c893db308ac1a5ae2bf8b33bcddcb0f76a1b'
console.log('rawSig: ' + rawSig)

const sig = Signature.from(rawSig);
// Signature { r: "0xa617d0558818c7a479d5063987981b59d6e619332ef52249be8243572ef10868", s: "0x07e381afe644d9bb56b213f6e08374c893db308ac1a5ae2bf8b33bcddcb0f76a", yParity: 0, networkV: null }

console.log(sig)

// If the signature matches the EIP-2098 format, a Signature
// can be passed as the struct value directly, since the
// parser will pull out the matching struct keys from sig.
const signerAddress = await contract.recoverStringFromCompact(message, sig);
// '0x0A489345F9E9bc5254E18dd14fA7ECfDB2cE5f21'

console.log('recover signer address: ' + signerAddress)


