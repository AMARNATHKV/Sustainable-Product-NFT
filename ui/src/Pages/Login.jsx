import React, { useState } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import SustainableProductNFT from "../scdata/SustainableProductNFT.json"; // Adjust the path as needed

const contractAddress = "0x0bAC2940cd53b93Bf79CC66a8c26814e6e3446cf"; // Your contract address

const Login = () => {
  const [account, setAccount] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const loginWithMetaMask = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const userAddress = await signer.getAddress();
        setAccount(userAddress);

        const networkId = (await provider.getNetwork()).chainId;
        const contractInstance = new ethers.Contract(contractAddress, SustainableProductNFT.abi, signer);

        const tx = await contractInstance.login();
        await tx.wait();
        alert("Logged in successfully!");

        // Redirect to /products after successful login
        navigate("/products");

      } catch (err) {
        console.error("Error logging in:", err);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  return (
    <div className="flex flex-row items-center justify-center min-h-screen bg-[#0c2239]">
      {/* Left side for login */}
      <div className="flex flex-col items-center justify-center w-1/2 h-full p-10">
        <h2 className="text-[50px] font-bold mb-4 text-center text-[#FFD700]">VERIFIED NFTs FOR AUTHENTIC, ECO-FRIENDLY PRODUCTS</h2>
        <div className=" rounded-lg p-10 w-96">
          <h2 className="text-2xl font-semibold mb-6 text-center text-white">Login with MetaMask</h2>
          <button
            onClick={loginWithMetaMask}
            className="bg-gradient-to-r from-[#FFD700] to-[#FFD700] text-[#0c2239] py-3 px-6 rounded-full w-full font-semibold text-lg transition duration-300 hover:bg-[#E5B800]"
          >
            {account ? `Logged in as: ${account}` : "Login"}
          </button>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>
      </div>

      {/* Right side for spinning image */}
      <div className="w-1/2 h-full flex items-center justify-center">
        <img
          src="https://www.arenasolutions.com/wp-content/uploads/what-are-sustainable-products.png"
          alt="Eco-friendly products"
          className="h-[500px] max-w-full rounded-lg  animate-spin-slow"
        />
      </div>
    </div>
  );
};

export default Login