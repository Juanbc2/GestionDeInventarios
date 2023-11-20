import { CircularProgress } from "@mui/material";
import { useSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";

const Home = () => {
  const { status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      setLoading(false);
      window.open("/inventory", "_self");
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [status]);

  const handleSignIn = async () => {
    await signIn("auth0");
  };

  if (loading) {
    return (
      <main className="h-screen w-full flex items-center justify-center"
      style={{backgroundColor: "white"}}>
        <section className="flex flex-col items-center justify-center gap-40">
          <h1 style={{ fontWeight: 400, fontSize: 48, color: "#10b981" }}>
            <CircularProgress size={60} thickness={4} color="success" /> Cargando
          </h1>
        </section>
      </main>
    );
  }

  return (
    <main className="h-screen w-full flex items-center justify-center font-serif"
    style={{backgroundColor: "white"}}>
      <section className="flex flex-col items-center justify-center gap-40" >
        <h1 className="animate-pulse font-bold blur-in" style={{ fontWeight: 400, fontSize: 62, color: "#10b981" , animationDuration: "0.75s"}}>
          Sistema de Gestión de Inventarios
        </h1>
        <div>
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white text-2xl w-[250px] h-[70px] font-bold py-2 px-4 m-2 rounded-xl blur-in "
            onClick={handleSignIn}
            style={{animationDuration:"0.75s"}}
          >
            Ingresar
          </button>
        </div>
      </section>
    </main>
  );
};

export default Home;

