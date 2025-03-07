// SPDX-License-Identifier: MIT

pragma solidity ^0.8.26;

import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
import './IRole.sol';
import './RoleManagerUpgradeable.sol';

contract VikingRole is OwnableUpgradeable, IRole {
  RoleManagerUpgradeable public roleManager;
  string private _name;
  uint256 private _price;


  function initialize(
    address _roleManager,
    string memory name_,
    uint256 price_
  ) public initializer {
    __Ownable_init(msg.sender);
    roleManager = RoleManagerUpgradeable(_roleManager);
    _name = name_;
    _price = price_;
  }


  function discountPercentage(
    address /* buyer */,
    address subject
  ) external view override returns (uint256) {
    if (roleManager.userRoles(subject) != address(this)) {
      return 3;
    }
    return 0;
  }

  function name() external view override returns (string memory) {
    return _name;
  }

  function price() external view override returns (uint256) {
    return _price;
  }
}
