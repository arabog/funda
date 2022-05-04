import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import './ProductsPage.css'
import { prods, Products } from '../data/ProductsData'

// const params = useLocation().search
// const queryParams = new URLSearchParams(params)
// const signle = queryParams.get('item')
// console.log(signle);

// const [searchParams, setSearchParams] = useSearchParams()
// let item = searchParams.get('item') || '';


interface ProductState {
          products: Products[];
          search: string;
}


const ProductsPage: React.FC<ProductState> = () => {
          const [pros, setProducts] = useState<any[]>([]);
          const [searchParams, setSearchParams] = useSearchParams()
          let search = searchParams.get('item') || '';
          search = search.toLowerCase()

          useEffect(() => {
                    setProducts(prods)
          }, [])

          const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault()

                    const formData = new FormData(e.currentTarget)
                    const newItem = formData.get('item') as string;

                    if (!newItem) return;

                    setSearchParams({item: newItem})

          }


          return (
                    <div className="page-container">
                              <p>
                                        Welcome to React Shop where you can get all your tools for ReactJS!
                              </p>

                              <form className='search-container' onSubmit={handleSearch}>
                                        <input 
                                                  name='item'
                                                  type='search'
                                                  placeholder='Search'
                                        />

                                        <button type='submit'>Search</button>
                              </form>

                              <ul className="product-list">
                                        {
                                                  pros.map(prod => {
                                                            if (!search || (search && prod.name.toLowerCase().indexOf(search.toLowerCase()) >-1)) {
                                                                      return (
                                                                                <li key={prod.id} className="product-list-item">
                                                                                          <Link to={`/pros/${prod.id}`} >{prod.name}</Link>
                                                                                </li>
                                                                      )
                                                            }else {
                                                                      return null;
                                                            }
                                                  })
                                        }
                              </ul>
                    </div>
          )
}


export default ProductsPage