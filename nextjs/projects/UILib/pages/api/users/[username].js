import users from "../../../data/users";


export function getStaticPaths() {
          const paths = users.map((user) => (
                    {
                              params: {username: user.username}
                    }
          ))


          return {
                    paths,
                    fallback: false
          }
}