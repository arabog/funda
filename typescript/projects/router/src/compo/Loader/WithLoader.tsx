import React, { Component } from 'react'


interface IProps {
          loading: boolean;
}


export const WithLoader: React.FC<IProps> = <P extends object> (loading, ...props) => 

          loading ? (
                    <div className='loader-overlay'>
                              <div className='loader-circle-wrap'>
                                        <div className='loader-circle' />
                              </div>
                    </div>
          ) : (
                    <Component {...props} />
          )



