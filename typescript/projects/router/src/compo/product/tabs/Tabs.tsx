import {Tab, ITabProps } from '../tab/Tab';
import { Panel, IPanelProps} from '../panel/Panel'
import {  useMemo, useState } from 'react';
import { TabsContext } from '../../context/context';


interface ITabsComposition {
          Tab: React.FC<ITabProps>;
          Panel:React.FC<IPanelProps>;
}


export interface ChildrenProps {
          children?: React.ReactNode
}

const Tabs: React.FC & ITabsComposition =  ({...props}: ChildrenProps) => {
          const [activeTab, setActiveTab] = useState<string>('Description');

          // Memoize the context to prevent unecessary renders.
          const memoizedContextValue =  useMemo(() => ({
                    activeTab,

                    setActiveTab

          }),  [activeTab, setActiveTab]);


          return (
                    <TabsContext.Provider value ={memoizedContextValue}>
                              {props.children}
                    </TabsContext.Provider>
          )
}


Tabs.Tab = Tab;
Tabs.Panel = Panel;


export default Tabs;