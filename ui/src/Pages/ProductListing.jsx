import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import SustainableProductNFT from '../scdata/SustainableProductNFT.json';

const contractAddress = "0xba9e9091e3BA7690D564890Bb87f6FB2E8C9C0Cb"; // Replace with your contract address

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [account, setAccount] = useState('');

  useEffect(() => {
    const connectWallet = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(accounts[0]);
      }
    };
    connectWallet();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!window.ethereum) {
          alert("Please install MetaMask!");
          return;
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, SustainableProductNFT.abi, signer);

        // Get the total number of products
        const productCount = await contract.getProductCount();
        const productList = [];

        // Fetch each product's details using its index
        for (let i = 0; i < productCount; i++) {
          const product = await contract.getProductDetails(i);
          productList.push({
            productId: i, // This allows fetching details via the productId
            productName: product.productName,
            description: product.description,
            ipfsMetadataHash: product.ipfsMetadataHash,
            sustainabilityClaims: product.sustainabilityClaims,
            creator: product.creator,
          });
        }

        setProducts(productList);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Product Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard 
              key={product.productId}
              product={product}
              account={account} // Pass the current account to ProductCard
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
