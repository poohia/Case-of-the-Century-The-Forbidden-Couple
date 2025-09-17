import { createContext } from "react";
import usePointsGame from "../../hooks/usePointsGame";

export interface PointsContextType extends ReturnType<typeof usePointsGame> {}

// @ts-ignore
const PointsContext = createContext<PointsContextType>();

export default PointsContext;
