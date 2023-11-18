import { useSession, signIn } from "next-auth/react";

const Home = () => {
  return (
    <main className="h-screen w-full flex items-center justify-center">
      <section className="flex flex-col items-center justify-center">
        <div className="text-4xl mb-40" style={{ color: "#1E40AF" }}>
          <h1>Sistema de Gestión de Inventarios</h1>
        </div>
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded"
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
