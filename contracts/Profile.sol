// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import {IERC20} from "@openzeppelin/contracts/interfaces/IERC20.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import {ERC721Enumerable} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@zetachain/protocol-contracts/contracts/evm/tools/ZetaInteractor.sol";
import "@zetachain/protocol-contracts/contracts/evm/interfaces/ZetaInterfaces.sol";

contract Profile is ERC721, ZetaInteractor, ZetaReceiver {  
    mapping(uint256 => string) public profileHandle; // tokenId => handle
    mapping(string => uint256) public handleToTokenId; // handle => tokenId
    uint256 public price = 0.0001 ether; // 0.0001 ETH

    event CrossChainNFTEvent(address, uint256);
    event CrossChainNFTRevertedEvent(address, uint256);
 
    ZetaTokenConsumer private immutable _zetaConsumer;
    IERC20 internal immutable _zetaToken;
    uint256 private _tokenIds;

    constructor(
        address initialOwner,  
        address connectorAddress,
        address zetaTokenAddress,
        address zetaConsumerAddress,
        bool useEven
      ) 
      ERC721("Profile", "Profile") 
      ZetaInteractor(connectorAddress) {
        _zetaToken = IERC20(zetaTokenAddress);
        _zetaConsumer = ZetaTokenConsumer(zetaConsumerAddress);

        _tokenIds++;
        if (useEven) _tokenIds++;
    }

    function sendMessage(
        uint256 destinationChainId,
        address to,
        uint256 token
    ) external payable {
        if (!_isValidChainId(destinationChainId))
            revert InvalidDestinationChainId();
 
        uint256 crossChainGas = 2 * (10 ** 18);
        uint256 zetaValueAndGas = _zetaConsumer.getZetaFromEth{
            value: msg.value
        }(address(this), crossChainGas);
        _zetaToken.approve(address(connector), zetaValueAndGas);
 
        _burn(token);
 
        connector.send(
            ZetaInterfaces.SendInput({
                destinationChainId: destinationChainId,
                destinationAddress: interactorsByChainId[destinationChainId],
                destinationGasLimit: 300000,
                message: abi.encode(to, token, msg.sender),
                zetaValueAndGas: zetaValueAndGas,
                zetaParams: abi.encode("")
            })
        );
    }
 
    function onZetaMessage(
        ZetaInterfaces.ZetaMessage calldata zetaMessage
    ) external override isValidMessageCall(zetaMessage) {
        (address to, uint256 token) = abi.decode(
            zetaMessage.message,
            (address, uint256)
        );
 
        _safeMint(to, token);
 
        emit CrossChainNFTEvent(to, token);
    }
 
    function onZetaRevert(
        ZetaInterfaces.ZetaRevert calldata zetaRevert
    ) external override isValidRevertCall(zetaRevert) {
        (address to, uint256 token, address from) = abi.decode(
            zetaRevert.message,
            (address, uint256, address)
        );
 
        _safeMint(from, token);
 
        emit CrossChainNFTRevertedEvent(to, token);
    }
    
    function registerHandle(string memory username) external payable {
        mint(msg.sender, username);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
    }

    function mint(address _to, string memory username) public payable {
        require(msg.value >= price, "Insufficient amount");
        require(handleToTokenId[username] == 0, "Handle already exists");
        require(this.balanceOf(_msgSender()) == 0, "Only one profile handle per wallet");

        _tokenIds++;
        _tokenIds++;

        _safeMint(_to, _tokenIds);
        handleToTokenId[username] = _tokenIds;
        profileHandle[_tokenIds] = username;
    }

    function withdraw() public onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }
}