import { useLayoutEffect } from "react";
import create, { UseBoundStore } from "zustand";
import createContext from "zustand/context";
import { devtools, combine } from "zustand/middleware";

// TYPES
type InitialState = ReturnType<typeof getInitialState>;
type UseStoreState = typeof initializeStore extends (
  ...args: never
) => UseBoundStore<infer State>
  ? State
  : never;

// PROVIDER
const zustandContext = createContext<UseStoreState>();
export const Provider = zustandContext.Provider;
export const useServerStore = zustandContext.useStore;

// STATE
let store: UseStoreState;

const getInitialState = () => {
  return {
    name: "Gerald",
  };
};

export const initializeStore = (initialState = {}) => {
  return create(
    devtools(
      combine({ ...getInitialState(), ...initialState }, (set, get) => {
        return {
          setName: (name: string) =>
            set({ name }, false, {
              type: `serverStore/setName/${name}`,
            }),
        };
      }),
      {
        name: "Server store",
      }
    )
  );
};

export const useCreateStore = (
  serverInitialState?: InitialState,
  isServerProp?: boolean
) => {
  const isServer = typeof window === "undefined" || isServerProp;
  const initialState = serverInitialState || getInitialState();

  if (isServer) {
    return () => initializeStore(initialState);
  }

  const isReusingStore = Boolean(store);
  store = store ?? initializeStore(initialState);

  useLayoutEffect(() => {
    if (serverInitialState && isReusingStore) {
      store.setState(
        {
          ...store.getState(),
          ...serverInitialState,
        },
        true
      );
    }
  });

  return () => store;
};
