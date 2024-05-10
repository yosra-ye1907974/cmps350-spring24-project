'use client'
import React from 'react'
import Link from 'next/link'

export default function NavBar( { choice } ) {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

 function handleLogout(){
  localStorage.removeItem("currentUser");
  localStorage.removeItem("selectedProduct");
 }
  
  return (
   <>
    <nav>
      <ul>
        <li><Link id="inpage" href="./main-page.html">Home</Link></li>
        <li id="username">{currentUser.username + "( "+currentUser.role + " )"}</li>
        <li id="loginLogout"><Link href="./main-page.html" onClick={handleLogout}>Logout</Link></li>
      </ul>
    </nav>
   </>
  )
}
