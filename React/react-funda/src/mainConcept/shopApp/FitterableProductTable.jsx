import React, { useState } from 'react'
import ProductTable from './ProductTable'
import SearchBar from './SearchBar'
import {PRODUCTS} from './data'


const FitterableProductTable = () => {
          const products = PRODUCTS;

          const [filterText, setFilterText] = useState('');
          const [inStockOnly, setInStockOnly] = useState(false);


          const handleFilterTextChange = (inputVal) => {
                    setFilterText(inputVal)
          }

          const handleInStockChange = (inputVal) => {
                    setInStockOnly(inputVal)
          }


          return (
                    <div>
                              <SearchBar 
                                        filterText = {filterText}
                                        onFilterTextChange  = {handleFilterTextChange}
                                        
                                        inStockOnly = {inStockOnly}
                                        onInStockChange = {handleInStockChange}
                              />

                              <ProductTable 
                                        products = {products} 
                                        
                                        filterText = {filterText}
                                        inStockOnly = {inStockOnly}
                              />
                    </div>
          )
}


export default FitterableProductTable