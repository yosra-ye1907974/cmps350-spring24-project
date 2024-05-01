import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

class UserRepo {

    async getUsers() {
        try {
            return prisma.customer.findMany(); //prisma.seller.findMany() //get 2 tables 

        } catch (error) {
            return { error: error.message }
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