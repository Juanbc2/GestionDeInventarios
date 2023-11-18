import { Enum_RoleName } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface ProtectedRouteProps {
  children: React.ReactNode;
  roleName: Enum_RoleName;
}

const ProtectedRoute = ({ children, roleName }: ProtectedRouteProps) => {
  const { data } = useSession();

  if (data?.user?.role === roleName) {
    return <>{children}</>;
  }

  return (
    <main className="flex flex-col h-screen w-full items-center justify-center">
      <h1 className="text-red-500 text-4xl">
        Acceso denegado, debe iniciar sesión
      </h1>
      <Link href="/">
        <span className="text-blue-500 font-bold text-xl">
          Volver al inicio
        </span>
      </Link>
    </main>
  );
};

export default ProtectedRoute;
