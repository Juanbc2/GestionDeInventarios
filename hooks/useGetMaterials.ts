import { API_SERVICES, fetcher } from "@/service";
import { MaterialsQuery } from "@/types";
import useSWR from "swr";

const useGetMaterials = () => {
  const { data, isLoading, error } = useSWR<MaterialsQuery>(
    API_SERVICES.materials,
    fetcher
  );

  return {
    materials: data?.materials,
    isLoading,
    error,
  };
};

export { useGetMaterials };
