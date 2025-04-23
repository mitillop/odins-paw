import { auth, currentUser } from "@clerk/nextjs/server";
import { syncUserWithDB } from "../actions/users/syncUsers";

export default async function Page() {
  await syncUserWithDB();
  // Get the userId from auth() -- if null, the user is not signed in
  const { userId } = await auth();

  // Protect the route by checking if the user is signed in
  if (!userId) {
    return <div>Sign in to view this page</div>;
  }

  // Get the Backend API User object when you need access to the user's information
  const user = await currentUser();
  console.log(user);

  // Use `user` to render user details or create UI elements
  return (
    <div className="flex items-center justify-center ">
      Welcome, {user.firstName}!
      {/* <img src={user.imageUrl} alt="User Image" className="w-12 h-12"></img> */}
    </div>
  );
}
