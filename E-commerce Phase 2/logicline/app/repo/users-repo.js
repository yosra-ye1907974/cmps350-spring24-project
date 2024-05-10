import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

class UserRepo {

    async getUsers() {
        try {

            const customers = await prisma.customer.findMany();
            const sellers = await prisma.seller.findMany();
            return customers.concat(sellers);
            
        } catch (error) {
            return { error: error.message }
        }
    }
    async updateBalance(customerId, balance){
        try {
            return  prisma.customer.update({
                where: { id: customerId },
                data: { balance },
              });
        } catch (error) {
            return { error: error.message };
        }
    }

    async getCustomer(username, password) {
        try {
            return prisma.customer.findFirst({
                where: {
                    AND: [
                        { username },
                        { password }
                    ]
            }
            })

        } catch (error) {
            return { error: error.message }
        }
    }

    async getSeller(username, password) {
        try {
            return prisma.seller.findFirst({
                where: {
                    AND: [
                        { username },
                        { password }
                    ]
            }
            })

        } catch (error) {
            return { error: error.message }
        }
    }

}

export default new UserRepo()