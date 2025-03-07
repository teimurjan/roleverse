// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';

import './PerkManagerUpgradeable.sol';
import './Constants.sol';
import './IRole.sol';

contract WizardRole is OwnableUpgradeable, Constants, IRole {
  PerkManagerUpgradeable public perkManager;

  string private _name;
  uint256 private _price;

  function initialize(
    address _perkManager,
    string memory name_,
    uint256 price_
  ) public initializer {
    __Ownable_init(msg.sender);
    perkManager = PerkManagerUpgradeable(_perkManager);
    _name = name_;
    _price = price_;
  }

  function discountPercentage(
    address buyer,
    address /* subject */
  ) external view override returns (uint256) {
    if (
      perkManager.isPerkActive(
        buyer,
        perkManager.nameToKey(WIZARD_BOOST_PERK_NAME)
      )
    ) {
      return 7;
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
