import { syncUserWithDB } from "../actions/users/syncUsers";
import Dashboard from "../../components/Dashboard";

export default async function Page() {
  await syncUserWithDB();

  return (
    <Dashboard />
  );
}
