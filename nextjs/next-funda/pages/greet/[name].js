export async function getServerSideProps({params}) {
          const { name } = params;

          return {
                    props: { name }
          }
}


function Greet(props) {
          return (
                    <h1> Hello, {props.name}! </h1>
          )
}

export default Greet;
