// import React, { useState } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import {Products, prods} from '../data/ProductsData';


interface Display {
          product: Products[];
          added: boolean;
}

const ProductPage: React.FC<Display> = () => {
          const [added, setAdded] = useState<Boolean>(false);

          let params: any = useParams();
          let id = parseInt(params.id);

          let product;
          
          const selectedProduct:any[] = prods.filter((prod) =>  (
                    prod.id === id ? prod : null
          ))

          for (const key in selectedProduct) {
                    product = (selectedProduct[key]);
          }

          const handleAddClick = () => {
                    setAdded(true) 
          }
          

          return (
                    <div className="page-container">
                              {
                                        product ? (
                                                  <>
                                                            <h1>{product.name}</h1>
                                                            <p>{product.description}</p>

                                                            <p className="product-price">
                                                                      ${product.price}
                                                            </p>

                                                            {
                                                                      !added && (
                                                                                <button onClick={handleAddClick}>
                                                                                          Add to basket
                                                                                </button>
                                                                      )
                                                            }
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
