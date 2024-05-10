import React from 'react'
import NavBar from './navBar/NavBar'
import productsRepo from '../repo/products-repo'
import styles from './../page.module.css'

export default async function page() {

  const top3Products = await productsRepo.top3Products()
  const top3Customers = await productsRepo.top3Customers()
  const top3Sellers = await productsRepo.top3Sellers()
  const customersLocation = await productsRepo.customersCountPerLocation()

  const avgCustomerSpend = await productsRepo.avgCustomerSpend()
  const avg = avgCustomerSpend._avg.totalPrice
  const res = await productsRepo.sumProfits()
  const profits = res._sum.totalPrice 

  return (
    <>
    <NavBar></NavBar>
    <main>
    <div className={styles.card}>
      <div>
         <h3>Total profits: {profits} QAR </h3> 
      </div>
      <div>
          <h3>Average Customer Spend Per Purchase: {avg.toFixed(3)}</h3>
      </div>

      <div>
         <h3>Number of Customers Per Location</h3> 
         <ul>
            {
               customersLocation.map( p=> <li>{p.shippingAddress + "  :   "+ p._count.id}</li>)
            }
          </ul>
      </div>

      <div>
          <h3>Top 3 Products</h3>
          <ul>
            {
               top3Products.map( p=> <li>{p.name}</li>)
            }
          </ul>
      </div>
      <div>
          <h3>Top 3 Customers</h3>
          <ul>
            {
               top3Customers.map( c=> <li key={c.id}>{c.firstName +"  " +c.lastName}</li>)
            }
          </ul>
      </div>
      <div>
          <h3>Top 3 Selling Companies</h3>
          <ul>
           {
               top3Sellers.map( s=> <li key={s.id}>{s.companyName}</li>)
            }
          </ul>
      </div>

      <div>
          <h3>Top 3 Selling Companies</h3>
          <ul>
           {
               top3Sellers.map( s=> <li key={s.id}>{s.companyName}</li>)
            }
          </ul>
      </div>
      
    </div>
    </main>  
    </>
  )
}
