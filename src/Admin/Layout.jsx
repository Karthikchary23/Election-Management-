import Admin_navbar from "./Admin_navbar";
import { Outlet } from "react-router";
import React from 'react'

function Layout() {
  return (
    <div>
      <Admin_navbar/>
      <Outlet/>
    </div>
  )
}

export default Layout
