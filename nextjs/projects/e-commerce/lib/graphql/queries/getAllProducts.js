import { gql } from 'graphql-request';


export default gql `
          query getAllProducts {
                    products {
                              id
                              name
                              slug
                              price
                              images {
                                        id
                                        url
                              }
                    }
          }
`;

