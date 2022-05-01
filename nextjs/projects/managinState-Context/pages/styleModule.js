import styles from '../styles/Home.module.css'

import sasStyles from '../styles/Home.module.scss'

console.log(sasStyles)


export default function HomeStyle() {


          return (
                    <>
                              <div className={styles.homepage}>
                                        <h1 className={styles.title}> Welcome to the CSS Modules example </h1>

                                        <div>
                                                  <button className= {styles.button}>Click Me</button>
                                        </div>
                              </div>

                              <div className={sasStyles.button}>
                                        <h1> Welcome to the SASS Modules example </h1>
                              </div>
                    </>
          );
}


// cont on pg 165