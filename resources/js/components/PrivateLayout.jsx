import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import "../../css/style.css";
export default function PrivateLayout() {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}