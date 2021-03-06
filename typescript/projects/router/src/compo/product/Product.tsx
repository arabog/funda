import React from 'react'

import { Products } from '../data/ProductsData'
import Tabs from './tabs/Tabs';
import { ChildrenProps } from './tabs/Tabs'

import {WithLoader} from '../Loader/WithLoader';


interface ProductsProps {
          product: Products;
          inBasket: boolean;
          addToBasket(): void;

          children: React.ReactNode | ChildrenProps ;
}




const Product:React.FC<ProductsProps> = (props) => {
          const product = props.product;

          if(!product) {
                    return null;
          }


          return (
                    <>
                              <h1>{product.name}</h1>

                              <Tabs>

                                        <div 
                                                  style={{
                                                            display: 'flex', margin: '0 auto', 
                                                            justifyContent: 'space-around', alignItems: 'center',
                                                            width: '50vw', cursor: 'pointer',
                                                            marginBottom: '20px'
                                                  }}
                                        >
                                                  <Tabs.Tab label="Description">
                                                            Description
                                                  </Tabs.Tab>

                                                  <Tabs.Tab label="Reviews">
                                                            Reviews
                                                  </Tabs.Tab>
                                        </div>

                                        {/* ===================== */}

                                        <Tabs.Panel label="Description">
                                                  {product.description}
                                        </Tabs.Panel>

                                        <Tabs.Panel label="Reviews">
                                                  <ul>
                                                            {
                                                                      product.reviews.map((review) => (
                                                                                <li key={review.reviewer}style={{listStyle: 'none'}}>
                                                                                          {review.comment} -  {review.reviewer}
                                                                                </li>
                                                                      ))
                                                            }

                                                  </ul>
                                        </Tabs.Panel>

                              </Tabs>
                              

                              <p className="product-price"> ${product.price} </p>

                              {
                                        !props.inBasket && (
                                                  <button onClick={()=> props.addToBasket()}>
                                                            Add to basket
                                                  </button>
                                        )
                              }
                    </>
          )
}

// export default Product;

// export default WithLoader(Product);
export default Product;