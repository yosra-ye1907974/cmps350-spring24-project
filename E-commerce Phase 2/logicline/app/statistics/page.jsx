import React from 'react'
import NavBar from './navBar/NavBar'
import productsRepo from '../repo/products-repo'

export default async function page() {

  // let top3Products = await productsRepo.top5Products()
  // if (!Array.isArray(top3Products)) {
  //   top3Products = [top3Products] // Convert to array
  // }

  const res = await productsRepo.sumProfits()
  const profits = res._sum.totalPrice 

  return (
    <>
    <NavBar></NavBar>
    <main>
    <div>
    <div>
          <p>2024 profits: {profits} QAR</p>
      </div>
      <div>
          <p>Top 3 Products</p>
          <ul>
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
