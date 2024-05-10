'use client'
import React from 'react'
import Link from 'next/link'
import styles from "@/app/page.module.css";

export default function NavBar( { choice } ) {

  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

 function handleLogout(){
  localStorage.removeItem("currentUser");
  localStorage.removeItem("selectedProduct");
 }
  
  return (
   <>
    <nav className={styles.nav}>
      <ul className={styles.navUl}>
        <li><Link id="inpage" href="./main-page.html" className={styles.navLink}>Home</Link></li>
        <li id="username" >{currentUser.username + "( "+currentUser.role + " )"}</li>
        <li id="loginLogout"><Link href="./main-page.html" onClick={handleLogout} className={styles.navLink}>Logout</Link></li>
      </ul>
    </nav>
   </>
  )
}
