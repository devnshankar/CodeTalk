import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <div >
        <ul>
            <li>
                <Link to={"/"}>
                    Landing Page
                </Link>
            </li>

            <li>
                <Link to={"/profile"}>
                    Profile
                </Link>
            </li>
            <li>
                <Link to={'/settings'}>
                    Settings
                </Link>
            </li>
        </ul>
    </div>
  )
}

export default NavBar