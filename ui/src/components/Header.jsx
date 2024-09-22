import React from 'react';

const Header = () => {
  return (
    <header className="bg-[#1b2a41] text-white p-4 shadow-md h-[120px]">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo on the top left */}
        <div className="flex items-center space-x-2">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp4Bvhn9m36mIuSoeAiIIW4FvcvD9T9Lpeh6ooHFOaTjhZP7A9" // Replace with the actual logo path
            alt="Logo"
            className="h-20 w-20" // Adjust the size of the logo
          />
          <h1 className="text-white text-[30px] font-bold tracking-wide font-inter">
            SUSTAINABLE PRODUCT NFTs
          </h1>
        </div>

        {/* Center Navigation */}
        <nav className="flex space-x-8 text-white uppercase font-medium tracking-wide text-xl font-inter">
          <a href="/" className="hover:text-yellow-300 transition duration-300">
            Home
          </a>
          <a
            href="/submit-product"
            className="hover:text-yellow-300 transition duration-300"
          >
            Submit Product
          </a>
          <a
            href="/products"
            className="hover:text-yellow-300 transition duration-300"
          >
            Product Listing
          </a>
        </nav>

        {/* Right side (if you want any buttons/icons on the right side, you can add them here) */}
      </div>
    </header>
  );
};

export default Header;