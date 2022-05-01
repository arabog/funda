// import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

import {Products, prods} from './ProductsData';

// type Props = {id: string };

interface Display {
          product: Products[];
          // added: boolean;
}

const ProductPage: React.FC<Display> = () => {
          let params: any = useParams();
          let id = parseInt(params.id);

          const selectedProduct = prods.filter((prod) => prod.id === id)

          const itemPro = selectedProduct ? prods[id] : null;


          return (
                    <div className="page-container">
                              {
                                        selectedProduct ? (
                                                  <>
                                                            <h1>{itemPro?.name}</h1>
                                                            <p>{itemPro?.description}</p>

                                                            <p className="product-price">
                                                                      ${itemPro?.price}
                                                            </p>
                                                  </>
                                        ) : (
                                                  <p>Product not found!</p>
                                        )
                              }                             
                    </div>
          )
}


export default ProductPage

                                        // produc ? (
                                        //           <>
                                        //                     <h1>{produc.name}</h1>
                                        //                     <p>{produc.description}</p>

                                        //                     <p className="product-price">
                                        //                               {
                                        //                                         new Intl.NumberFormat("en-US", { currency: "USD", style: "currency" }).format(produc.price)
                                        //                               }
                                        //                     </p>

                                        //                     {
                                        //                               add && (
                                        //                                         <button onClick={handleAddClick}>Add to basket</button>
                                        //                               )
                                        //                     }
                                        //           </>
                                        // ) : <p>Product not found!</p>
