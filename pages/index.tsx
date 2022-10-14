import type { NextPage } from "next";
import Head from "next/head";
import { useEffect } from "react";

import useStore from "../store";
import { initializeStore, useServerStore } from "../store/ssgStore";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { name, setName } = useStore(({ name, setName }) => ({
    name,
    setName,
  }));

  const [serverName, setServerName] = useServerStore((state) => [
    state.name,
    state.setName,
  ]);

  console.log(`name: ${name}, serverName: ${serverName}`);

  useEffect(() => {}, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>
          <div>
            <h3>name: {name}</h3>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <h3>name: {serverName}</h3>
            <input
              type="text"
              value={serverName}
              onChange={(e) => setServerName(e.target.value)}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;

export function getStaticProps() {
  const zustandStore = initializeStore({
    name: "Zustand",
  });

  return {
    props: {
      initialZustandState: JSON.parse(JSON.stringify(zustandStore.getState())),
    },
  };
}
