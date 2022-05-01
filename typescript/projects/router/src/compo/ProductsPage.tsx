import React, { useEffect, useState } from 'react'
import { prods, Products } from './ProductsData'

interface ProductState {
          products: Products[]
}


const ProductsPage: React.FC<ProductState> = () => {
          const [pros, setProducts] = useState<any[]>([])

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
                                                                      {prod.name}
                                                            </li>
                                                  ))
                                        }
                              </ul>
                    </div>
          )
}


export default ProductsPage