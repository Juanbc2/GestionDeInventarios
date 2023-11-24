import type { Enum_RoleName } from "@prisma/client";
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
        Acceso denegado, no tiene permisos para entrar aquí.
      </h1>
      <Link href="/inventory">
        <span className="text-blue-500 font-bold text-xl">
          Volver al inventario
        </span>
      </Link>
    </main>
  );
};

export { ProtectedRoute };
