import { BigInt } from "@graphprotocol/graph-ts";
import {
  TokenMinted as TokenMintedEvent,
  ShareBought as ShareBoughtEvent,
  ShareSold as ShareSoldEvent,
} from "../generated/RoleverseUpgradeable/RoleverseUpgradeable";
import { Token, TokenOwnership, User } from "../generated/schema";

export function handleTokenMinted(event: TokenMintedEvent): void {
  const ownerAddress = event.params.owner.toHex();

  const tokenOwnershipId = `${ownerAddress}-${ownerAddress}`;
  const tokenOwnership = new TokenOwnership(tokenOwnershipId);
  tokenOwnership.owner = ownerAddress;
  tokenOwnership.subject = ownerAddress;
  tokenOwnership.amount = BigInt.fromI32(1);

  const user = new User(ownerAddress);

  const token = new Token(ownerAddress);
  token.address = ownerAddress;
  token.supply = BigInt.fromI32(1);

  user.token = ownerAddress;
  user.holders = BigInt.fromI32(1);
  user.holdings = BigInt.fromI32(1);

  token.save();
  user.save();
  tokenOwnership.save();
}

export function handleShareBought(event: ShareBoughtEvent): void {
  const tokenOwnershipId = `${event.params.buyer.toHex()}-${event.params.subject.toHex()}`;
  let tokenOwnership = TokenOwnership.load(tokenOwnershipId);
  if (!tokenOwnership) {
    tokenOwnership = new TokenOwnership(tokenOwnershipId);
    tokenOwnership.owner = event.params.buyer.toHex();
    tokenOwnership.subject = event.params.subject.toHex();
    tokenOwnership.amount = BigInt.fromI32(1);
  } else {
    tokenOwnership.amount = tokenOwnership.amount.plus(BigInt.fromI32(1));
  }

  const isFirstShareBought = tokenOwnership.amount.equals(BigInt.fromI32(1));
  if (isFirstShareBought) {
    const subjectUser = User.load(event.params.subject.toHex());
    if (subjectUser) {
      subjectUser.holders = subjectUser.holders.plus(BigInt.fromI32(1));
      subjectUser.save();
    }
    const buyerUser = User.load(event.params.buyer.toHex());
    if (buyerUser) {
      buyerUser.holdings = buyerUser.holdings.plus(BigInt.fromI32(1));
      buyerUser.save();
    }
  }

  const token = Token.load(tokenOwnership.subject);
  if (token) {
    token.supply.plus(BigInt.fromI32(1));
    token.save();
  }
  tokenOwnership.save();
}

export function handleShareSold(event: ShareSoldEvent): void {
  const tokenOwnershipId = `${event.params.seller.toHex()}-${event.params.subject.toHex()}`;
  let tokenOwnership = TokenOwnership.load(tokenOwnershipId);
  if (!tokenOwnership) {
    return;
  }

  tokenOwnership.amount = tokenOwnership.amount.minus(BigInt.fromI32(1));

  const isLastShareSold = tokenOwnership.amount.equals(BigInt.fromI32(0));
  if (isLastShareSold) {
    const subjectUser = User.load(event.params.subject.toHex());
    if (subjectUser) {
      subjectUser.holders = subjectUser.holders.minus(BigInt.fromI32(1));
      subjectUser.save();
    }
    const sellerUser = User.load(event.params.seller.toHex());
    if (sellerUser) {
      sellerUser.holdings = sellerUser.holdings.minus(BigInt.fromI32(1));
      sellerUser.save();
    }
  }

  const token = Token.load(tokenOwnership.subject);
  if (token) {
    token.supply.minus(BigInt.fromI32(1));
    token.save();
  }
  tokenOwnership.save();
}
