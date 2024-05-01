import userRepo from "@/app/repo/users-repo";
 
export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const username = searchParams.get("username");
  const password = searchParams.get("password");
  const role = searchParams.get("role");

  if (role === "customer") {
    const user = await userRepo.getCustomer(username , password);
    console.log(user)
    return Response.json(user);
  } else if (role === "seller") {
    const user = await userRepo.getSeller(username , password);
    console.log(user)
    return Response.json(user);
  }
  const users = await userRepo.getUsers();
  return Response.json(users);

}