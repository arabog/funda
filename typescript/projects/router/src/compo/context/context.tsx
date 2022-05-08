import { createContext, useContext } from "react";


interface ITabsContext {
          activeTab: string;
          
          setActiveTab: (label: string) => void;
}


export const TabsContext = createContext<ITabsContext | undefined>(undefined);


export const useTabs = (): ITabsContext => {
          const context = useContext(TabsContext);
          

          if (!context) {
                    throw new Error('This component must be used within a <Tabs> component')
          }

          return context;
} 


