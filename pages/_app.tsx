import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Provider, useCreateStore } from "../store/ssgStore";
import useStore from "../store";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const { initialZustandState } = pageProps;
  const createServerStore = useCreateStore(initialZustandState);

  const setClientName = useStore((s) => s.setName);

  useEffect(() => {
    setClientName("client");
  }, []);

  return (
    <Provider createStore={createServerStore}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
