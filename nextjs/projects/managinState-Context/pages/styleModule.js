import styles from '../styles/Home.module.css'


export default function HomeStyle() {


          return (
                    <div className={styles.homepage}>
                              <h1 className={styles.title}> Welcome to the CSS Modules example </h1>

                              <div>
                                        <button className= {styles.button}>Click Me</button>
                              </div>
                    </div>
          );
}


// cont on pg 164