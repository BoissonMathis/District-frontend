import { Outlet } from "react-router-dom";
import { UserNav } from "../componants/UserNav";

export function Layout() {
  return (
    <div className="b-beige h-screen">
      <UserNav />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
