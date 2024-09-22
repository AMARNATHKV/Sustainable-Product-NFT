import React, { useState } from 'react';

const ProductForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    productId: '',
    productName: '',
    description: '',
    ipfsMetadataHash: '',
    sustainabilityClaims: '',
    ipfsPhotoHash: '',        // New field
    ipfsVideoHash: '',        // New field
    manufacturingDate: '',    // New field
    expiryDate: ''            // New field
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 shadow-lg rounded-lg w-full">
      <input 
        name="productId" 
        placeholder="Product ID" 
        onChange={handleChange} 
        required 
        className="w-full p-4 rounded-lg border border-gray-300 focus:border-[#FFD700] focus:outline-none"
      />
      <input 
        name="productName" 
        placeholder="Product Name" 
        onChange={handleChange} 
        required 
        className="w-full p-4 rounded-lg border border-gray-300 focus:border-[#FFD700] focus:outline-none"
      />
      <textarea 
        name="description" 
        placeholder="Description" 
        onChange={handleChange} 
        required 
        className="w-full p-4 rounded-lg border border-gray-300 focus:border-[#FFD700] focus:outline-none"
      />
     
      <input 
        name="sustainabilityClaims" 
        placeholder="Sustainability Claims" 
        onChange={handleChange} 
        required 
        className="w-full p-4 rounded-lg border border-gray-300 focus:border-[#FFD700] focus:outline-none"
      />
      {/* New input fields for the updated contract */}
      <input 
        name="ipfsPhotoHash" 
        placeholder="IPFS Photo Hash" 
        onChange={handleChange} 
        required 
        className="w-full p-4 rounded-lg border border-gray-300 focus:border-[#FFD700] focus:outline-none"
      />
      
      <input 
        name="manufacturingDate" 
        placeholder="Manufacturing Date" 
        onChange={handleChange} 
        required 
        className="w-full p-4 rounded-lg border border-gray-300 focus:border-[#FFD700] focus:outline-none"
      />
      <input 
        name="expiryDate" 
        placeholder="Expiry Date" 
        onChange={handleChange} 
        required 
        className="w-full p-4 rounded-lg border border-gray-300 focus:border-[#FFD700] focus:outline-none"
      />
      <button 
        type="submit" 
        className="bg-gradient-to-r from-[#FFD700] to-[#FFD700] text-[#0c2239] py-3 px-6 rounded-lg w-full font-semibold text-lg transition duration-300 hover:bg-[#E5B800]"
      >
        Submit
      </button>
    </form>
  );
};


export default ProductForm;