import productsRepo from "@/app/repo/products-repo"

export async function POST(request, { params }) {
    const customerParams = params.id
    const customerId = Number.parseInt(customerParams)
    const purchaseDetails = await request.json()

    console.log(purchaseDetails);
    const response = await productsRepo.newPurchase(purchaseDetails)
    return Response.json(response)
}