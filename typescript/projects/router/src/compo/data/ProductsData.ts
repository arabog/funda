export interface Products {
          id: number;
          name: string;
          description: string;
          price: number;
}


export const prods: Products[]= [
          {
                    description: "A collection of navigational components that compose declaratively with your app",
                    id: 1,
                    name: "React Router",
                    price: 8
          },

          {
                    description: "A library that helps manage state across your app",
                    id: 2,
                    name: "React Redux",
                    price: 12
          },

          {
                    description: "A library that helps you interact with a GraphQL backend",
                    id: 3,
                    name: "React Apollo",
                    price: 12
          },

          {
                    description: "A collection of navigational components that compose declaratively with your app",
                    id: 4,
                    name: "JavaScript",
                    price: 14
          },

          {
                    description: "A library that helps manage state across your app",
                    id: 5,
                    name: "Node Js",
                    price: 10
          },

          {
                    description: "A library that helps you interact with a GraphQL backend",
                    id: 6,
                    name: "Express Js",
                    price: 20
          }
]