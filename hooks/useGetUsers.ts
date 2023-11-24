import { API_SERVICES, fetcher } from "@/service";
import { UsersQuery } from "@/types";
import useSWR from "swr";

const useGetUsers = () => {
  const { data, isLoading, error } = useSWR<UsersQuery>(
    API_SERVICES.users,
    fetcher
  );

  return {
    users: data?.users,
    isLoading,
    error,
  };
};

export { useGetUsers };
