import Link from "next/link"


const Navbar = () => {

          return (
                    <div>
                              <Link href='/index'> Home </Link>
                              <Link href='/about'> About </Link>
                              <Link href='/contact'> Contacts </Link>

                              <Link href='/blog/2021-01-01/happy-new-year'> Read post </Link>
                              <Link href='/blog/2021-03-05/match-update'> Read post </Link>
                              <Link href='/blog/2021-04-23/i-love-nextjs'> Read post </Link>
                    </div>
          )
}

export default Navbar