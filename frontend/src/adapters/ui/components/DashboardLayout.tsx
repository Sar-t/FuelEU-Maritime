import React from "react";

export default function DashboardLayout({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-100">
      <h2 className="text-2xl font-bold text-blue-700 mb-6">{title}</h2>
      <div>{children}</div>
    </div>
  );
}
