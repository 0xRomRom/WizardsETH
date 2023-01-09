// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Wizards is ERC721, Ownable {
    using Strings for uint256;

    uint public MINT_PRICE;
    uint public TOTAL_SUPPLY;
    uint public CURRENT_SUPPLY;
    bool public isSaleActive;

    mapping(address => bool) private hasMinted;

    string public baseUri;
    string public baseExtension = ".json";


    constructor() ERC721("Wizzards", "WZRD") {
        // MINT_PRICE = 10000000000000000 wei; //0.01Eth
        MINT_PRICE = 1000000000000000 wei; //0.001Eth
        TOTAL_SUPPLY = 5;
        CURRENT_SUPPLY = 0;
        baseUri = "ipfs://bafybeidguyllhjn5ftdozosn4tzpdzd6fovw2mvsv4l3n7v5zhaxt77gz4/";
    }

    

    // Public Functions
    function mint() external payable {
        uint256 curTotalSupply = CURRENT_SUPPLY;
        // require(isSaleActive, "The sale is paused.");
        require(curTotalSupply + 1 <= TOTAL_SUPPLY, "Mint cap has been reached.");
        require(CURRENT_SUPPLY != TOTAL_SUPPLY, "Mint cap has been reached.");
        require(msg.value >= MINT_PRICE, "Not enough funds to mint.");
        // require(hasMinted[msg.sender] == false, "You have already minted.");
        hasMinted[msg.sender] = true;
        CURRENT_SUPPLY++;
        address(this).balance + msg.value;
        _safeMint(msg.sender, curTotalSupply + 1, "");
        tokenURI(curTotalSupply + 1);
        
    }


    function getBalance() external view returns (uint _balance) {
      return address(this).balance;
    }


    // Owner-only functions
    function flipSaleState() external onlyOwner {
        isSaleActive = !isSaleActive;
    }

    function setBaseUri(string memory _baseUri) external onlyOwner {
        baseUri = _baseUri;
    }

    function withdrawAll() external payable onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
 
        string memory currentBaseURI = _baseURI();
        return bytes(currentBaseURI).length > 0
            ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), baseExtension))
            : "";
    }
 
    function _baseURI() internal view virtual override returns (string memory) {
        return baseUri;
    }
}