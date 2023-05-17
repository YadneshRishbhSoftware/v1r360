import { useContext } from "react";
// import { rootStoreContext } from "../mobX/store/index";
import { rootStoreContext } from "../mobx/index";

export const useStore = () => useContext(rootStoreContext);