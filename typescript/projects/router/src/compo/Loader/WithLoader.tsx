// import React from 'react'


interface IProps {
          loading: boolean;
}


export const WithLoader: React.FC<IProps> = Component =>  (loading: boolean, ...props: any[]) =>  {

          loading ? (
                    <div className='loader-overlay'>
                              <div className='loader-circle-wrap'>
                                        <div className='loader-circle' />
                              </div>
                    </div>
          ) : (
                    <Component {...props} />
          )
}


