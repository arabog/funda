import React from 'react'
import ProductCategoryRow from './ProductCategoryRow';
import ProductRow from './ProductRow';


const ProductTable = (props) => {
          const filterText = props.filterText;
          const inStockOnly = props.inStockOnly;
          
          const rows = [];
          let lastCategory = null;
          // let lastCategory = '';     empty string '' will also work

          props.products.forEach((product) => {
                    // deals with input
                    if (product.name.indexOf(filterText) === -1) {
                              return;
                    }

                    /*
                              on clicking d checkbox, d inStockOnly state bcoms true
                              wc means remove unstocked items. to remove d product 
                              d stocked value of unstocked bcom !false (i.e true) since 
                              not stoked is rep with false. d stocked product value of true
                              bcoms false(!true) and go on with d iteration.
                    */
          
                    // deals with checkbox
                    if (inStockOnly && !product.stocked) {
                              return;
                    }


                    if(product.category !== lastCategory) {
                              rows.push(
                                        <ProductCategoryRow 
                                                  key = {product.category}
                                                  category = {product.category}
                                        />
                              )
                    }

                    lastCategory = product.category;

                    rows.push(
                              <ProductRow 
                                        product = {product}
                                        key = {product.name}
                              />
                    );
          
          });


          return (
                    <table>
                              <thead>
                                        <tr>
                                                  <th>Name</th>
                                                  <th>Price</th>
                                        </tr>
                              </thead>

                              <tbody>{rows}</tbody>
                    </table>
          )
}


export default ProductTable