import { auth, currentUser } from "@clerk/nextjs/server";
import { syncUserWithDB } from "../actions/users/syncUsers";
import { getPets } from "../actions/users/getPets";
import { createPet } from "../actions/pets/createPet";

export default async function Page() {
  const prismaUser = await syncUserWithDB();
  const petData = {
    name: "Sol",
    age: 3,
    type: "Perro",
    breed: "Labrador",
    weight: 20,
    sex: "Hembra",
    activityLevel: "Bajo",
    medicalConditions: "Ninguno",
    createdAt: new Date(),
    updatedAt: new Date(),
    imageUrl:
      "https://th.bing.com/th/id/OIP.gV9-2Te-ImCRFl0EBa7vSQHaEK?rs=1&pid=ImgDetMain",
  };
  const pets = await getPets();
  // const store = useAppStore();

  return (
    <div className="flex items-center justify-center">
      Welcome, {prismaUser.name}!
      </div>
  );
}
