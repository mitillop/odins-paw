import PetInfo from "../../components/PetInfo";
import PetPlan from "../../components/PetPlan";
import DietsPanel from "../../components/DietsPanel";
import ChatGeneral from "../../components/ChatGeneral";
import ChatNutrition from "../../components/ChatNutrition";
import ChatTips from "../../components/ChatTips";

export default async function Page() {
  return (
    <div className="flex flex-wrap justify-evenly gap-4 max-w-7xl mx-auto">
      <div className="max-w-1/3 min-w-[300px] p-2">
        <PetInfo />
      </div>
      <div className="max-w-1/3 min-w-[300px] p-2">
        <PetPlan />
      </div>
      <div className="max-w-1/3 min-w-[300px] p-2">
        <DietsPanel />
      </div>
      <div className="max-w-1/3 min-w-[300px] p-2">
        <ChatGeneral />
      </div>
      <div className="max-w-1/3 min-w-[300px] p-2">
        <ChatNutrition />
      </div>
      <div className="max-w-1/3 min-w-[300px] p-2">
        <ChatTips />
      </div>
    </div>
  );
}
