// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import '@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol';
import './RoleManagerUpgradeable.sol';

contract PerkManagerUpgradeable is OwnableUpgradeable {
  struct Perk {
    string name;
    uint256 price;
    uint256 expiration;
    uint256 cooldown;
    address role;
  }

  mapping(bytes32 => Perk) public perks;

  mapping(address => mapping(bytes32 => uint256)) public lastPerkUsage;

  RoleManagerUpgradeable public roleManager;

  event PerkAdded(
    bytes32 indexed key,
    string name,
    uint256 price,
    uint256 expiration,
    uint256 cooldown,
    address role
  );

  event PerkUsed(address indexed user, bytes32 indexed key, uint256 timestamp);

  function initialize(address payable _roleManager) public initializer {
    __Ownable_init(msg.sender);
    roleManager = RoleManagerUpgradeable(_roleManager);
  }

  function addPerk(
    string memory name,
    uint256 price,
    uint256 expiration,
    uint256 cooldown,
    address role
  ) external onlyOwner {
    bytes32 perkKey = nameToKey(name);
    perks[perkKey] = Perk({
      name: name,
      price: price,
      expiration: expiration,
      cooldown: cooldown,
      role: role
    });
    emit PerkAdded(perkKey, name, price, expiration, cooldown, role);
  }

  function nameToKey(string memory name) public pure returns (bytes32) {
    return keccak256(abi.encodePacked(name));
  }

  function isPerkActive(
    address user,
    bytes32 perkKey
  ) public view returns (bool) {
    Perk memory perk = perks[perkKey];

    uint256 lastUsed = lastPerkUsage[user][perkKey];
    if (block.timestamp < lastUsed + perk.expiration) {
      return true;
    }

    return false;
  }

  function isPerkAvailable(
    address user,
    bytes32 perkKey
  ) public view returns (bool) {
    Perk memory perk = perks[perkKey];

    if (perk.role != address(0)) {
      if (roleManager.userRoles(user) != perk.role) {
        return false;
      }
    }

    uint256 lastUsed = lastPerkUsage[user][perkKey];
    if (block.timestamp < lastUsed + perk.cooldown) {
      return false;
    }

    return true;
  }

  function usePerk(bytes32 perkKey) external payable {
    Perk memory perk = perks[perkKey];
    require(
      isPerkAvailable(msg.sender, perkKey),
      'Perk not available: cooldown active or expired'
    );
    if (perk.price > 0) {
      require(msg.value >= perk.price, 'Insufficient payment for perk usage');
    }

    lastPerkUsage[msg.sender][perkKey] = block.timestamp;
    emit PerkUsed(msg.sender, perkKey, block.timestamp);
  }
}
