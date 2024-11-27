import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AppSidebar } from "@/components/AppSidebar/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";
import clsx from "clsx";
import { Navbar } from "./DashboardNavbar/Navbar";
import { axiosCommon } from "@/hooks/useAxiosCommon";
import useAuth from "@/hooks/useAuth";
import { DashboardContext } from "@/providers/DashboardProvider/DashboardContext";

const fetchChannels = async (email) => {
  const response = await axiosCommon.get(`/channel/${email}`);
  return response.data;
};

const Dashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user } = useAuth();

  // React Query for fetching channels
  const { data: channels, isLoading, isError, refetch } = useQuery({
    queryKey: ["channels", user?.email],
    queryFn: () => fetchChannels(user?.email),
    enabled: !!user?.email,
  });

  // Derived owned and enrolled channels
  const ownedChannels = channels?.filter((channel) =>
    channel.teachers.some((teacher) => teacher.email === user?.email)
  ).map((channel) => ({
    title: channel.channelInfo?.name || `Channel ${channel.channelInfo?.channelCode}`,
    url: `/dashboard/o/${channel.channelInfo?.channelCode}`,
    image: channel.teachers.find((teacher) => teacher.email === user?.email)?.image,
  })) || [];

  const enrolledChannels = channels?.filter((channel) =>
    channel.students.some((student) => student.email === user?.email)
  ).map((channel) => ({
    title: channel.channelInfo?.name || `Channel ${channel.channelInfo?.channelCode}`,
    url: `/dashboard/e/${channel.channelInfo?.channelCode}`,
    image: channel.students.find((student) => student.email === user?.email)?.image,
  })) || [];

  // Handle sidebar collapse
  const toggleSidebar = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem("sidebarCollapsed", JSON.stringify(newState));
  };

  return (
    <DashboardContext.Provider value={{ refetch }}>
      <SidebarProvider>
        <div className="flex h-screen w-screen bg-white">
          {/* Sidebar */}
          <div
            className={clsx(
              "transition-width duration-300",
              isCollapsed ? "w-16" : "w-64"
            )}
          >
            <AppSidebar
              isCollapsed={isCollapsed}
              toggleSidebar={toggleSidebar}
              ownedChannels={ownedChannels}
              enrolledChannels={enrolledChannels}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Navbar */}
            <Navbar />

            {/* Page Content */}
            <main className="flex-1 p-4 overflow-auto relative">
              {isLoading && <p>Loading channels...</p>}
              {isError && <p>Error loading channels.</p>}
              <Outlet />
            </main>
          </div>
        </div>
      </SidebarProvider>
    </DashboardContext.Provider>
  );
};

export default Dashboard;