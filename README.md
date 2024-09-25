# 🌱 SUSTAINABLE PRODUCT NFTs - README

## 📝 Overview

This project is a decentralized application (DApp) that allows brands and users to register and add sustainable products to the Ethereum blockchain. The product details are stored as NFTs on IPFS, and each product is associated with a QR code that consumers can scan to verify its authenticity and sustainability claims. This ensures transparency, trust, and verifiability of product information.

---

## ✨ Key Features

- *🌍 Add Sustainable Products*: Users can register products on the blockchain, which are stored as Non-Fungible Tokens (NFTs).
- *🔗 QR Code Generation*: Each product is associated with a unique QR code that consumers can scan to view the product details on the blockchain.
- *🛡️ Blockchain-based Storage*: Product data is stored in a decentralized manner using IPFS and Ethereum, ensuring tamper-proof and verifiable records.
- *🔐 MetaMask Integration*: Users can connect their MetaMask wallet for secure account management and interaction with the platform.

---

## ⚙️ Tech Stack

- *📜 Smart Contracts (Solidity)*: Ethereum smart contracts handle product registration, verification, and NFT minting.
- *🛠️ Hardhat*: Development environment for compiling, deploying, and testing smart contracts.
- *💻 Frontend (React.js)*: A React-based user interface for product management and QR code interactions.
- *🌐 IPFS*: Used for decentralized storage of product data.

---

## 🚀 Setup Instructions

### Prerequisites

- *🛠️ Node.js*: Ensure you have Node.js installed.
- *🦊 MetaMask*: MetaMask wallet extension installed in your browser.
- *⚙️ Hardhat*: Installed globally for smart contract development.

### Clone the Repository

bash
git clone https://github.com/your-username/Sustainable-Products-NFTs_DApp.git
cd Sustainable-Products-NFTs_DApp

### Frontend Setup
1.Navigate to the UI folder:
  bash
  cd ui

2.Install dependencies:
  bash
  npm install

### Hardhat Setup (Smart Contracts)
1.Navigate to the hardhat folder:

  bash
  cd hardhat

2.Install dependencies:

  bash
  npm install

## ▶️  Running the Project
1. Start the Hardhat Local Blockchain
The Hardhat environment provides a local Ethereum blockchain for development and testing.

  cd hardhat
  npx hardhat node

 This command will start the local blockchain and display a list of accounts with their private keys. Keep this terminal window open as it runs the blockchain node.

2. Deploy Smart Contracts
In a new terminal window/tab, navigate to the hardhat directory and run the deployment script.

bash
cd hardhat
npx hardhat run scripts/deploy.js --network localhost

This will deploy the smart contracts to the local Hardhat network. Note the contract address displayed after deployment.

3. Configure the Frontend
Ensure the frontend is aware of the deployed contract address. You may need to update environment variables or configuration files in the ui directory with the contract address and network details.

4. Start the UI In another terminal window/tab, navigate to the ui directory and start the development server.

bash
cd ui 
npm run dev

# 🛠️ Usage

### 1. Adding a Product

- *🔗 Connect Wallet*: Use a Web3 wallet (e.g., MetaMask) to connect to the application. Ensure it's connected to the local Hardhat network.
- *🌍 Add Product*: Navigate to the "Add Product" section and fill in the necessary details about the sustainable product.
- *🛠️ Mint NFT*: Submit the form to mint an NFT representing the product. This action will store the product data on IPFS and create a corresponding NFT on the Ethereum blockchain.
- *🔗 Generate QR Code*: Once minted, a QR code will be generated for the product. This QR code links to the NFT data stored on IPFS.

### 2. Viewing Product Details

- *📱 Scan QR Code*: Use a QR code scanner to scan the product's QR code.
- *🔍 Access Data*: The scanner will redirect to the product's NFT data, displaying all relevant sustainability information stored on the blockchain and IPFS.

---

## 📲 QR Code Integration

QR codes play a crucial role in bridging the physical product with its digital NFT counterpart. Here's how it's integrated:

- *🖨️ Generation*: After minting an NFT for a product, a unique QR code is generated using the product's IPFS hash or blockchain address.
- *🏷️ Embedding*: The QR code is attached to the physical product, allowing consumers to easily scan and access product information.
- *🛡️ Verification*: Scanning the QR code fetches the NFT data from IPFS and the Ethereum blockchain, ensuring the product's authenticity and sustainability claims.

---
## 🎥 Demo Video

Check out our live demo! 🎬👇

https://youtu.be/5OHzwrdS9VA?feature=shared

---

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
