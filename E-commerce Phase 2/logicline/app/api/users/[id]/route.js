import productsRepo from "@/app/repo/products-repo"
import usersRepo from "@/app/repo/users-repo";

export async function GET(request, { params }) {
    const customerParams = params.id
    const customerId = Number.parseInt(customerParams)
    const purchaseHistory = await productsRepo.getCustomerPurchaseHistory(customerId);
    return Response.json(purchaseHistory, { status: 200 })
}

export async function PUT(request, { params }) {
    const customerParams = params.id
    const customerId = Number.parseInt(customerParams)
    const balance = await request.json()
    const updatedCustomer = await usersRepo.updateBalance(customerId, balance)
    return Response.json(updatedCustomer)
}



