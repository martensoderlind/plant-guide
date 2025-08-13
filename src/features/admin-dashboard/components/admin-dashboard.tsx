"use client";
import { useState } from "react";
import AdminOverview from "./admin-overview";

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="min-h-screen">
      <AdminOverview />
    </div>
  );
}
