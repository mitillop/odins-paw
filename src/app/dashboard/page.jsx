import PetInfo from "../../components/PetInfo";
import PetPlan from "../../components/PetPlan";
import DietsPanel from "../../components/DietsPanel";
import ChatGeneral from "../../components/ChatGeneral";
import ChatNutrition from "../../components/ChatNutrition";
import ChatTips from "../../components/ChatTips";
import PetManagement from "../../components/PetManagement";
import { syncUserWithDB } from "../actions/users/syncUsers";

export default async function Page() {
  const user = await syncUserWithDB();
  return (
    <div className="max-w-7xl mx-auto p-4 min-h-screen">
      {/* Sección superior: Gestión y información de mascotas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-1">
          <PetManagement />
        </div>
        <div className="lg:col-span-1">
          <PetInfo />
        </div>
        <div className="lg:col-span-1">
          <PetPlan />
        </div>
      </div>

      {/* Sección media: Dietas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-3">
          <DietsPanel />
        </div>
      </div>

      {/* Sección inferior: Chats de asistencia */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <ChatGeneral />
        </div>
        <div className="lg:col-span-1">
          <ChatNutrition />
        </div>
        <div className="lg:col-span-1">
          <ChatTips />
        </div>
      </div>
    </div>
  );
}
