// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol';
import './RoleManagerUpgradeable.sol';
import './IRole.sol';

contract FeeManagerUpgradeable is
  OwnableUpgradeable,
  ReentrancyGuardUpgradeable
{
  uint256 public baseFee;
  uint256 public collectedFees;
  address public feeRecipient;

  RoleManagerUpgradeable public roleManager;

  event BaseFeeUpdated(uint256 baseFee);
  event FeeRecipientUpdated(address feeRecipient);
  event RoleManagerSet(address indexed roleManager);
  event FeeAdded(uint256 amount, address indexed sender);
  event FeesWithdrawn(uint256 amount, address indexed feeRecipient);

  function initialize(
    uint256 _baseFee,
    address payable _feeRecipient
  ) public initializer {
    __Ownable_init(msg.sender);
    __ReentrancyGuard_init();
    baseFee = _baseFee;
    feeRecipient = _feeRecipient;
    emit BaseFeeUpdated(_baseFee);
    emit FeeRecipientUpdated(_feeRecipient);
  }


  function setRoleManager(address _roleManager) external onlyOwner {
    roleManager = RoleManagerUpgradeable(_roleManager);
    emit RoleManagerSet(_roleManager);
  }

  function getEffectiveFeePercent(
    address buyer,
    address subject
  ) external view returns (uint256) {
    uint256 effectiveFee = baseFee;
    address buyerRole = roleManager.userRoles(buyer);
    if (buyerRole != address(0)) {
      uint256 discount = IRole(buyerRole).discountPercentage(buyer, subject);
      effectiveFee = (baseFee * (100 - discount)) / 100;
    }
    return effectiveFee;
  }

  function addFee() external payable {
    collectedFees += msg.value;
    emit FeeAdded(msg.value, msg.sender);
  }

  function withdrawFees() external onlyOwner nonReentrant {
    uint256 amount = collectedFees;
    collectedFees = 0;
    (bool success, ) = feeRecipient.call{value: amount}('');
    require(success, 'Withdrawal failed');
    emit FeesWithdrawn(amount, feeRecipient);
  }

  receive() external payable {}
}
