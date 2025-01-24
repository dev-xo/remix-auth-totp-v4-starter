import { Outlet } from "react-router";
import { Link } from "react-router";

export default function Route() {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
}
