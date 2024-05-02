import productsRepo from "@/app/repo/products-repo"

 
export async function GET(request) {
  
  const { searchParams } = new URL(request.url);
  const product = searchParams.get("name");

  if (product) {
    const products = await productsRepo.getProduct(product);
    console.log(products)
    return Response.json(products);
  }
  const products = await productsRepo.getProducts();
  return Response.json(products);

}