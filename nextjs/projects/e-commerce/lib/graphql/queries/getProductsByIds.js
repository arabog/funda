import { gql } from 'graphql-request';


export default gql`
          query GetProductByID($ids: [ID!]) {
                    products(where: { id_in: $ids }) {
                              id
                              
                              images(first: 1) {
                                        id
                                        url
                              }

                              name
                              price
                              slug
                    }
          }
`;