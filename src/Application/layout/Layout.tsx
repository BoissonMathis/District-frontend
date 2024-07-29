import { Outlet } from "react-router-dom";
import { UserHeader } from "../componants/UserHeader";
import { UserNav } from "../componants/UserNav";

export function Layout() {
  return (
    <div className="b-beige h-screen">
      <UserHeader />
      <main className="flex h-auto">
        <UserNav />
        <Outlet />
      </main>
    </div>
  );
}
