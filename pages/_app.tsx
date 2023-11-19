import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Provider } from "jotai";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <SessionProvider session={session}>
      <Provider>
        <Component {...pageProps} />
        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={true}
          newestOnTop={false}
          draggable={false}
          closeOnClick
          pauseOnHover
        />
      </Provider>
    </SessionProvider>
  );
};

export default App;
