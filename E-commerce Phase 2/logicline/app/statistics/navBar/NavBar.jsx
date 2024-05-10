'use client'
import React from 'react'
import Link from 'next/link'

export default function NavBar( { choice } ) {
  
  return (
   <>
    <nav>
      <ul>
        <li><Link id="inpage" href="./main-page.html">Home</Link></li>
        <li id="todo"></li>
        <li id="username"></li>
        <li id="loginLogout"><Link href="./login-page.html">Login</Link></li>
        <li id="stats"><Link href="./statistics">Statistics</Link></li>
      </ul>
    </nav>
   </>
  )
}
