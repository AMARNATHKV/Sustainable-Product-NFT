// import React, { useState, useEffect } from 'react';
// import { ethers } from 'ethers';
// import { useNavigate } from 'react-router-dom';
// import ProductForm from '../components/ProductForm';
// import Header from '../components/Header';
// import SustainableProductNFT from '../scdata/SustainableProductNFT.json';

// const contractAddress = "0xba9e9091e3BA7690D564890Bb87f6FB2E8C9C0Cb"; // Your contract address

// const SubmitProduct = () => {
//   const [account, setAccount] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const connectWallet = async () => {
//     try {
//       if (!window.ethereum) {
//         alert("Please install MetaMask!");
//         return;
//       }

//       const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
//       setAccount(accounts[0]);
//     } catch (err) {
//       console.error("Error connecting to MetaMask:", err);
//       setError("Failed to connect to MetaMask");
//     }
//   };

//   const handleProductSubmit = async (data) => {
//     const { 
//       productId, 
//       productName, 
//       description, 
//       ipfsMetadataHash, 
//       sustainabilityClaims, 
//       ipfsPhotoHash,      // New field
//       manufacturingDate,  // New field
//       expiryDate          // New field
//     } = data;
  
//     try {
//       if (!window.ethereum) {
//         alert("Please install MetaMask!");
//         return;
//       }
  
//       const provider = new ethers.BrowserProvider(window.ethereum);
//       const signer = await provider.getSigner();
  
//       const contract = new ethers.Contract(contractAddress, SustainableProductNFT.abi, signer);
  
//       const user = await contract.users(signer.getAddress());
//       if (!user.isRegistered) {
//         const txLogin = await contract.login();
//         await txLogin.wait();
//         alert("User logged in successfully!");
//       }
  
//       // Updated contract method with new fields
//       const tx = await contract.submitAndMintProduct(
//         productId,
//         productName,
//         description,
//         ipfsMetadataHash,
//         sustainabilityClaims,
//         ipfsPhotoHash,       // New field
//         manufacturingDate,   // New field
//         expiryDate,          // New field
//         { value: ethers.parseEther("0.01") }
//       );
  
//       await tx.wait();
//       alert("Product submitted and NFT minted successfully!");
//       navigate('/products');
//     } catch (err) {
//       console.error("Error submitting product:", err);
//       setError("Error submitting product: " + err.message);
//     }
//   };
  

//   return (
//     <>
//     <Header />
//     <div className="flex flex-col items-center min-h-screen bg-[#0c2239]">
      
//       <h2 className="text-4xl font-bold mt-8 mb-6 text-[#FFD700] text-center">Submit a New Product</h2>
//       <div className="w-full max-w-2xl">
//         <ProductForm onSubmit={handleProductSubmit} />
//         {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
//       </div>
//     </div>
//     </>
//   );
// };

// export default SubmitProduct;
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useNavigate } from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import Header from '../components/Header';
import SustainableProductNFT from '../scdata/SustainableProductNFT.json';

const contractAddress = "0xba9e9091e3BA7690D564890Bb87f6FB2E8C9C0Cb"; // Your contract address

const SubmitProduct = () => {
  const [account, setAccount] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Connect wallet function
  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
    } catch (err) {
      console.error("Error connecting to MetaMask:", err);
      setError("Failed to connect to MetaMask");
    }
  };

  // Handle product submission
  const handleProductSubmit = async (data) => {
    const { 
      productId, 
      productName, 
      description, 
      ipfsMetadataHash, 
      sustainabilityClaims, 
      ipfsPhotoHash,      // New field for the product image hash
      manufacturingDate,  // New field for the manufacturing date
      expiryDate          // New field for the expiry date
    } = data;
  
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
      }
  
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
  
      const contract = new ethers.Contract(contractAddress, SustainableProductNFT.abi, signer);
  
      // Ensure the user is registered in the contract
      const user = await contract.users(signer.getAddress());
      if (!user.isRegistered) {
        const txLogin = await contract.login();
        await txLogin.wait();
        alert("User logged in successfully!");
      }
  
      // Call the smart contract to submit and mint the product NFT
      const tx = await contract.submitAndMintProduct(
        productId,
        productName,
        description,
        ipfsMetadataHash,
        sustainabilityClaims,
        ipfsPhotoHash,       // Include product image hash
        manufacturingDate,   // Include manufacturing date
        expiryDate,          // Include expiry date
        { value: ethers.parseEther("0.01") } // Payment for minting
      );
  
      await tx.wait();
      alert("Product submitted and NFT minted successfully!");
      navigate('/products');
    } catch (err) {
      console.error("Error submitting product:", err);
      setError("Error submitting product: " + err.message);
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center min-h-screen bg-[#0c2239]">
        <h2 className="text-4xl font-bold mt-8 mb-6 text-[#FFD700] text-center">Submit a New Product</h2>
        <div className="w-full max-w-2xl">
          <ProductForm onSubmit={handleProductSubmit} />
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </div>
      </div>
    </>
  );
};

export default SubmitProduct;
