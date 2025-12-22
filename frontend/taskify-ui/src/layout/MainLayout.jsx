import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  const [search, setSearch] = useState("");

  return (
    <div className="app-wrapper">
      <Header onSearch={setSearch} />

      <div className="layout-container">
        <Sidebar />
        <div className="page-content">
          <Outlet context={{search}}/>
        </div>
      </div>
    </div>
  );
}
