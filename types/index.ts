import { Role, User, Material, InventoryMovement } from "@prisma/client";

export interface UsersQuery {
  users: User[];
}

export interface RolesQuery {
  roles: Role[];
}

export interface MaterialsQuery {
  materials: Material[];
}

export type MaterialWithCreatedBy = {
  createdBy: {
    name: string | null;
  };
} & {
  id: string;
  name: string;
  quantity: number;
  userId: string;
  createdAt: Date;
};

export interface MaterialWithCreatedByQuery {
  materials: MaterialWithCreatedBy[];
}

export interface InventoryMovementsQuery {
  inventoryMovements: InventoryMovement[];
}

export type InventoryMovementWithCreatedBy = {
  createdBy: {
    name: string | null;
  };
} & {
  id: string;
  materialId: string;
  quantity: number;
  createdAt: Date;
  movementType: string;
};

export interface InventoryMovementWithCreatedByQuery {
  inventoryMovements: InventoryMovementWithCreatedBy[];
}

export type inventoryByQuantityType = {
  createdAt: string;
  quantity: number;
};