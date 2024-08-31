/* eslint-disable no-unused-vars */
import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'


export default function Layout() {
    return (
            <>
            <Navbar/>
            <div className="container mx-auto my-6 py-6">
            <Outlet />
            </div>
        </>
    )
}
