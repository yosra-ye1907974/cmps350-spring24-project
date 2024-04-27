import ProductsRepo from "@/app/repo/products-repo"
const productsRepo = new ProductsRepo()

export async function GET(request, { params }){
    const productId = params.id
    const product = await productsRepo.getProduct(productId)
    return Response.json(product, { status: 200 })
}