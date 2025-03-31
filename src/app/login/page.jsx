import { createUser, getUser, loginUser } from "../services/user";

export default async function Page() {
    //   const id = await getUser(1);
    //   console.log(id);
    // const user = await createUser({ name: "Miti", email: "miti2@gmail.com", password: "miti123" });
    // console.log(user);
    const user = await loginUser({ email: "miti@gmail.com", password: "miti123" });
    console.log(user);
  return (
    <div>
      <h1>Hola</h1>
    </div>
  );
}
