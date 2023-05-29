import { createContext } from "react";
import { RootStore } from "./rootStore";

export const rootStoreContext = createContext({
  rootStore: new RootStore(),
});
