import React from 'react'
import { useTabs } from '../../context/context';

export interface IPanelProps{
          label: string;
          children?: React.ReactNode;
}


export const Panel: React.FC<IPanelProps> = props => {
          const { activeTab } = useTabs();
          
          return activeTab === props.label ? <div>{props.children}</div> : null;
};

