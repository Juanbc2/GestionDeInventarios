import { API_SERVICES, fetcher } from "@/service";
import { InventoryMovementsQuery } from "@/types";
import useSWR from "swr";

const useGetInventory = () => {
  const { data, isLoading, error } = useSWR<InventoryMovementsQuery>(
    API_SERVICES.inventory,
    fetcher
  );

  return {
    inventory: data?.inventoryMovements,
    isLoading,
    error,
  };
};

export { useGetInventory };
