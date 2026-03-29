import { createContext, ReactNode, useContext } from "react";

import useItems from "./useItems";

// @ts-ignore
const Ctx = createContext<ReturnType<typeof useItems>>({});
const useItemsProvider = () => {
  return useContext(Ctx);
};

type ItemProviderProps = {
  children: ReactNode;
};

const ItemsProvider = ({ children }: ItemProviderProps) => {
  const useItemRest = useItems();
  return <Ctx.Provider value={useItemRest}>{children}</Ctx.Provider>;
};

export { useItemsProvider };
export default ItemsProvider;
