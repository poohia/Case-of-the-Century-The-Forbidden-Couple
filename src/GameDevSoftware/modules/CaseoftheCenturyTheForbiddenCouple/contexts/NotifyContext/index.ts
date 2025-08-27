import { createContext } from "react";
import useNotify from "../../hooks/useNotify";

export interface NotifyContextType extends ReturnType<typeof useNotify> {}

// @ts-ignore
const NotifyContext = createContext<NotifyContextType>();

export default NotifyContext;
