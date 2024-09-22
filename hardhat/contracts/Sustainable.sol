// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract SustainableProductNFT is ERC721, Ownable {
    struct Product {
        string productName;
        string description;
        string ipfsMetadataHash;
        string ipfsPhotoHash;       // IPFS hash for the product's photo
        string sustainabilityClaims;
        uint256 nftTokenId;
        bool isMinted;
        address creator;            // Address of the product creator
        uint256 manufacturingDate;  // Unix timestamp of manufacturing date
        uint256 expiryDate;         // Unix timestamp of expiry date
    }

    struct User {
        address userAddress;
        bool isRegistered;
    }

    mapping(uint256 => Product) public products;
    mapping(address => User) public users;

    uint256 public nextTokenId;
    uint256 public productCount;
    uint256 public nftPrice = 0.01 ether;

    event ProductMinted(address indexed buyer, uint256 tokenId, string ipfsMetadataHash);
    event UserLoggedIn(address indexed userAddress);
    event ProductSubmitted(address indexed submitter, uint256 productId);

    modifier notMinted(uint256 productId) {
        require(!products[productId].isMinted, "Product already has an NFT.");
        _;
    }

    modifier onlyRegistered() {
        require(users[msg.sender].isRegistered, "User not logged in or registered.");
        _;
    }

    constructor() ERC721("SustainableProductNFT", "SPNFT") Ownable(msg.sender) {
        nextTokenId = 0;
        productCount = 0;
    }

    function login() external {
        require(!users[msg.sender].isRegistered, "User already logged in or registered.");
        users[msg.sender] = User(msg.sender, true);
        emit UserLoggedIn(msg.sender);
    }

    function submitAndMintProduct(
        uint256 productId,
        string memory _productName,
        string memory _description,
        string memory _ipfsMetadataHash,
        string memory _ipfsPhotoHash,
        string memory _sustainabilityClaims,
        uint256 _manufacturingDate,
        uint256 _expiryDate
    ) public payable onlyRegistered notMinted(productId) {
        require(msg.value >= nftPrice, "Insufficient payment for minting NFT.");

        products[productId] = Product({
            productName: _productName,
            description: _description,
            ipfsMetadataHash: _ipfsMetadataHash,
            ipfsPhotoHash: _ipfsPhotoHash,        // Set the photo hash
            sustainabilityClaims: _sustainabilityClaims,
            nftTokenId: nextTokenId,
            isMinted: true,
            creator: msg.sender,                 // Set the creator's address
            manufacturingDate: _manufacturingDate, // Set manufacturing date
            expiryDate: _expiryDate               // Set expiry date
        });

        _mint(msg.sender, nextTokenId);
        emit ProductMinted(msg.sender, nextTokenId, _ipfsMetadataHash);

        nextTokenId++;
        productCount++;
        emit ProductSubmitted(msg.sender, productId);
    }

    function getProductDetails(uint256 productId)
        public
        view
        returns (
            string memory productName,
            string memory description,
            string memory ipfsMetadataHash,
            string memory ipfsPhotoHash,
            string memory sustainabilityClaims,
            uint256 nftTokenId,
            bool isMinted,
            address creator,
            uint256 manufacturingDate,
            uint256 expiryDate
        )
    {
        Product storage product = products[productId];
        return (
            product.productName,
            product.description,
            product.ipfsMetadataHash,
            product.ipfsPhotoHash,        // Return the photo hash
            product.sustainabilityClaims,
            product.nftTokenId,
            product.isMinted,
            product.creator,
            product.manufacturingDate,    // Return manufacturing date
            product.expiryDate            // Return expiry date
        );
    }

    function getProductCount() public view returns (uint256) {
        return productCount;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        for (uint256 i = 0; i < nextTokenId; i++) {
            if (products[i].nftTokenId == tokenId) {
                return string(abi.encodePacked("ipfs://", products[i].ipfsMetadataHash));
            }
        }
        return "";
    }

    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
