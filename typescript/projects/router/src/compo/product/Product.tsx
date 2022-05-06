import React from 'react'

import { Products } from '../data/ProductsData'
import Tab from './tabs/Tab';

interface ProductsProps {
          product: Products;
          inBasket: boolean;
          addToBasket(): void;
}




const Product:React.FC<ProductsProps> = (props) => {
          const product = props.product;


          return (
                    <>
                              <h1>{product.name}</h1>

                              <Tab activeHeading='' headings={['Description', 'Reviews']} />

                              <p>{product.description}</p>

                              <p className="product-price">
                                        ${product.price}
                              </p>

                              <div>
                                        <ul className="product-reviews">
                                                  {
                                                            product.reviews.map((review) => (
                                                                      <li key={product.id} className="product-reviews-item">
                                                                                <i> " {review.comment} "</i> - {review.reviewer}
                                                                      </li>
                                                            ))
                                                  }
                                        </ul>
                              </div>

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


export default Product