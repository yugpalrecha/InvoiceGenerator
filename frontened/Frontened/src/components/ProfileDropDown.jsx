import React from "react";
import { LogOut } from "lucide-react";

export default function ProfileDropdown({
  isOpen,
  onToggle,
  avatar,
  companyName,
  email,
  onLogout,
}) {
  return (
    <div className="relative">
      {/* Trigger */}
      <button
        onClick={onToggle}
        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100"
      >
        <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-semibold">
          {companyName?.charAt(0)}
        </div>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border z-50">
          <div className="p-4 border-b">
            <p className="font-medium text-gray-900">{companyName}</p>
            <p className="text-sm text-gray-500">{email}</p>
          </div>

          <button
            onClick={onLogout}
            className="flex items-center gap-2 w-full px-4 py-3 text-sm text-red-600 hover:bg-gray-50"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
