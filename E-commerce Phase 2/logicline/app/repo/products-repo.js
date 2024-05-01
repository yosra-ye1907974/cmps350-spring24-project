import fs from 'fs-extra'
import { nanoid } from 'nanoid'
import path from 'path'

export default class ProductsRepo {
    constructor() {
        this.path = path.join(process.cwd(), 'app/data/products.json')
        console.log(this.path);
    }

    async getProducts() {
        const products = await fs.readJSON(this.path)
        return products;
    }

    async addProduct(account) {
        account.accountNo = nanoid()
        const accounts = await this.getAccounts()
        accounts.push(account)
        await fs.writeJSON(this.path, accounts)
        return account
    }

    async getProduct(productId) {
        const products = await fs.readJson(this.path)
        console.log(products)
        const product = products.find(p => p.productId == productId)
        return product
    }

    async add(transaction) {
        transaction.accountNo = parseInt(transaction.accountNo.toString());
        transaction.amount = parseInt(transaction.amount.toString());
        try {
            const accounts = await this.getAccounts();
            const account = accounts.find(account => account.accountNo == transaction.accountNo);
            if (transaction.transType == 'Deposit') {
                account.deposit(transaction.amount);
            } else {
                account.withdraw(transaction.amount);
            }
            return await fs.writeJson(filePath, accounts)
        } catch (err) {
            throw err;
        }
    }
}