import { API_SERVICES, fetcher } from "@/service";
import { User } from "@prisma/client";
import useSWR from "swr";

const useGetUserIdByEmail = (email: string) => {
  const { data, isLoading, error } = useSWR<User>(
    API_SERVICES.userIdByEmail(email),
    fetcher
  );

  return {
    id: data?.id,
    isLoading,
    error,
  };
};

export { useGetUserIdByEmail };
