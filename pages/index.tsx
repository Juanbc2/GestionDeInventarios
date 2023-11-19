import { CircularProgress } from "@mui/material";
import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";

const Home = () => {
  const { status } = useSession();

  const setView = () => {
    if (status === "authenticated") {
      window.open("/inventory", "_self");
    }

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
  };

  useEffect(() => {
    setView();
  }, [status]);

  return (
    <main className="h-screen w-full flex items-center justify-center">
      <section className="flex flex-col items-center justify-center gap-40">
        <h1 style={{ fontWeight: 400, fontSize: 48, color: "#2D8F1D" }}>
          Sistema de Gestión de Inventarios
        </h1>
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white text-2xl w-[200px] h-[60px] font-bold py-2 px-4 m-2 rounded"
            onClick={() => signIn("auth0")}
          >
            Ingresar
          </button>
        </div>
      </section>
    </main>
  );
};

export default Home;
