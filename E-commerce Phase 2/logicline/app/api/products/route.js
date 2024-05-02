import productsRepo from "@/app/repo/products-repo"

 
export async function GET(request) {
  const users = await productsRepo.getProducts();
  return Response.json(users);

}