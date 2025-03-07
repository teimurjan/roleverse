// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
import '@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol';
import './FeeManagerUpgradeable.sol';
import './IRole.sol';

contract RoleManagerUpgradeable is Initializable, OwnableUpgradeable {
  event RoleSet(address indexed user, address roleContract, uint256 feePaid);
  event RoleAdded(address roleContract);

  address[] public availableRoles;

  mapping(address => address) public userRoles;

  FeeManagerUpgradeable public feeManager;

  function initialize(address payable _feeManager) public initializer {
    __Ownable_init(msg.sender);
    feeManager = FeeManagerUpgradeable(_feeManager);
  }

  function setRole(address _roleContract) external payable {
    if (_roleContract == address(0)) {
      userRoles[msg.sender] = address(0);
      emit RoleSet(msg.sender, address(0), 0);
      return;
    }

    uint256 requiredFee = IRole(_roleContract).price();
    require(msg.value >= requiredFee, 'Insufficient fee for role');

    userRoles[msg.sender] = _roleContract;
    emit RoleSet(msg.sender, _roleContract, msg.value);

    if (requiredFee > 0) {
      feeManager.addFee{value: msg.value}();
    }
  }

  function addRole(address _roleContract) external onlyOwner {
    availableRoles.push(_roleContract);
    emit RoleAdded(_roleContract);
  }

  function getAvailableRoles() external view returns (address[] memory) {
    return availableRoles;
  }
}
