import ProductsRepo from "@/app/repo/products-repo"


export async function GET(request, { params }){
    const id = params.id
    const productId = Number.parseInt(id)
    const product = await ProductsRepo.getProductById(productId)
    return Response.json(product, { status: 200 })
}