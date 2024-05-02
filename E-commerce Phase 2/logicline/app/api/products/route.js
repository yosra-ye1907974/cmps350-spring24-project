import ProductsRepo from "@/app/repo/products-repo"
const productsRepo = new ProductsRepo()

 
export async function GET(request) {
  const users = await productsRepo.getProducts();
  return Response.json(users);

}