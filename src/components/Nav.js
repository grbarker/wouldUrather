import React from 'react'
import { NavLink, Link } from 'react-router-dom'

export default function Nav () {

  return (
    <nav className='nav'>
      <ul>
        <li>
          <NavLink
            to={{
              pathname: '/',
              state: {viaNav: true}
            }} exact activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={{
              pathname: '/add',
              state: {viaNav: true}
            }} exact activeClassName='active'>
            New Question
          </NavLink>
        </li>
        <li>
          <NavLink
            to={{
              pathname: '/leaderboard',
              state: {viaNav: true}
            }} exact activeClassName='active'>
            Leaderboard
          </NavLink>
        </li>
        <li>
          <Link
            to={{
              pathname: '/login',
              state: {viaNav: true, nextPage: '/', logOut: true}
            }}>
            Log Out
          </Link>
        </li>
        <li>
        </li>
      </ul>
    </nav>
  )
}
