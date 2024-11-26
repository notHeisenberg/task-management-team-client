import {
  Calendar,
  Home,
  Settings,
  UsersIcon,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { FaAppStore } from "react-icons/fa";
import { useState } from "react";
import { Separator } from "../ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarTrigger } from "../ui/sidebar";
import { IoMdArrowDropright } from "react-icons/io";

// Owned and Enrolled Channels
const ownedChannels = [
  { title: "Owned Channel 1", url: "/dashboard/owned/1" },
  { title: "Owned Channel 2", url: "/dashboard/owned/2" },
];

const enrolledChannels = [
  { title: "Enrolled Channel 1", url: "/dashboard/enrolled/1" },
  { title: "Enrolled Channel 2", url: "/dashboard/enrolled/2" },
];

// Menu items
const topItems = [
  { title: "Home", url: "/dashboard", icon: Home },
  { title: "Calendar", url: "/dashboard/calendar", icon: Calendar },
];

const bottomItems = [
  { title: "Apps", url: "/dashboard/apps", icon: FaAppStore },
  { title: "Settings", url: "/dashboard/settings", icon: Settings },
];

export function AppSidebar({ isCollapsed, toggleSidebar }) {
  // State for managing open/close of collapsible sections
  const [ownedOpen, setOwnedOpen] = useState(false);
  const [enrolledOpen, setEnrolledOpen] = useState(false);

  const handleToggleSidebar = () => {
    if (isCollapsed) {
      // If the sidebar is being expanded, do not change the state of ownedOpen and enrolledOpen
      toggleSidebar();
    } else {
      // If the sidebar is being collapsed, close ownedOpen and enrolledOpen if they are open
      toggleSidebar();
      if (ownedOpen) {
        setOwnedOpen(false);
      }
      if (enrolledOpen) {
        setEnrolledOpen(false);
      }
    }
  };

  return (
    <div className="h-full bg-gray-800 text-white flex flex-col">
      {/* Toggle Button */}

      <span
        className={`p-2 focus:outline-none ${isCollapsed ? "text-center" : "text-start"}`}
      >
        <SidebarTrigger
          onClick={handleToggleSidebar} />
      </span>

      {/* Sidebar Items */}
      <nav className="flex-1 flex flex-col items-start space-y-4 p-4">
        {/* Top Items */}
        {topItems.map((item) => (
          <NavLink
            end
            key={item.title}
            to={item.url}
            className={({ isActive }) =>
              `flex items-center w-full ${isCollapsed ? "justify-center" : "px-4"} py-2 rounded-md transition-colors ${isActive ? "bg-gray-700" : "hover:bg-gray-600"
              }`
            }
          >
            <item.icon />
            {!isCollapsed && <span className="ml-2">{item.title}</span>}
          </NavLink>
        ))}

        {/* Owned Channels */}
        <SidebarMenu
          title="Owned"
          icon={UsersIcon}
          open={ownedOpen}
          onOpenChange={setOwnedOpen}
          isCollapsed={isCollapsed}
        >
          <Collapsible open={ownedOpen} onOpenChange={setOwnedOpen} className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild
                className={`flex items-center w-full relative ${isCollapsed ? "justify-center" : "px-4"
                  } py-2 rounded-md transition-colors hover:bg-gray-600`}
              >
                <SidebarMenuButton onClick={() => {
                  if (isCollapsed) {
                    toggleSidebar();
                  }
                  setOwnedOpen(!ownedOpen);
                }}>
                  <IoMdArrowDropright className={`transition-transform duration-300 absolute left-0 ${ownedOpen ? 'rotate-90' : ''} ${isCollapsed ? 'hidden' : ''}`} />
                  <UsersIcon />
                  {!isCollapsed && (
                    <span className="ml-2">Owned</span>
                  )}
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <div className={`mt-2 ml-6 ${isCollapsed ? "hidden" : ""}`}>
                    {ownedChannels.map((channel) => (
                      <NavLink
                        key={channel.title}
                        to={channel.url}
                        className={({ isActive }) =>
                          `flex items-center w-full px-4 py-2 rounded-md transition-colors ${isActive ? "bg-gray-600" : "hover:bg-gray-500"
                          } text-sm`
                        }
                      >
                        <span>{channel.title}</span>
                      </NavLink>
                    ))}
                  </div>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>
        <Separator />

        {/* Enrolled Channels */}
        <SidebarMenu>
          <Collapsible open={enrolledOpen} onOpenChange={setEnrolledOpen} className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild
                className={`flex items-center w-full relative ${isCollapsed ? "justify-center" : "px-4"
                  } py-2 rounded-md transition-colors hover:bg-gray-600`}
              >
                <SidebarMenuButton onClick={() => {
                  if (isCollapsed) {
                    toggleSidebar();
                  }
                  setEnrolledOpen(!enrolledOpen);
                }}>
                  <IoMdArrowDropright className={`transition-transform duration-300 absolute left-0 ${enrolledOpen ? 'rotate-90' : ''} ${isCollapsed ? 'hidden' : ''}`} />
                  <UsersIcon />
                  {!isCollapsed && (
                    <span className="ml-2">Enrolled</span>
                  )}
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  <div className={`mt-2 ml-6 ${isCollapsed ? "hidden" : ""}`}>
                    {enrolledChannels.map((channel) => (
                      <NavLink
                        key={channel.title}
                        to={channel.url}
                        className={({ isActive }) =>
                          `flex items-center w-full px-4 py-2 rounded-md transition-colors ${isActive ? "bg-gray-600" : "hover:bg-gray-500"
                          } text-sm`
                        }
                      >
                        <span>{channel.title}</span>
                      </NavLink>
                    ))}
                  </div>
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        </SidebarMenu>
      </nav>

      {/* Bottom Items */}
      <nav className="flex-none flex flex-col items-start space-y-4 p-4 mt-auto">
        {bottomItems.map((item) => (
          <NavLink
            end
            key={item.title}
            to={item.url}
            className={({ isActive }) =>
              `flex items-center w-full ${isCollapsed ? "justify-center" : "px-4"} py-2 rounded-md transition-colors ${isActive ? "bg-gray-700" : "hover:bg-gray-600"
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

AppSidebar.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};
