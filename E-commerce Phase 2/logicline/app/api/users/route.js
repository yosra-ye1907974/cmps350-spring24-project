import userRepo from "@/app/repo/users-repo";
 
export async function GET(request) {
  const users = await userRepo.getUsers();
  return Response.json(users);

}