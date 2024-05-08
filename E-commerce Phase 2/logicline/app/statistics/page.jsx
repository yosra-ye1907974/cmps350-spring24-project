import React from 'react'
import NavBar from './navBar/NavBar'

export default function page() {

  return (
    <>
    <NavBar></NavBar>
    <main>
    <div>
      <div>
          <p>Top 3 Products</p>
          <ul>
            <li>1.</li>
            <li>2.</li>
            <li>3.</li>
          </ul>
      </div>
      <div>
          <p>Top 3 Countries</p>
          <ul>
            <li>1.</li>
            <li>2.</li>
            <li>3.</li>
          </ul>
      </div>
      <div>
          <p>Total amount of purchases per product</p>
          <ul>
            <li>1.</li>
            <li>2.</li>
            <li>3.</li>
          </ul>
      </div>
    </div>
    </main>  
    </>
  )
}
