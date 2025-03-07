import {
  PerkUsed as PerkUsedEvent,
  PerkAdded as PerkAddedEvent,
} from "../generated/PerkManagerUpgradeable/PerkManagerUpgradeable";
import { Perk, PerkOwnership } from "../generated/schema";

export function handlePerkAdded(event: PerkAddedEvent): void {
  const perkId = event.params.key.toHex();
  const perk = new Perk(perkId);
  perk.cooldown = event.params.cooldown;
  perk.expiration = event.params.expiration;
  perk.name = event.params.name;
  perk.price = event.params.price;
  perk.role = event.params.role.toHex();
  perk.save();
}

export function handlePerkUsed(event: PerkUsedEvent): void {
  const ownershipId = `${event.params.user.toHex()}-${event.params.key.toHex()}`;
  const ownership = new PerkOwnership(ownershipId);
  const userId = event.params.user.toHex();

  ownership.owner = userId;
  ownership.perk = event.params.key.toHex();
  ownership.save();
}
