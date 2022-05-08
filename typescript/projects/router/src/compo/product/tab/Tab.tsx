import React from 'react'
import { useTabs } from '../../context/context'


export interface ITabProps {
          label: string;
          children?: React.ReactNode;
}


export const Tab:React.FC<ITabProps> = props => {
          const {activeTab, setActiveTab} = useTabs();

          
          return (
                    <div className={props.label === activeTab ? 'active' : '' }>
                              <b onClick={() => setActiveTab(props.label)} >
                                        {props.children}
                              </b>
                    </div>
          )
}

