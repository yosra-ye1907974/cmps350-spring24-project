import fs from 'fs-extra'
import path from 'path'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const customersPath = path.join(process.cwd(), 'app/data/customers.json')
const sellersPath = path.join(process.cwd(), 'app/data/sellers.json')
const productsPath = path.join(process.cwd(), 'app/data/products.json')
const historyPath = path.join(process.cwd(), 'app/data/purchaseHistory.json')
const adminsPath = path.join(process.cwd(), 'app/data/admins.json')

async function main() {
    try {
        const customers = await fs.readJSON(customersPath)
        const sellers = await fs.readJSON(sellersPath)
        const products = await fs.readJSON(productsPath)
        const history = await fs.readJSON(historyPath)
        const admins = await fs.readJSON(adminsPath)
    
        for (const c of customers) await prisma.customer.create({ data: c })
        for (const s of sellers) await prisma.seller.create({ data: s })
        for (const p of products) await prisma.product.create({ data: p })
        for (const h of history) await prisma.purchase.create({ data: h })
        for (const a of admins) await prisma.admin.create({ data: a })

    } catch (error) {
        console.log(error);
        return { error: error.message }
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })