import { CircularProgress } from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <main className="h-screen w-full flex items-center justify-center">
        <section className="flex flex-col items-center justify-center gap-40">
          <h1 style={{ fontWeight: 400, fontSize: 48, color: "#2D8F1D" }}>
            <CircularProgress size={60} thickness={4} color="success" />{" "}
            Cargando
          </h1>
        </section>
      </main>
    );
  }

  if (status === "authenticated") {
    return <div>{children}</div>;
  }

  return (
    <main className="flex flex-col h-screen w-full items-center justify-center">
      <h1 className="text-red-500 text-4xl">
        Acceso denegado, debe iniciar sesión.
      </h1>
      <Link href="/">
        <span className="text-blue-500 font-bold text-xl">
          Volver al inicio
        </span>
      </Link>
    </main>
  );
};

export { PrivateRoute };
