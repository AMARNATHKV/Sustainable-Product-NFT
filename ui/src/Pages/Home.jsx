import React from 'react';
import Header from '../components/Header';
import Login from './Login';

const Home = () => {
  return (
    <div>
      <Header />
      {/* <div className="p-8"> */}
        <Login />
        {/* <h2 className="text-xl text-center mt-8 font-semibold text-gray-700">Welcome to the Sustainable Product NFT platform!</h2> */}
      {/* </div> */}
    </div>
  );
};

export default Home;