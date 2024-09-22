
import React, { useState } from 'react';
import QRCode from 'react-qr-code';

const ProductCard = ({ product, account }) => {
  const isCreator = product.creator.toLowerCase() === account.toLowerCase();
  const [viewDetails, setViewDetails] = useState(false);

  const handleViewDetailsClick = () => {
    setViewDetails(true);
  };

  return (
    <div className="border border-gray-300 rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105 hover:shadow-xl duration-300">
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{product.productName}</h3>

        {isCreator || viewDetails ? (
          <>
            <p className="text-gray-700 mb-2">{product.description}</p>
            <p className="text-gray-700 mb-2">
              <strong>Sustainability Claims:</strong> {product.sustainabilityClaims}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Manufacturing Date:</strong> {product.manufacturingDate}
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Expiry Date:</strong> {product.expiryDate}
            </p>
          </>
        ) : (
          <>
            <p className="text-gray-600 mb-2">Scan the QR code to see full information.</p>
            <div className="flex justify-center my-4">
              <QRCode
                size={128}
                value={`Product Name: ${product.productName}, Description: ${product.description}, Sustainability Claims: ${product.sustainabilityClaims}`}
              />
            </div>
            <button
              onClick={handleViewDetailsClick}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out transform hover:scale-105"
            >
              View Details
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

