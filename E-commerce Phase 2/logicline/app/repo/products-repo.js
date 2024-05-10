import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

class ProductsRepo {

    async getProducts() {
        try {
            return prisma.product.findMany(); 

        } catch (error) {
            return { error: error.message }
        }
    }

    async  getProductById(productId) {
        try {
            return  prisma.product.findUnique({
                where: {
                    productId: productId
                }
            });
        } catch (error) {
            return { error: error.message };
        }
    }
    
    async getProduct(searchText) {
            try {
                return  prisma.product.findMany({
                    where: {
                        name: { contains: searchText }     
                    }
                });
            } catch (error) {
                return { error: error.message };
            }
    }

    async getCustomerPurchaseHistory(customerId) {
        try {
            return  prisma.purchase.findMany({
                where: {
                    customerId
                }
            });
        } catch (error) {
            return { error: error.message };
        }
    }
       
    async newPurchase(purchase){
        try {
            return  prisma.purchase.create({
                data: purchase,
              });
        } catch (error) {
            return { error: error.message };
        }
    }

    //New use case: Shows the top 3 products purchased.
    async top3Products(){
        try {
            return prisma.product.findMany({
                include: {Purchase: true},
                orderBy: {
                  Purchase: {
                    _count: 'desc',
                  }},
                  take: 3
              })
        } catch (error) {
            return { error: error.message };
        }
    }

    //New use case: This methods shows the sum of all profits.
    async sumProfits(){
        try {
            return prisma.purchase.aggregate({ _sum: { totalPrice: true } })
        } catch (error) {
            return { error: error.message };
        }
    }

    //New use case: Top 3 active customers (purchase history)
    async top3Customers(){
        try {
            return prisma.customer.findMany({
                include: {Purchase: true},
                orderBy: {
                  Purchase: {
                    _count: 'desc',
                  }},
                  take: 3
              })
        } catch (error) {
            return { error: error.message };
        }
    }


    //New use case: Top 3 active Sellers (by purchase)
    async top3Sellers(){
        try {
            return prisma.seller.findMany({
                include: {Purchase: true},
                orderBy: {
                  Purchase: {
                    _count: 'desc',
                  }},
                  take: 3
              })
        } catch (error) {
            return { error: error.message };
        }
    }

    async top3SellersProducts(){
        try {
            return prisma.seller.findMany({
                include: {Product: true},
                orderBy: {
                Product: {
                    _count: 'desc',
                  }},
                  take: 3
              })
        } catch (error) {
            return { error: error.message };
        }
    }
    //New use case: Average Customer Spend Per Purchase 
    async avgCustomerSpend(){
        try {
            return  prisma.purchase.aggregate
            ({ _avg: { totalPrice: true } });
        } catch (error) {
            return { error: error.message };
        }
    }

    //New use case:  Customers count per location 
    async customersCountPerLocation(){
        try {
            return prisma.customer.groupBy({
                by: ["shippingAddress"],
                _count: { id: true },
              })
        } catch (error) {
            return { error: error.message };
        }
    }
}

export default new ProductsRepo()
