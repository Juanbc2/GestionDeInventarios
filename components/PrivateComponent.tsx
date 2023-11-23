import { useSession } from "next-auth/react";

interface PrivateComponentProps {
  children: React.ReactNode;
  roleName: string;
}

const PrivateComponent = ({ children, roleName }: PrivateComponentProps) => {
  const { data } = useSession();
  if (data?.user?.role === roleName) {
    return <div>{children}</div>;
  }
  return null;
};

export { PrivateComponent };
