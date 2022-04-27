import Link from "next/link";


function Navbar() {


          return (
                    <div
                              style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        marginBottom: 25

                              }}
                    >
                              <div>My Website</div>

                              <div>
                                        <Link href="/">Home </Link>
                                        <Link href="/about">About </Link>
                                        <Link href="/contacts">Contacts </Link>
                              </div>
                    </div>
          )
}

export default Navbar;