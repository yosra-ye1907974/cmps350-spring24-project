import productsRepo from "@/app/repo/products-repo"

export async function GET(request, { params }) {
    const customerParams = params.id
    const customerId = Number.parseInt(customerParams)
    const purchaseHistory = await productsRepo.getCustomerPurchaseHistory(customerId);
    return Response.json(purchaseHistory, { status: 200 })
}