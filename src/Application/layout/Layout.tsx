import { Outlet } from "react-router-dom";

export function Layout() {
  return (
    <div>
      <p>test layout</p>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
