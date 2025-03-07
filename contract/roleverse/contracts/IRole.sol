// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

interface IRole {
  /// @notice Returns the discount percentage (0–100) to apply for a given fee.
  /// For example, a return value of 7 means a 7% discount on the fee.
  function discountPercentage(
    address buyer,
    address subject
  ) external view returns (uint256);

  function name() external view returns (string memory);

  function price() external view returns (uint256);
}
