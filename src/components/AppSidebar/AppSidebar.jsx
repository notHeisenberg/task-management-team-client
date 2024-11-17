import { Calendar, Home, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
import { SidebarTrigger } from "../ui/sidebar";
import PropTypes from "prop-types";
import { FaAppStore } from "react-icons/fa";

// Menu items
const topItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Calendar", url: "/dashboard/calendar", icon: Calendar },
];

const bottomItems = [
  { title: "Apps", url: "/dashboard/apps", icon: FaAppStore },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

export function AppSidebar({ isCollapsed, toggleSidebar }) {
  return (
    <div className="h-full bg-gray-800 text-white flex flex-col ">
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className={`p-2 focus:outline-none ${isCollapsed ? "text-center" : "text-start"}`}
      >
        <SidebarTrigger />
      </button>

      {/* Sidebar Items */}
      <nav className="flex-1 flex flex-col items-start space-y-4 p-4">
        {topItems.map((item) => (
          <NavLink
            end
            key={item.title}
            to={item.url}
            className={({ isActive }) =>
              `flex items-center w-full ${isCollapsed ? "justify-center" : "px-4"
              } py-2 rounded-md transition-colors ${isActive ? "bg-gray-700" : "hover:bg-gray-600"
              }`
            }
          >
            <item.icon />
            {!isCollapsed && <span className="ml-2">{item.title}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Items */}
      <nav className="flex-none flex flex-col items-start space-y-4 p-4 mt-auto">
        {bottomItems.map((item) => (
          <NavLink
            end
            key={item.title}
            to={item.url}
            className={({ isActive }) =>
              `flex items-center w-full ${isCollapsed ? "justify-center" : "px-4"
              } py-2 rounded-md transition-colors ${isActive ? "bg-gray-700" : "hover:bg-gray-600"
              }`
            }
          >
            <item.icon />
            {!isCollapsed && <span className="ml-2">{item.title}</span>}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

AppSidebar.PropTypes = {
  isCollapsed: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};