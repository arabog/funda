// import React, { useState } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';

import {Products, prods} from '../data/ProductsData';
import Product from '../product/Product';


interface Display {
          product: Products[];
          inBasket: boolean;
          addToBasket: () => void;
          children: React.ReactNode;
}

const ProductPage: React.FC<Display> = (props) => {
          const [inBasket, setInBasket] = useState<boolean>(false);


          let params: any = useParams();
          let id = parseInt(params.id);

          let product;
          
          const selectedProduct:any[] = prods.filter((prod) =>  (
                    prod.id === id ? prod : null
          ))

          for (const key in selectedProduct) {
                    product = (selectedProduct[key]);
          }

          const addToBasket = () => {
                    setInBasket(true) 
          }
          

          return (
                    <div className="page-container">
                              
                              {
                                        product ? (
                                                  <Product 
                                                            product={product}
                                                            inBasket={inBasket}
                                                            addToBasket={addToBasket}
                                                            children = {props.children}
                                                  />
                                        ) : (
                                                  <p>Product not found!</p>
                                        )

                              }
                    </div>
          )
}


export default ProductPage

