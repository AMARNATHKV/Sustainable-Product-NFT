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

        {isCreator ? (
          <>
            <p className="text-gray-700 mb-2">{product.description}</p>
            <p className="text-gray-700 mb-2">
              <strong>Sustainability Claims:</strong> {product.sustainabilityClaims}
            </p>
          </>
        ) : viewDetails ? (
          <>
            <p className="text-gray-700 mb-2">{product.description}</p>
            <p className="text-gray-700 mb-2">
              <strong>Sustainability Claims:</strong> {product.sustainabilityClaims}
            </p>
          </>
        ) : (
          <>
            <p className="text-gray-600 mb-2">Scan the QR code to see full information.</p>
            <div className="flex justify-center my-4">
              <QRCode
                size={128}
                value={`Product Name: ${product.productName}, Description: ${product.description}, Sustainability Claims: ${product.sustainabilityClaims} `}
              />
            </div>
            
          </>
        )}
      </div>
    </div>
  );
};

export default ProductCard;