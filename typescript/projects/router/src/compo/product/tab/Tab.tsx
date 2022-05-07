import React from 'react'
import { useTabs } from '../../context/context'


export interface ITabProps {
          label: string;
          children?: React.ReactNode;
          // active?: boolean
}


export const Tab:React.FC<ITabProps> = ({...props}) => {
          const {setActiveTab} = useTabs();
          // const [active, setActive] = useState(false);

          // const handleClick = () = {
          //           setActive(!active);
          // }

          
          return (
                    <div className= 'active' >
                              <b onClick={() => setActiveTab(props.label)} >
                                        {props.children}
                              </b>
                    </div>
          )
}

