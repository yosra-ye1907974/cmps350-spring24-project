import ProductsRepo from "@/app/repo/products-repo"
const productsRepo = new ProductsRepo()

export async function GET(request){
    const products =  await productsRepo.getProducts()
    return Response.json(products,{ status: 200 })
}