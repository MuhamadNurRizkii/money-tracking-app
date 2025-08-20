import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Outlet />
    </div>
  );
}
