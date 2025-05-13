import PetInfo from "../../components/PetInfo";
import PetPlan from "../../components/PetPlan";
import DietsPanel from "../../components/DietsPanel";

export default async function Page() {

  return (
    <div className="flex items-center justify-center gap-4">
      <PetInfo />
      <PetPlan />
      <DietsPanel />
    </div>
  );
}
