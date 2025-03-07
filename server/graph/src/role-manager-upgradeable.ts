import {
  RoleAdded as RoleAddedEvent,
  RoleSet as RoleSetEvent,
} from "../generated/RoleManagerUpgradeable/RoleManagerUpgradeable";
import { Role, User } from "../generated/schema";

export function handleRoleAdded(event: RoleAddedEvent): void {
  const roleId = event.params.roleContract.toHex();
  const role = new Role(roleId);
  role.id = roleId;
  role.save();
}

export function handleRoleSet(event: RoleSetEvent): void {
  const roleId = event.params.roleContract.toHex();
  const userId = event.params.user.toHex();

  const user = User.load(userId);
  if (user) {
    user.role = roleId;
    user.save();
  }
}
