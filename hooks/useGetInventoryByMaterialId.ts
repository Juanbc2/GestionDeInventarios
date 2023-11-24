import { API_SERVICES, fetcher } from "@/service";
import { InventoryMovementWithCreatedByQuery } from "@/types";
import useSWR from "swr";

const useGetInventoryByMaterialId = (id: string) => {
  const { data, isLoading, error } =
    useSWR<InventoryMovementWithCreatedByQuery>(
      API_SERVICES.inventoryByMaterialId(id),
      fetcher
    );

  return {
    inventory: data?.inventoryMovements,
    isLoading,
    error,
  };
};

export { useGetInventoryByMaterialId };
