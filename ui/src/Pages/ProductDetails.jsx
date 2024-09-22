import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ethers } from 'ethers';
import SustainableProductNFT from '../scdata/SustainableProductNFT.json'; // Import ABI

const contractAddress = "0xba9e9091e3BA7690D564890Bb87f6FB2E8C9C0Cb"; // Replace with your contract address

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        if (!window.ethereum) {
          alert("Please install MetaMask!");
          return;
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, SustainableProductNFT.abi, provider);
        
        // Fetch product details by productId
        const productDetails = await contract.getProductDetails(productId);
        setProduct(productDetails);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center p-8 bg-white shadow-md rounded-lg max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">{product.productName}</h1>
      <p className="text-lg mb-2"><strong>Description:</strong> {product.description}</p>
      <p className="text-lg mb-2"><strong>Sustainability Claims:</strong> {product.sustainabilityClaims}</p>
      <a
        href={`https://ipfs.io/ipfs/${product.ipfsMetadataHash}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline mt-4"
      >
        View on IPFS
      </a>
    </div>
  );
};

export default ProductDetails;
