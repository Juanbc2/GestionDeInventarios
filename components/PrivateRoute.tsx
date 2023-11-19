import { useSession } from "next-auth/react";
import Link from "next/link";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "authenticated") {
    return <div>{children}</div>;
  }

  return (
    <main className="flex flex-col h-screen w-full items-center justify-center">
      <h1 className="text-red-500 text-4xl">
        Acceso denegado, no tiene permisos para entrar aquí.
      </h1>
      <Link href="/">
        <span className="text-blue-500 font-bold text-xl">
          Volver al inicio
        </span>
      </Link>
    </main>
  );
};

export default PrivateRoute;
