import "./globals.css";
import type { AppProps } from "next/app";


// import ModalManager from "@/common/components/modal/components/ModalManager";

import "react-toastify/dist/ReactToastify.min.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
        <Component {...pageProps} />
    </>
  );
};

export default App;
