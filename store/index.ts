import create from "zustand";
import { devtools } from "zustand/middleware";

type State = {
  name: string;
  setName: (name: string) => void;
};

const useStore = create<State>()(
  devtools(
    (set) => {
      return {
        name: "John",
        setName: (name: string) =>
        set({ name }, false, {
          type: `clientStore/setName/${name}`,
        }),
      };
    },
    {
      name: "Client store",
    }
  )
);

export default useStore;
