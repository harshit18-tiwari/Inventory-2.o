import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NavBar() {
  return (
    <nav className="topnav">
      <div className="nav-left">IMS</div>
      <div className="nav-links">
        <NavLink to="/" end className={({isActive}) => isActive? 'active':''}>Dashboard</NavLink>
        <NavLink to="/products" className={({isActive}) => isActive? 'active':''}>Products</NavLink>
        <NavLink to="/suppliers" className={({isActive}) => isActive? 'active':''}>Suppliers</NavLink>
        <NavLink to="/transactions" className={({isActive}) => isActive? 'active':''}>Transactions</NavLink>
        <NavLink to="/reports" className={({isActive}) => isActive? 'active':''}>Reports</NavLink>
        <NavLink to="/users" className={({isActive}) => isActive? 'active':''}>Users</NavLink>
      </div>
    </nav>
  )
}
