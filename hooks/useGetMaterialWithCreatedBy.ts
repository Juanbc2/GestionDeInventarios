import { API_SERVICES, fetcher } from "@/service";
import { MaterialWithCreatedByQuery } from "@/types";
import useSWR from "swr";

const useGetMaterialsWithCreatedBy = () => {
  const { data, isLoading, error } = useSWR<MaterialWithCreatedByQuery>(
    API_SERVICES.materials,
    fetcher
  );

  return {
    materials: data?.materials,
    isLoading,
    error,
  };
};

export { useGetMaterialsWithCreatedBy };
