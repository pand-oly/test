import { createContext } from 'react';
import type { MainContextInterface } from '../entities/MainContextInterface';

const MainContext = createContext<MainContextInterface | undefined>(undefined);

export default MainContext;
