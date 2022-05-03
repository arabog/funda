import { useNavigate} from 'react-router-dom'


const Home = (props: any) => {
          const navigate = useNavigate()
          const userData = props.data

          const handleHome = () => {
                    navigate('/')
          }

          return (
                    <div>

                              {
                                        userData ? (
                                                  <div
                                                            style={{
                                                                      padding: "24px",
                                                                      margin: "24px 0",
                                                                      borderTop: "1px solid #eaeaea",
                                                                      display: "flex",
                                                                      flexDirection: 'column',
                                                                      alignItems: "center",
                                                                      gap: "16px",
                                                            }}
                                                  >
                                                            <img
                                                                      style={{ borderRadius: "50%" }}
                                                                      width={200}
                                                                      height={200}
                                                                      src={userData.avatar_url}
                                                                      alt={userData.login}
                                                            />

                                                            <div>
                                                                      <h2>{userData.name}</h2>
                                                                      <p>{userData.bio}</p>
                                                            </div>

                                                            <button onClick={() =>handleHome()}> Home </button>
                                                  </div>                                               
                                        ) : null
                              }

                    </div>
          )
}


export default Home