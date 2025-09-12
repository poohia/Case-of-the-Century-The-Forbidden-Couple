import { createContext } from "react";
import useUnlock from "../../hooks/useUnlock";

export interface UnlockContextType extends ReturnType<typeof useUnlock> {}

// @ts-ignore
const UnlockContext = createContext<UnlockContextType>();

export default UnlockContext;
