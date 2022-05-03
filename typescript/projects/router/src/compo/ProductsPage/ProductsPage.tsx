import React, { useEffect, useState } from 'react'
import { Link, useSearchParams  } from 'react-router-dom'
import './ProductsPage.css'

import { prods, Products } from '../data/ProductsData'

interface ProductState {
          products: Products[];
          search: string;
}


const ProductsPage: React.FC<ProductState> = () => {
          const [searchParams]: any = useSearchParams()


          const [pros, setProducts] = useState<any[]>([]);
          // const [search, setSearch] = useState<any[]>('');

          useEffect(() => {
                    setProducts(prods)
          }, [])


          return (
                    <div className="page-container">
                              <p>
                                        Welcome to React Shop where you can get all your tools for ReactJS!
                              </p>

                              <ul className="product-list">
                                        {
                                                  pros.map(prod => (
                                                            <li key={prod.id} className="product-list-item">
                                                                      <Link to={`/pros/${prod.id}`} >{prod.name}</Link>
                                                            </li>
                                                  ))
                                        }
                              </ul>
                    </div>
          )
}


export default ProductsPage