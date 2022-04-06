import React from 'react'


const SearchBar = (props) => {
          const filterText = props.filterText;
          const inStockOnly = props.inStockOnly;

          const handleFilterTextChange = (e) => {
                    const value = e.target.value;

                    props.onFilterTextChange(value)
          }

          const handleInStockChange = (e) => {
                    const checked = e.target.checked;

                    props.onInStockChange(checked);
          }


          return (
                    <form>
                              <input
                                        type="text"
                                        placeholder="Search..."
                                        value={filterText}
                                        onChange={handleFilterTextChange}
                              />

                              <p>
                                        <input
                                                  type="checkbox"
                                                  checked={inStockOnly}
                                                  onChange={handleInStockChange}
                                        />

                                        {' '}

                                        Only show products in stock
                              </p>
                    </form>

          )
}


export default SearchBar