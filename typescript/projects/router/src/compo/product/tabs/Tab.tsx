import React, { useState } from 'react'

interface TabProps {
          activeHeading: string;
          headings: string[];
}


const Tab:React.FC<TabProps> = (props) => {
          
          const activeHeading: string = props.headings && props.headings.length > 0
          ? props.headings[0]
          : ""

          const [activeTab, setActiveTab] = useState<string>(activeHeading);

          const handleTabClick = (e: React.MouseEvent<HTMLLIElement>) => {
                    const li = e.target as HTMLLIElement;

                    const heading: string = li.textContent ? li.textContent : ''

                    setActiveTab(heading);
          }

          return (
                    <ul className="tabs">
                              {
                                        props.headings.map((heading) => (
                                                  <li 
                                                            key={heading}
                                                            className= {heading === activeTab ? 'active' : ''}
                                                            onClick={handleTabClick}
                                                  >
                                                            {heading}
                                                  </li>
                                        ))
                              }
                    </ul>
          )
}


export default Tab