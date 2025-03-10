// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol';
import './FeeManagerUpgradeable.sol';

contract RoleverseUpgradeable is
  OwnableUpgradeable,
  ReentrancyGuardUpgradeable
{
  // --- Events ---
  event TokenMinted(address indexed owner);
  event ShareBought(
    address indexed subject,
    address indexed buyer,
    uint256 basePrice,
    uint256 fee
  );
  event ShareSold(
    address indexed subject,
    address indexed seller,
    uint256 refundBase,
    uint256 fee
  );

  mapping(address => uint256) public tokenSupply;
  mapping(address => mapping(address => uint256)) public balances;
  uint256 public constant bondingCurveConstant = 0.001 ether;

  FeeManagerUpgradeable public feeManager;

  function initialize(address payable _feeManager) public initializer {
    __Ownable_init(msg.sender);
    __ReentrancyGuard_init();
    feeManager = FeeManagerUpgradeable(_feeManager);
  }

  function mint() external payable nonReentrant {
    require(tokenSupply[msg.sender] == 0, 'Token already minted');
    tokenSupply[msg.sender] = 1;
    balances[msg.sender][msg.sender] = 1;
    emit TokenMinted(msg.sender);
  }

  function getBasePrice(address subject) private view returns (uint256) {
    require(tokenSupply[subject] > 0, 'Token not minted');
    return bondingCurveConstant * tokenSupply[subject];
  }

  function getFee(address subject, uint256 basePrice) private view returns (uint256) {
    uint256 feePercent = feeManager.getEffectiveFeePercent(msg.sender, subject);
    uint256 fee = (basePrice * feePercent) / 10000;
    return fee;
  }

  function getBuyPrice(address subject) public view returns (uint256) {
    uint256 basePrice = getBasePrice(subject);
    uint256 fee = getFee(subject, basePrice);
    return basePrice + fee;
  }

  function buyShare(address subject) external payable nonReentrant {
    require(tokenSupply[subject] > 0, 'Target token not minted');
    require(tokenSupply[msg.sender] > 0, 'Buyer must mint first');

    uint256 basePrice = getBasePrice(subject);
    uint256 fee = getFee(subject, basePrice);
    uint256 totalCost = basePrice + fee;
    require(msg.value >= totalCost, 'Insufficient Ether sent');

    tokenSupply[subject] += 1;
    balances[subject][msg.sender] += 1;
    feeManager.addFee{value: fee}();
    emit ShareBought(subject, msg.sender, basePrice, fee);
  }

  function sellShare(address subject) public payable nonReentrant {
    uint256 supply = tokenSupply[subject];
    require(supply > 1, 'Cannot sell the only share');
    require(balances[subject][msg.sender] > 0, 'No share to sell');

    uint256 refundBase = bondingCurveConstant * (supply - 1);
    uint256 feePercent = feeManager.getEffectiveFeePercent(msg.sender, subject);
    uint256 fee = (refundBase * feePercent) / 10000;
    uint256 refund = refundBase - fee;

    tokenSupply[subject] = supply - 1;
    balances[subject][msg.sender] -= 1;
    feeManager.addFee{value: fee}();
    (bool sent, ) = msg.sender.call{value: refund}('');
    require(sent, 'Refund transfer failed');
    emit ShareSold(subject, msg.sender, refundBase, fee);
  }

  receive() external payable {}
}
