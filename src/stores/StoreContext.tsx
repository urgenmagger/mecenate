import { createContext, FC, ReactNode, useContext } from 'react';
import { rootStore, RootStore } from './RootStore';

const StoreContext = createContext<RootStore>(rootStore);

interface Props {
  children: ReactNode;
}

export const StoreProvider: FC<Props> = ({ children }) => {
  return (
    <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);
